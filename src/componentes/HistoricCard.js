import React from "react";
import { StyleSheet, css } from 'aphrodite';

function HistoricCard(props) {

  const doneOrder = props.doneOrder;

  const preparationTime = (secondTime, firstTime) => {
    const time = ((secondTime.getTime() - firstTime.getTime()) / 1000) / 60;
    if (Math.abs(Math.round(time)) > 1) {
      return `${Math.abs(Math.round(time))} minutos`;
    }
    return `${Math.abs(Math.round(time))} minuto`;
  };

  return (
    <div className={css(styles.divGeral)}>
      <section>
        {doneOrder.map((done) => (
          <div key={done.id} className={css(styles.cardDone)}>
            <p>Tempo preparo: {preparationTime(new Date(done.time2), new Date(done.time))}</p>
            <span>Pedido: {done.pedido.map((itens) => (
              <p>{itens.count} x {itens.name}</p>
            ))}
            </span>
            <span>Mesa: {done.table} | Cliente: {done.name}</span>
          </div>
        ))}
      </section>
    </div>
  )
}

export default HistoricCard;

const styles = StyleSheet.create({
  divGeral: {
 
  },
  cardDone: {
    borderTop: 'solid',
    display: 'flex',
    flexDirection: 'column',
    margin: '5px',
  },
})