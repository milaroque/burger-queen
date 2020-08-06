import React from "react";
import Button from "../button/Button";

const OrderCard = (props) => {
  return (
     <>
      {props.orders.map((item) =>(
       <div key={item.id}>
        <div>Cliente: {item.client} Mesa:{item.table} Pedido:{item.time}</div>
        {item.order.map((i) => (
          <div key={i.id}>{i.quantity}x {i.item}</div>
        ))}
        <Button name='Pedido Pronto' onClick={props.onClick}/>
        </div>       
      ))
      }
      </>
   
  );
}

export default OrderCard;