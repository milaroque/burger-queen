import React from 'react';

const Input = ({type, name, data, checked, onChange, id, className, value, placeholder}) => {
return <input type={type} name={name} data-testid={data} checked={checked} onChange={onChange} id={id} className={className} value={value} placeholder={placeholder}></input>

}

export default Input;