import React from 'react'
import Delete from '../../assets/delete.png'
import './order.css'


const Order = (props) => {
  return (
    <>
      {props.order.map((item) => (
        item.item === "Hamburger simples" || item.item === "Hamburger duplo" ?
        <main className='items'>
      <div className='key' key={item.id}>
      <div className='name-item'>{item.item} {item.type} {item.extra}</div>
      <div className='buttons'>
          <button onClick={() => props.removeClick(item)} className='btn-less'>-</button>
          <div className='sum'>{item.quantity}</div>
          <button onClick={() => props.addClick(item)} className='btn-more'>+</button>
          <button onClick={() => props.deleteClick(item)}className='btn-dump'><img className='dump' alt='lixeira' src={Delete}></img></button>
      </div>
        <div className='total-item'>R${item.price * item.quantity}</div>
      </div>
      </main>
        : 
        <main className='items'>
      <div className='key' key={item.id}>
      <div className='name-item'>{item.item}</div>
      <div className='buttons'>
          <button onClick={() => props.removeClick(item)} className='btn-less'>-</button>
          <div className='sum'>{item.quantity}</div>
          <button onClick={() => props.addClick(item)} className='btn-more'>+</button>
          <button onClick={() => props.deleteClick(item)}className='btn-dump'><img className='dump' alt='lixeira' src={Delete}></img></button>
      </div>
        <div className='total-item'>R${item.price * item.quantity}</div>
      </div>
      </main>
      ))}
    </>
  );
};

export default Order;

