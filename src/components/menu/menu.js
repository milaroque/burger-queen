import React from "react";
import "./menu.css";

function Menu(props) {
  return (
    <>
      {props.menu.map((item) => (
        <button className={props.className} 
          onClick={() => props.addOrder(item)}
          key={item.id}
          value={item.price}
        >
          <div>
            <img src={item.icon} alt={props.alt} className="imagem"></img>
          </div>
          <div className="name"> {item.item} </div>
          <div className="price">R${item.price}</div>
        </button>
      ))}
    </>
  );
}

export default Menu;
