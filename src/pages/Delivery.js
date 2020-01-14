import React, { useState, useEffect } from 'react';
import firebase from '../componentes/firebase/firebase';
import DeliveryCard from '../componentes/DeliveryCard';
import { StyleSheet, css } from 'aphrodite';

function Delivery() {

  const [deliveryOrder, setDeliveryOrder] = useState([]);

  useEffect(() => {
    firebase.firestore().collection('pedidos')
      .orderBy('time', 'asc')
      .onSnapshot((snapshot) => {
        const printOrder = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }))
        setDeliveryOrder(printOrder.filter((deliveryOrder) => deliveryOrder.status === 'Pronto para entrega'));
      })
  }, []);

  const changeStatus = (order) => {
    firebase.firestore().collection('pedidos')
      .doc(order.id)
      .update({
        delivery: 'Entregue',
        status: 'Entregue',
      })
  }

  return (
    <div className={css(styles.divGeral)}>
      <h2>PEDIDOS DELIVERY</h2>
      <div className={css(styles.divCard)}>
        <DeliveryCard
          deliveryOrder={deliveryOrder}
          changeStatus={changeStatus}
        />
      </div>
    </div>
  )
}
export default Delivery;

const styles = StyleSheet.create({
  divGeral: {
    display: 'flex',
    flexDirection: 'column',
    borderTop: '2px solid black',
    padding: '14px',
    flexWrap: 'wrap',

  },
})