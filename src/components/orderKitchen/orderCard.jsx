import React from "react";
import Button from "../button/Button";
import './orderCard.css'

const OrderCard = (props) => {
  return (
    <>
      {props.orders.map((item) => (
        <div className='card-kitchen' key={item.id}>
          <div className='head__order-card'>Cliente: {item.client} Mesa:{item.table} Pedido:{item.time}</div>
          {item.order.map((i) => (
            <div className='command'>
              <div key={i.id}>{i.quantity}x {i.item} {i.type} {JSON.parse(i.extra)}</div>
            </div>
          ))}
          <Button name={item.status} className='btn-kitchen' onClick={() => props.onClick(item.id)} />
        </div>
      ))
      }
    </>

  );
}

export default OrderCard;