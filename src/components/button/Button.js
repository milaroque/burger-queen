import React from 'react';
import './button.css'

const Button = (props) => {
return <button type={props.type} onClick={props.onClick} id={props.id} className={props.class}>{props.name}</button>
}

export default Button;