import React from "react";
import Button from '../componentes/Button';
import { StyleSheet, css } from 'aphrodite';

function KitchenCard(props) {

  const includeOrder = props.includeOrder;

  return (
    <div className={css(styles.divGeral)}>
      <section >
        {includeOrder.map((personalOrder) => (
          <div key={personalOrder.id} className={css(styles.cardKitchen)}>
            <span className={css(styles.status)}>{personalOrder.status}</span>
            <span>Mesa: {personalOrder.table} | Cliente: {personalOrder.name}</span>
            <span>Pedido: {personalOrder.pedido.map((itens) => (
              <p>{itens.count} x {itens.name}</p>
            ))}</span>
            <Button className={css(styles.btnPronto)}
              key={personalOrder.id}
              handleClick={(e) => {
                e.preventDefault();
                props.changeStatus(personalOrder);
              }}
              name={'Pronto'} />
          </div>
        ))}
      </section>
    </div>
  )
}

export default KitchenCard;

const styles = StyleSheet.create({
  divGeral: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  cardKitchen: {
    margin: '10px',
    padding: '10px',
    width: '300px',
    height: 'fit-content',
    background: '#F9AB55',
    fontSize: '110%',
    color: '#7A4991',
    textAlign: 'start',
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
    height: '40px',
    margin: '10px',
    background: '#7A4991',
    fontSize: '100%',
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