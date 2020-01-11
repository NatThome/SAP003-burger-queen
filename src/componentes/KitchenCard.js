import React from "react";
import Button from '../componentes/Button';

function KitchenCard (props){

  return(
    <div>
      <section 
        className={props.className}
        onClick={props.handleClick} >
        <p>Nome: {props.name}</p>
        <p>Mesa: {props.table}</p>
        <p> Pedidos: 
          {props.pedido.map((individualOrder) => 
           <p>{individualOrder.count} x {individualOrder.name}  </p>,
          )}
        </p>
        <p>Status: {props.status}</p>
        <p>Hora: {props.time}</p>
        {props.id}
      </section>
      <div>
      <Button
      handleClick={(e) => {
        e.preventDefault();
        props.changeStatus()
      }}
        name={'Pronto'}/>
      </div>
    </div>
  )
}

export default KitchenCard;