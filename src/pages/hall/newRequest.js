import React, { useEffect, useState } from "react";
import Menu from "../../components/menu/menu";
import getMenu from "../../functions/firebaseRead";
import Nav from "../../components/nav/Nav";
import Modal from "../../components/modal/modal";
import Button from "../../components/button/Button";
import Order from "../../components/order/order";
import Swal from "sweetalert2";
import firebase from "../../config/firebase";
import "firebase/firebase-firestore";
import Input from "../../components/input/Input";
import "./newRequest.css";
import ModalBurger from "../../components/modal/modalHamb";

const NewRequest = () => {
  const [breakfast, setBreakfast] = useState([]);
  const [hamburger, setHamburger] = useState([]);
  const [sideDishes, setSideDishes] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [order, setOrder] = useState([]);
  const [subTotal, setSubTotal] = useState(0);
  const [client, setClient] = useState("");
  const [table, setTable] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [disabledBtns, setDisabledBtns] = useState(true);
  const [type, setType] = useState("");
  const [extra, setExtra] = useState([]);
  const [selectedHamburguer, setSelectedHamburguer] = useState("");

  useEffect(() => {
    getMenu().then(([breakfast, hamburger, sideDishes, drinks]) => {
      setBreakfast(breakfast);
      setHamburger(hamburger);
      setSideDishes(sideDishes);
      setDrinks(drinks);
    });
  }, []);

  const saveOrder = (newItem) => {
    setOrder([...order, newItem]);
  };

  const addItemOrder = (item) => {
    const index = order.findIndex((i)=>(i.id === item.id))
    if (index === -1) {
      saveOrder({
        ...item,
        price: extra.length > 0 ? parseInt(item.price) + extra.length : item.price,
        quantity: 1,
        type,
        extra,
      });
    } else{
      AddItem(order[index])
    }
    setExtra([])
    setType("")
    setIsModalVisible(false)
  };

  const AddItem = (item) => {
    item.quantity += 1;
    setOrder([...order]);
  };

  const deleteItem = (item) => {
    order.splice(order.indexOf(item.id), 1);
    setOrder([...order]);
  };

  const removeItem = (item) => {
    if (item.quantity > 1) {
      item.quantity -= 1;
      setOrder([...order]);
    }
  };
  const handleNewHamburguer = (item) => {
    setIsModalVisible(true);
    setSelectedHamburguer(item);
  }

  const handleAddExtra = (e) => {
    if (extra !== "") {
      setExtra([...extra, e.target.value]);
    }
  };

  useEffect(() => {
    const total = () => {
      let acc = 0;
      order.forEach((item) => {
        acc += item.price * item.quantity
      });
      return setSubTotal(acc)
    }
    order.length === 0 && type.length === 0 ? setDisabledBtns(true) : setDisabledBtns(false);
    total();
  }, [order, type]);

  const cancell = () => {
    setType("")
    setExtra([])
    setOrder([])
  }

  useEffect(() => {
    if (isModalVisible === false) {
      setExtra([])
      setType('')
    }
  }, [isModalVisible])

  const saveOrderFirebase = (client, table) => {
    if (!client || !table) {
      Swal.fire({
        text: "Preencha o nome do cliente, número da mesa e adicione o pedido",
        icon: "warning",
      });
    } else {
      firebase
        .firestore()
        .collection("orders")
        .add({
          time: new Date().toLocaleString("pt-BR"),
          leadTime: "-",
          client,
          table,
          order: order.map((item) => {
            return {
              id: item.id,
              item: item.item,
              price: item.price,
              type: item.type || "",
              extra: JSON.stringify(item.extra || []), //JSON.parse
              quantity: item.quantity
            };
          }),
          status: "Em Preparo!",
          subTotal,
        })
        .then(
          (doc) =>
            firebase
              .firestore()
              .collection("orders")
              .doc(doc.id)
              .update({ id: doc.id }),
          setClient(""),
          setTable(""),
          setOrder([]),
          Swal.fire({
            text: "Pedido Enviado!",
            icon: "success",
          })
        );
    }
  };
  return (
    <div className='global'>
      <header className='hall'>
        <Nav link='/newRequest'></Nav>
      </header>
      <h1 className='header-hall'>Novo Pedido</h1>
      <main className='menu'>
        <div className='container-menu'>
          <section className='breakfast-menu'>
            <h2 className='title-menu'>Menu</h2>
            <div className='breakfast'>Café da Manhã</div>
            <Menu
              menu={breakfast}
              className="image"
              addOrder={addItemOrder}
            />
          </section>
          <section className="burges-menu">
            <div className="burgers">Hamburgers</div>
            <div onClick={() => setIsModalVisible(true)}>
              <Menu
                menu={hamburger}
                className="image"
                addOrder={addItemOrder}
                selectHamburguer={handleNewHamburguer}
                type={"hamburguer"}
              />
            </div>
          </section>
          {isModalVisible && (
            <Modal onClose={() => setIsModalVisible(false)}>
              <ModalBurger
                onChange={(e) => setType(e.target.value)}
                handleAddExtra={(e) => handleAddExtra(e)}
                addOrder={() => addItemOrder(selectedHamburguer)}
                disabled={disabledBtns}
              />
            </Modal>
          )}
          <section className='menu-sidedishes'>
            <div className="sidedishes">Acompanhamentos</div>
            <Menu
              menu={sideDishes}
              className="image"
              addOrder={addItemOrder}
            />
          </section>
          <section className='menu-drinks'>
            <div className='drinks'>Bebidas</div>
            <Menu
              menu={drinks}
              className="image"
              addOrder={addItemOrder}
            />
          </section>
        </div>
        <div className='order-table'>
          <h2 className='title-menu'> Comanda </h2>
          <form className='dice'>
            <Input
              type="text"
              value={client}
              placeholder="Nome do cliente"
              className="form-order"
              onChange={(e) => setClient(e.target.value)}
            />
            <Input
              type="number"
              value={table}
              placeholder="Número da mesa"
              className="form-order"
              onChange={(e) => setTable(e.target.value)}
            />
          </form>
          <div className='description'>
            <span className='tab-item'> Item </span>
            <span className='tab-value'> R$ </span>
          </div>
          <Order
            order={order}
            addClick={(item) => AddItem(item)}
            deleteClick={() => deleteItem(order)}
            removeClick={(item) => removeItem(item)}
            className="imagem"
          />
          <div className='subtotal'>Sub-Total: R${subTotal}</div>
          <Button
            name="ENVIAR PEDIDO"
            className='submit'
            disabled={disabledBtns}
            onClick={() => saveOrderFirebase(client, table)}
          />
          <Button
            name="CANCELAR"
            onClick={() => cancell()}
            className='remove'
          />
        </div>
      </main>
    </div>
  );
};

export default NewRequest;
