import React from 'react';

function Input (props){
  return(
    <>
      <input id={props.id} type={props.type} placeholder={props.placeholder} onChange={props.onChange}></input>
    </>
  )
}

export default Input;