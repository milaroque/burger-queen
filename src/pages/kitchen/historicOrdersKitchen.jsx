import React, { useState, useEffect } from "react";
import NavKitchen from "../../components/nav/NavKitchen";
import firebase from "../../config/firebase";
import "firebase/firebase-firestore";
import HistoricCardKitchen from "../../components/historicCard/historicCardKitchen";
import "./historicOrdersKitchen.css";


const HistoricOrdersKitchen = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    firebase
      .firestore()
      .collection("orders")
      .orderBy('time', 'desc')
      .onSnapshot((querySnapshot) => {
        const pedidos = querySnapshot.docs.map((doc) => {
          if (doc.data().status === "Pedido Entregue!") {
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
    <div className='global-historic'>
      <header className='historic'>
        <NavKitchen link="/historicOrdersKitchen"></NavKitchen>
      </header>
      <h1 className='header-historic'>Histórico de Pedidos</h1>
      <h2 className='head'>Cozinha</h2>
      <div className='container-historic'>
        <div className='historic-card'>
          <HistoricCardKitchen
            orders={orders} />
        </div>
      </div>
    </div>
  );
};

export default HistoricOrdersKitchen;
