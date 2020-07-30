import React from 'react'
import Button from '../button/Button'

const Order = (props) => {
return ( <>
<div>{props.item}</div>
<Button name='-'/>
<div>{props.quantity}</div>
<Button name='+'/>
<Button name='deletar'/>
<div>{props.price}</div>
</>
)
}