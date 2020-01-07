import React, { useState, useEffect } from 'react';
import Button from '../componentes/Button';
import firebase from '../componentes/firebase/firebase';
import { StyleSheet, css } from 'aphrodite';
import MenuCard from '../componentes/Card';
import Input from '../componentes/Input';
import alertify from 'alertifyjs';

function Lounge() {
  
  const [menu, setMenu] = useState([]);
  const [tipoMenu, setTipoMenu] = useState([]);
  const [pedido, setPedido] = useState([]);
  const [client, setClient] = useState('');
  const [table, setTable] = useState('');

  useEffect(() => {
  firebase.firestore().collection('menu').get().then(snapshot => {
    const menuTela = snapshot.docs.map((doc) => ({
      ...doc.data()
    }))
    setMenu(menuTela);
    setTipoMenu(tipoMenu);
  })
  }, [0]);

  function filterMenu(tipoMenu){
    if(tipoMenu === 'lunch'){
      const filtered = menu.filter((item) => item.category === "lunch")
      setTipoMenu(filtered);
    } else if(tipoMenu === 'breakfast'){
      const filtered = menu.filter((item) => item.category === "breakfast")
      setTipoMenu(filtered);
    } 
  }

  const total = pedido.reduce((acumulator, item) => acumulator + (item.price * item.count), 0);

  const countFunction = (item) => {
    if (!pedido.includes(item)) {
      item.count = 1;
      setPedido([...pedido, item])
    } else {
      item.count += 1;
      setPedido([...pedido])
    }
  }

  const removeItem = (item) => {
    if(pedido.includes(item)){
      item.count -= 1;
    }
    const remove = pedido.filter(el => el.count > 0)
      setPedido([...remove])
  }

  const deletItem = (item) => {
    const index = (pedido.indexOf(item));
    pedido.splice(index, 1);
    setPedido([...pedido])
  }

  const addItem = (item) => {
    item.count += 1;
    setPedido([...pedido])
  }

  const sendPedido = () => {
    if(client && table != ""){
    
      const order = {
        name: client,
        table: table,
        time: new Date().toLocaleString('pt-BR'),
        pedido: pedido,
        total: total
      };
    
      firebase.firestore().collection('pedidos').add(order).then(() => {
        alertify.success('Enviou!');
        setClient(['']);
        setTable(['']);
        setPedido([]);
      })
    }else if (!client){
      alertify.error('Digite o nome!!!');
    }else if(!table){
      alertify.error('Digite a mesa!!!');
    }
  }
  
  return (
    <>
    <h1>Burger Queen</h1>
    <div className={css(styles.floorPage)}>
      <div className={css(styles.styleMenu)}>  
        <h1> Menu </h1>
        <div>
          <Button 
            className={css(styles.btnMenu)} 
            handleClick={() => filterMenu('lunch')} 
            name={'Lanches'}/>
          <Button 
            className={css(styles.btnMenu)} 
            handleClick={() => filterMenu('breakfast')} 
            name={'Café da Manhã'}/>
        </div>
        <div>
          {tipoMenu.map((item) => 
            <MenuCard 
              className={css(styles.menuCard)} 
              name={item.name} 
              price={item.price} 
              handleClick={() => countFunction(item)}/> 
          )}
        </div>
      </div>
      <div className={css(styles.styleMenu)}>  
        <h1> Pedido </h1>
        <div>
          <Input 
            className={css(styles.inputCli)} 
            value={client} 
            type={'text'} 
            placeholder={'Nome'} 
            handleChange={event => setClient(event.currentTarget.value)} />
          <Input 
            className={css(styles.inputCli)} 
            value ={table} 
            type={'number'} 
            placeholder={'Mesa'} 
            handleChange={event => setTable(event.currentTarget.value)} />
        </div>

          {pedido.map((elem) => 
            <div className={css(styles.pOrder)}>
              <Button 
                className={css(styles.btnAdd)} 
                name={'-'} 
                handleClick={(event) => {
                  event.preventDefault();
                  removeItem(elem);
                }}/>
              <p className={css(styles.pOrder)}> {elem.name} - R$ {elem.price},00 * {elem.count} </p>
              <Button 
                className={css(styles.btnAdd)} 
                name={'+'} 
                handleClick={(event) => {
                  event.preventDefault();
                  addItem(elem);
                }}/>
              <Button 
                className={css(styles.btnDel)} 
                name={'🗑️'} 
                handleClick={(event) => {
                  event.preventDefault();
                  deletItem(elem);
                }}/>
            </div>
          )}
          <strong className={css(styles.total)}>Total: {total}</strong>
         
          <div> 
            <Button 
              className={css(styles.btnPedido)} 
              name={'Enviar Pedido'} 
              handleClick={(event) => {
                event.preventDefault();
                sendPedido();
              }}/>
          </div>
      </div>
    </div>
    </>
  );
}

export default Lounge;

const styles = StyleSheet.create({
  floorPage: {
    display: 'flex',
    borderTop: '5px solid black',
    background: 'white'
  },
  styleMenu: {
    display: 'flex',
    flexDirection: 'column',
    width: '50vw',
  },
  btnMenu: {
    width: '170px',
    height: '50px',
    background: 'orange',
    fontFamily: 'CoolFont',
    fontStyle:'normal',
    fontSize: '130%',
  },
  btnAdd: {
    width: '40px',
    height: '40px',
    borderRadius: '50px',
    border: 'none'
  },
  btnDel: {
    fontSize: '30px',
    backgroundColor: 'white',
    border: 'none'
  },
  pOrder: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '20px'
  },
  btnPedido: {
    width: '50%',
    height: '50px',
    background: 'red',
    fontFamily: 'comic',
    fontSize: '130%',
  },
  inputCli: {
    width: '150px',
    height: '30px',
    fontSize: '130%'
  },
  total: {
    fontSize: '150%'
  },
  menuCard: {
    width: '180px',
    height: '100px',
    background: 'pink',
    fontFamily: 'CoolFont',
    fontStyle:'normal',
    fontSize: '120%',
    flexDirection:'column',
    alignItems: 'center',
    display: 'flex',
    justifyContent:'space-around'
  }



})
