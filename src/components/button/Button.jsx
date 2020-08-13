import React from 'react';
import './button.css'

const Button = ({type, data, onClose, onClick, id, disabled, className, name}) => {
return <button type={type} data-testid={data} onClose={onClose} onClick={onClick} id={id} disabled={disabled} className={className}>{name}</button>
}

export default Button;