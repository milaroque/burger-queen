import React from "react";
import getTime from "../../functions/getTime";

const HistoricCard = (props) => {
  return (
     <>
      {props.orders.map((item) =>(
       <div key={item.id}>
        <div>Cliente: {item.client} Mesa:{item.table}</div>
        <div>Pedido:{item.time}</div>
      <div>Entregue:{item.leadTime}</div>
      <div>Tempo de atendimento:{getTime(item.hall_time, item.initial_time)}</div>
        </div>       
      ))
      }
      </>
   
  );
}

export default HistoricCard;