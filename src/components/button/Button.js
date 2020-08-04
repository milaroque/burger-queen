import React from 'react';
import './button.css'

const Button = ({type, onClose, onClick, id, disabled, className, name}) => {
return <button type={type} onClose={onClose} onClick={onClick} id={id} disabled={disabled} className={className}>{name}</button>
}

export default Button;