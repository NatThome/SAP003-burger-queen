import React, { useState, useEffect } from 'react';
import firebase from '../componentes/firebase/firebase';
import KitchenCard from '../componentes/KitchenCard';
import HistoricCard from '../componentes/HistoricCard';
import { StyleSheet, css } from 'aphrodite';

function Kitchen() {

  const [includeOrder, setIncludeOrder] = useState([]);
  const [doneOrder, setDoneOrder] = useState([]);

  useEffect(() => {
    firebase.firestore().collection('pedidos')
      .orderBy('time', 'asc')
      .onSnapshot((snapshot) => {
        const printOrder = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }))
        setIncludeOrder(printOrder.filter((includeOrder) => includeOrder.status === 'Preparando'));

        const historic = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }))
        setDoneOrder(historic.filter((includeOrder) => includeOrder.status === 'Pronto para entrega' || includeOrder.status === 'Entregue'));
      })
  }, []);

  const changeStatus = (order) => {
    firebase.firestore().collection('pedidos')
      .doc(order.id)
      .update({
        status: 'Pronto para entrega',
        time2: new Date().getTime(),
        delivery: 'Entrega pendente',
      })
  }

  return (
    <>
      <div className={css(styles.divGeral)}>
        <div className={css(styles.divMenu)}>
          <h2 >AGUARDANDO PREPARO</h2>
          <KitchenCard
            includeOrder={includeOrder}
            changeStatus={changeStatus}
          />
        </div>
        <div className={css(styles.divDone)}>
          <h3>HISTÓRICO</h3>
          <HistoricCard
            doneOrder={doneOrder}
          />
        </div>
      </div>
    </>
  )
}
export default Kitchen;


const styles = StyleSheet.create({
  divGeral: {
    display: 'flex',
    borderTop: '2px solid black',
    padding: '14px',
  },
  divMenu: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '60vw',
    padding: '14px',
    marginTop: '10px',
  },
  divDone: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: 'fit-content',
    padding: '14px',
    marginTop: '10px',
    border: 'solid 2px',
    background: '#C0C0C0',
    opacity: '70%',
  },

})