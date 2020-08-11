import React from "react";
import getTime from "../../functions/getTime";
import "./historicCardKitchen.css";


const HistoricCard = (props) => {
  return (
    <div className='container__inner'>
      {props.orders.map((item) => (
        <div className='card__inner' >
          <div className='card__list' key={item.id}>
            <div className='itens__client'>
              Cliente: {item.client}
              <li>
              Mesa: {item.table}
              </li>
            </div>
            <div className='itens__card'>
              <div>Pedido:{item.time}</div>
              <div>Entregue:{item.leadTime}</div>
            </div>
            <div className='itens__time'>Tempo de atendimento: 
            <li>
              {getTime(item.hall_time, item.initial_time)}
            </li>
            </div>
          </div>
        </div>
      ))
      }
    </div>
  );
}

export default HistoricCard;