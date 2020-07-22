import React from 'react';

const Input = (props) => {
  return <input type={props.type} name={props.name} checked={props.checked} onChange={props.onChange} id={props.id} className={props.class} value={props.value} placeholder={props.placeholder}></input>
}

export default Input;