import React from "react";
import getTime from "../../functions/getTime";

const HistoricCardKitchen = (props) => {
  return (
    <>
      {props.orders.map((item) => (
        <div key={item.id}>
          <div>
            Cliente: {item.client} Mesa:{item.table}
          </div>
          <div>Pedido:{item.time}</div>
          <div>Entregue:{item.preparationTime}</div>
          <div>Tempo de preparo:{getTime(item.kitchen_time, item.initial_time)}</div>
        </div>
      ))}
    </>
  );
};

export default HistoricCardKitchen;