import React, { useState, useEffect } from 'react'
import Nav from "../../components/nav/Nav";
import firebase from "../../config/firebase";
import "firebase/firebase-firestore";
import OrderCard from '../../components/orderKitchen/orderCard';
import "../kitchen/ordersReceived.css";


const OrdersDelivery = () => {

  const [orders, setOrders] = useState([]);
  useEffect(() => {
    firebase.firestore().collection('orders').get().then((snapshot) => {
      const pedidos = snapshot.docs.map((doc) => {
        if (doc.data().status === 'Pedido Pronto!') {
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

  const readyDelivery = (id) => {
    console.log(id)
    setOrders(orders.filter(order => order.id !== id))
    return firebase.firestore().collection('orders').doc(id).update({
      status: 'Pedido Entregue!',
      leadTime: new Date().toLocaleString('pt-BR'),
      hall_time: new Date().getTime()
    });
  }
  return (
    <div className='global-kitchen'>
      <header className='kitchen'>
      <Nav link='/ordersReceived'></Nav>
      </header>
      <h1 className='header-kitchen'>Pedidos à Entregar</h1>
      <div className='order-card-kitchen'>
        <OrderCard
          orders={orders}
          onClick={readyDelivery} />
      </div>
    </div>
  )
}
export default OrdersDelivery;