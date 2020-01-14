import React from "react";

function MenuCard(props) {
  return (
    <section
      className={props.className}
      onClick={props.handleClick}>
      <span>{props.name}</span>
      <span>R$ {props.price},00</span>
      {props.id}
    </section>
  )
}

export default MenuCard;