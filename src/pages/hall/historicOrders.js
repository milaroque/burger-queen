import React, { useState, useEffect } from "react";
import Nav from "../../components/nav/Nav";
import firebase from "../../config/firebase";
import "firebase/firebase-firestore";
import HistoricCard from "../../components/historicCard/historicCard";
import Swal from "sweetalert2"

const HistoricOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    firebase
      .firestore()
      .collection("orders")
      .orderBy('time','desc')
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
    <div link="/historicOrders">
      <Nav>Salão</Nav>
      <div>Histórico de Pedidos</div>
      <div>
        <HistoricCard orders={orders} />
      </div>
    </div>
  );
};

export default HistoricOrders;