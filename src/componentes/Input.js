import React from 'react';

function Input (props){
  return(
    <>
      <input 
        className={props.className} 
        id={props.id} type={props.type} 
        class={props.class} value={props.value} 
        placeholder={props.placeholder} 
        onChange={props.handleChange} >
      </input>
    </>
  )
}

export default Input;