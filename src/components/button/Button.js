import React from 'react';
import './button.css'

const Button = ({type, onClick, id, disabled, className, name}) => {
return <button type={type} onClick={onClick} id={id} disabled={disabled} className={className}>{name}</button>
}

export default Button;