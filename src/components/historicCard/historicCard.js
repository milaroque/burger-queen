import React from "react";


const HistoricCard = (props) => {
  return (
    <>
      {props.orders.map((item) => (
        <div key={item.id}>
          <div>Cliente: {item.client} Mesa:{item.table}</div>
          <div>Pedido:{item.time}</div>
          <div>Entregue:{item.leadTime}</div>
          <div>Tempo de Atendimento:</div>
        </div>
      ))
      }
    </>

  );
}

export default HistoricCard;