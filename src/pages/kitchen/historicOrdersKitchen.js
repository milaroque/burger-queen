import React, { useState, useEffect } from "react";
import NavKitchen from "../../components/nav/NavKitchen";
import firebase from "../../config/firebase";
import "firebase/firebase-firestore";
import HistoricCardKitchen from "../../components/historicCard/historicCardKitchen";
import Swal from "sweetalert2";

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
    <div link="/historicOrdersKitchen">
      <NavKitchen>Salão</NavKitchen>
      <div>Histórico de Pedidos</div>
      <div>
        <HistoricCardKitchen orders={orders} />
      </div>
    </div>
  );
};

export default HistoricOrdersKitchen;