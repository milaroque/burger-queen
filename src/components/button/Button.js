import React from 'react';
import './button.css'

const Button = ({type, onClick, id, className, name}) => {
return <button type={type} onClick={onClick} id={id} className={className}>{name}</button>
}

export default Button;