import React, { useState, useEffect } from 'react'
import Nav from "../../components/nav/Nav";
import firebase from "../../config/firebase";
import "firebase/firebase-firestore";
import OrderCard from '../../components/orderKitchen/orderCard';

const OrdersReceived = () => {

const [orders, setOrders] = useState([]);

useEffect(() => {
firebase.firestore().collection('orders').get().then((snapshot) => {
  const pedidos = snapshot.docs.map((doc) => {
  if (doc.data().status === 'Em Preparo!') {
    return ({
      id: doc.id,
      ...doc.data()
    })  
    }
    return false
  })
  setOrders(pedidos.filter(pedido => pedido !== false))
})
}, [])

const readyOrder = (id) => {
  console.log(id)
  setOrders(orders.filter(order => order.id !== id))
  return firebase.firestore().collection('orders').doc(id).update({
   status: 'Pedido Pronto!',
  });
}

    return (
      <div link='/ordersReceived'>
      <Nav>
          Cozinha
      </Nav>
      <div>Pedidos à Preparar</div>
      <div>
      <OrderCard 
      orders={orders}
      onClick={readyOrder}/>
      </div>
    </div>


    )
  }

export default OrdersReceived;