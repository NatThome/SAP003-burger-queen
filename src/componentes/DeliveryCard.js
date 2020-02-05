import React from "react";
import Button from '../componentes/Button';
import { StyleSheet, css } from 'aphrodite';

function DeliveryCard(props) {

  const { deliveryOrder } = props;

  return (
    <div className={css(styles.divCardDelivery)}>
      <section >
        {deliveryOrder.map((personalOrder) => (
          <div key={personalOrder.id} className={css(styles.cardDelivery)}>
            <span className={css(styles.status)}>{personalOrder.status}</span>
            <span>Mesa: {personalOrder.table}</span>
            <span>Cliente: {personalOrder.name}</span>
            <span>Pedido: {personalOrder.pedido.map((itens) => (
              <p>{itens.count} x {itens.name}</p>
            ))}</span>
            <Button className={css(styles.btnPronto)}
              key={personalOrder.id}
              handleClick={(e) => {
                e.preventDefault();
                props.changeStatus(personalOrder);
              }}
              name={'Entregue'} />
          </div>
        ))}
      </section>
    </div>
  )
}

export default DeliveryCard;

const styles = StyleSheet.create({
  divCardDelivery: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  cardDelivery: {
    margin: '10px',
    padding: '10px',
    width: '300px',
    height: 'fit-content',
    background: '#F9AB55',
    fontSize: '100%',
    color: '#7A4991',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderColor: 'black',
    borderStyle: 'solid',
    borderRadius: '4px',
  },
  btnPronto: {
    width: '140px',
    height: '30px',
    margin: '10px',
    background: '#7A4991',
    fontSize: '90%',
    color: 'white',
    borderRadius: '15px',
    border: 'none',
  },
  status: {
    fontSize: '130%',
    margin: '10px',
    color: 'white',
  }
})