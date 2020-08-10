import React, { useState, useEffect } from "react";
import NavKitchen from "../../components/nav/NavKitchen";
import firebase from "../../config/firebase";
import "firebase/firebase-firestore";
import HistoricCardKitchen from "../../components/historicCard/historicCardKitchen";
import Swal from "sweetalert2";
import "./historicOrdersKitchen.css";


const HistoricOrdersKitchen = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    firebase
      .firestore()
      .collection("orders")
      .orderBy('time', 'desc')
      .get()
      .then((snapshot) => {
        const pedidos = snapshot.docs.map((doc) => {
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
      .catch((error) => {
        Swal.fire({
          text: error,
          icon: 'warning'
        })
      })
  }, []);

  return (
    <div className='global-historic'>
      <header className='historic'>
      <NavKitchen link="/historicOrdersKitchen"></NavKitchen>
      </header>
      <h1 className='header-historic'>Histórico de Pedidos</h1>
      <div className='historic-card'>
        <HistoricCardKitchen orders={orders} />
      </div>
    </div>
  );
};

export default HistoricOrdersKitchen;