import React, { useState, useEffect } from 'react';
import Nav from '../../components/nav/Nav';
import firebase from '../../config/firebase';
import 'firebase/firebase-firestore';
import HistoricCard from '../../components/historicCard/historicCard';
import '../kitchen/historicOrdersKitchen.css';

const HistoricOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    firebase
      .firestore()
      .collection('orders')
      .orderBy('time', 'desc')
      .onSnapshot((querySnapshot) => {
        const pedidos = querySnapshot.docs.map((doc) => {
          if (doc.data().status === 'Pedido Entregue!') {
            return {
              id: doc.id,
              ...doc.data(),
            };
          }
          return false;
        });
        setOrders(pedidos.filter((pedido) => pedido !== false));
      })
  }, []);

  return (
    <>
      <div className="global-historic">
        <header className="historic">
          <Nav link="/historicOrders" />
        </header>
        <h1 className="header-historic">Histórico de Pedidos</h1>
        <h2 className="head">Salão</h2>
        <div className="container-historic">
          <div className="historic-card">
            <HistoricCard
              orders={orders}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default HistoricOrders;
