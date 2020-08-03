import React from 'react'
import Delete from '../../assets/delete.png'
import './order.css'

const Order = (props) => {

  return (<>
    {props.order.map((item, className) => (
      <main className='items'>
      <div key={item.id}
        value={item.price}>
        <div>{item.item}</div>
          <button onClick={() => props.removeClick(item)} className='btn-order'>-</button>
          <div>{item.quantity}</div>
          <button onClick={() => props.addClick(item)} className='btn-order'>+</button>
          <button onClick={() => props.deleteClick(item)}className='btn-order'><img className='dump' alt='lixeira' src={Delete}></img></button>
        <div>R${item.price}</div>
        <div>R${item.total}</div>
      </div>
      </main>
    ))
    }
  </>
  )
}

export default Order;