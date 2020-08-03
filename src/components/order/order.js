import React from 'react'
import Delete from '../../assets/delete.png'

const Order = (props) => {

return ( <>
{props.order.map((item) => (
<div key={item.id}
value={item.price}>
<div>{item.item} {item.type} {item.extra}</div>
<button onClick={() => props.removeClick(item)}>-</button> 
<div>{item.quantity}</div>
<button onClick={() => props.addClick(item)}>+</button>
<button onClick={() => props.deleteClick(item)}><img className={props.className} alt='lixeira' src={Delete}></img></button>
{/* <div>R${item.price}</div>  */}
<div>R${item.total},00</div>
</div>
))}
</>
)
}

export default Order;