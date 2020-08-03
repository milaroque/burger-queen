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
import './newRequest.css'

const NewRequest = () => {
  const [breakfast, setBreakfast] = useState([]);
  const [hamburger, setHamburger] = useState([]);
  const [sideDishes, setSideDishes] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [add, setAdd] = useState([]);
  const [order, setOrder] = useState([]);
  const [subTotal, setSubTotal] = useState(0);
  const [client, setClient] = useState("");
  const [table, setTable] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [disabledBtns, setDisabledBtns] = useState(true);
  const [type, setType] = useState("")
  const [extra, setExtra] = useState("")

  useEffect(() => {
    getMenu().then(([breakfast, hamburger, sideDishes, drinks, add]) => {
      setBreakfast(breakfast);
      setHamburger(hamburger);
      setSideDishes(sideDishes);
      setDrinks(drinks);
      setAdd(add);
    });
  }, []);

  const saveOrder = (newItem) => {
    setOrder([...order, newItem]);
  };

  const addItemOrder = (item) => {
    saveOrder({
      ...item,
      quantity: 1,
      type,
      extra
      
    });
  };

  const AddItem = (item) => {
    item.quantity += 1;
    item.total = item.price * item.quantity;
    setOrder([...order]);
  };

  const deleteItem = (item) => {
    order.splice(order.indexOf(item), 1);
    setOrder([...order]);
  };

  const removeItem = (item) => {
    if (item.quantity > 1) {
      item.quantity -= 1;
      item.total = item.price * item.quantity;
      setOrder([...order]);
    }
  };

  useEffect(() => {
    const total = () => {
      setSubTotal(order.reduce((acc, curr) => acc + curr.total, 0));
    };
    order.length === 0 ? setDisabledBtns(true) : setDisabledBtns(false);
    total();
  }, [order]);

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
              type: item.type || null,
              extra: item.extra || null,
            };
          }),
          status: "Em preparação",
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
/*   const updateHamburguer = (id) => {
    if (options === "bovino" && extra === 'queijo') {
      return firebase.firestore().collection("order").doc(id).update({
        type: "bovino",
        extra: "queijo"
      });
    } else if (options === "frango" === 'quejo') {
      return firebase.firestore().collection("order").doc(id).update({
        type: "frango",
        extra: "quejo"
      });
    } else {
      return firebase.firestore().collection("order").doc(id).update({
        type: "vegetariano",
        extra: ""
      });
    }
  }; */

  /* const updateExtras = (item, id) => {
    if (item.extra === "ovo") {
      return firebase.firestore().collection("order").doc(id).update({
        type: "ovo",
      });
    } else if (item.extra === "queijo") {
      return firebase.firestore().collection("order").doc(id).update({
        type: "queijo",
      });
    } else {
      return firebase.firestore().collection("order").doc(id).update({
        type: "queijo e ovo",
      });
    }
  }; */

  return (
    <header className='hall'>
      <Nav link='/newRequest'></Nav>
      <header className='header-hall'>Novo Pedido</header>
      <main className='menu'>
      <section className='breakfast-menu'>
        <div className='breakfast'>Café da Manhã</div>
        <Menu
          menu={breakfast}
          className="image"
          addOrder={(item) => addItemOrder(item)}
        />
      </section>
      <section className='burges-menu'>
        <div className='burgers'>Hamburgers</div>
        <div onClick={() => setIsModalVisible(true)}>
          <Menu
            menu={hamburger}
            className="image"
            addOrder={(item) => addItemOrder(item)}
          />
        </div>
      </section>
      {isModalVisible ? (
        <Modal onClose={() => setIsModalVisible(false)}>
          <section>
            <div>OPÇÕES</div>
            <div>
              <Input type='radio' name='options' value='bovino' onChange={(e) => setType(e.target.value)} />
              <Button name="Bovino" />
              <Input type='radio' name='options' value='frango' onChange={(e) => setType(e.target.value)} />
              <Button name="Frango" />
              <Input type='radio' name='options' value='vegetariano' onChange={(e) => setType(e.target.value)} />
              <Button name="Vegetariano" />
            </div>
            <div>
            <Input type='checkbox' name='extraOvo' value='ovo' onChange={(e) => setExtra(e.target.value)} />
              <Button name="Ovo" />
              <Input type='checkbox' name='extraQueijo' value='queijo' onChange={(e) => setExtra(e.target.value)} />
              <Button name="Queijo" />
            </div>

            <Button name='Adicionar' onClick={(item) => addItemOrder(item)}/>
          </section>
        </Modal>
      ) : null}
      <section className='menu-sidedishes'>
        <div className='sidedishes'>Acompanhamentos</div>
        <Menu
          menu={sideDishes}
          className="image"
          addOrder={(item) => addItemOrder(item)}
        />
      </section>
      <section className='menu-drinks'>
        <div className='drinks'>Bebidas</div>
        <Menu
          menu={drinks}
          className="image"
          addOrder={(item) => addItemOrder(item)}
        />
      </section>
      <section>
        <div>Resumo</div>
        <form>
          <Input
            type="text"
            value={client}
            placeholder="Nome do cliente"
            onChange={(e) => setClient(e.target.value)}
          />
          <Input
            type="number"
            value={table}
            placeholder="Número da mesa"
            onChange={(e) => setTable(e.target.value)}
          />
        </form>
        <div>
          <span>Produto </span>
          <span> Quantidade </span>
          <span> Deletar </span>
          <span> Preço</span>
        </div>

        <Order
          order={order}
          addClick={(item) => AddItem(item)}
          deleteClick={() => deleteItem(order)}
          removeClick={(item) => removeItem(item)}
          className="imagem"
        />
        <div>SubTotal R${subTotal}</div>
      </section>
      <Button
        name="ENVIAR PEDIDO"
        disabled={disabledBtns}
        onClick={() => saveOrderFirebase(client, table)}
      />
      <Button name="CANCELAR" />
      </main>
    </header>
  );
};

export default NewRequest;
