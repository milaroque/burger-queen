import React from 'react';

const Input = ({type, name, checked, onChange, id, className, value, placeholder}) => {
return <input type={type} name={name} checked={checked} onChange={onChange} id={id} className={className} value={value} placeholder={placeholder}></input>

}

export default Input;