import React from "react";


const HistoricCardKitchen = (props) => {
  return (
    <>
      {props.orders.map((item) => (
        <div key={item.id}>
          <div>Cliente: {item.client} Mesa:{item.table}</div>
          <div>Pedido:{item.time}</div>
          <div>Entregue:{item.preparationTime}</div>
          <div>Tempo de preparo:</div>
        </div>
      ))
      }
    </>

  );
}

export default HistoricCardKitchen;