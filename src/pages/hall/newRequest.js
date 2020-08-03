import React, { useEffect, useState } from "react";
import Menu from "../../components/menu/menu";
import getMenu from "../../functions/firebaseRead";
import Nav from "../../components/nav/Nav";
import Modal from "../../components/modal/modal";
import Button from "../../components/button/Button";
import ComandClient from "../../components/order/commandclient";
import Order from "../../components/order/order";
import Swal from "sweetalert2";
import firebase from "../../config/firebase";
import "firebase/firebase-firestore";
import Input from "../../components/input/Input";
import "./newRequest.css"

const NewRequest = () => {
  const [breakfast, setBreakfast] = useState([]);
  const [hamburger, setHamburger] = useState([]);
  const [sideDishes, setSideDishes] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [add, setAdd] = useState([]);
  const [order, setOrder] = useState([]);
  const [subTotal, setSubTotal] = useState([])
  const [client, setClient] = useState('')
  const [table, setTable] = useState('')
  const [isModalVisible, setIsModalVisible] = useState(false);

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
    setOrder([ ...order, newItem]);
  };

  const addItemOrder = (item) => {
    saveOrder({
      ...item,
      quantity: 1,
          });
  };

  const AddItem = (item) => {
   item.quantity += 1;
   item.total = item.price * item.quantity;
    setOrder([...order]);
  }

  const deleteItem = (item) => {
    order.splice(order.indexOf(item), 1);
    setOrder([...order]);
  }

  const removeItem = (item) => {
if (item.quantity > 1) {
  item.quantity -= 1;
  item.total = item.price * item.quantity;
  setOrder([...order])
}
  }

useEffect(() => {
  const total = () => {
    setSubTotal(order.reduce((acc, curr) => acc + curr.total, 0))
  }
  total()
}, [order])

const saveOrderFirebase = (client, table) => {
  if(!client || !table) {
    Swal.fire({
      text: 'Preencha o nome do cliente, número da mesa e adicione o pedido',
      icon: 'warning'
    })
  }else{
    firebase.firestore().collection('orders').add({
      time: new Date().toLocaleString('pt-BR'),
      leadTime: '-',
      client,
      table,
      order: order.map((item) => {
        return {
          id: item.id,
          item: item.item,
          price: item.price,
          options: item.options || null,
          extras: item.extras || null
        }
      }),
      status: 'Em preparação',
      subTotal
    })
    .then((doc) => firebase.firestore().collection('orders').doc(doc.id)
    .update({id: doc.id}),
    setClient(''),
    setTable(''),
    setOrder([]), 
    Swal.fire({
      text: 'Pedido Enviado!',
      icon: 'success'
    })
    )
  }
}


  return (
    <main>
      <div link="/newRequest">
        <Nav></Nav>
      </div>
      <section>
        <div>MENU</div>
        <div>Café da Manhã</div>
          <Menu
          menu={breakfast}
            className="image" 
            addOrder={(item) => addItemOrder(item)}
          />
      </section>
       <section>
        <div>Hamburgers</div>
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
              <Button name="Bovino" />
              <Button name="Frango" />
              <Button name="Vegetariano" />
            </div>
            
              <Menu
              menu={add}
              className="image" 
              addOrder={(item) => addItemOrder(item)}
              />
            
          </section>
        </Modal>
      ) : null}
      <section>
        <div>Acompanhamentos</div>
          <Menu
          menu={sideDishes}
          className="image" 
          addOrder={(item) => addItemOrder(item)}
          />
      </section>
      <section>
        <div>Bebidas</div>
          <Menu
          menu={drinks}
          className="image" 
          addOrder={(item) => addItemOrder(item)}
          />
      </section>
      <section>
      <div>Resumo</div>
            <form>
            <Input type='text' value={client} placeholder='Nome do cliente' onChange={(e) => setClient(e.target.value)}/>
            <Input type='number' value={table} placeholder='Número da mesa' onChange={(e) => setTable(e.target.value)}/>
            </form>
            <div>
            <span>Produto </span>
            <span> Quantidade </span>
            <span> Deletar </span>
            <span> Preço</span>
            </div>
        
        <Order order={order}
        addClick={(item) => AddItem(item)}
        deleteClick={() => deleteItem(order)}
        removeClick={(item) => removeItem(item)}
        className='imagem'
        />
        <div>SubTotal R${subTotal}</div>
      </section>
      <Button name='ENVIAR PEDIDO' onClick={() => saveOrderFirebase(client, table)}/>
      <Button name='CANCELAR'/>
    </main>
  );
};

export default NewRequest;
