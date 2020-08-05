import React from 'react';

const Input = ({type, name, checked, onChange, id, className, value, placeholder, children}) => {
return <input type={type} name={name} checked={checked} onChange={onChange} id={id} className={className} value={value} placeholder={placeholder}>{children}</input>

}

export default Input;