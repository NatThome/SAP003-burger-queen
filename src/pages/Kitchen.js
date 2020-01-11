import React, { useState, useEffect } from 'react';
import firebase from '../componentes/firebase/firebase';
import KitchenCard from '../componentes/KitchenCard';

function Kitchen() {

  const [includeOrder, setIncludeOrder] = useState([]);

  console.log(includeOrder);
    

  useEffect(() => {
    firebase.firestore().collection('pedidos')
      .where('status', '==', 'Preparando')
      .get()
      .then(snapshot => {
        const printOrder = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data() 
      }))
      //console.log(id)
     
      setIncludeOrder(printOrder);
    })
    }, [0]);

   

   
    const changeStatus = () => {
      console.log(includeOrder.id);
      
      firebase.firestore.collection('pedidos')
      .doc(changeStatus.id)
      .update({
          status: 'Pendente',
      })
    }
    
    

  return (
    <>
      <h1>Cozinha</h1>
      <h2>PEDIDOS ENCAMINHADOS</h2>
      <div >
          {includeOrder.map((item) => 
            <KitchenCard 
              changeStatus={changeStatus}
               name={item.name} 
               table={item.table}
               pedido={item.pedido}
               status={item.status}
               time={item.time}
               key={item.id}
              /> 
          )}
        </div>
    </>
  )
}
export default Kitchen;