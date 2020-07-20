import React from 'react';

const Input = (props) => {
  return <input type={props.type} id={props.id} className={props.class} placeholder={props.placeholder}></input>
}

export default Input;