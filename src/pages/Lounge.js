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
  //const [modal, setModal] = useState({status: false});
  //const [options, setOptions] = useState('');

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
    const itemIndex = pedido.findIndex(orderItem => orderItem.name === item.name);
    if (itemIndex === -1){
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
        total: total,
        status: 'Preparando',
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

  // const veryfyOptions = (menuOptions) => {
  //   if(menuOptions.options.lenght !== -1){
  //     setModal({status: true, item: menuOptions})
  //   } else {
  //     countFunction(menuOptions);
  //   }
  // }
  
  return (
    <>
    <div className={css(styles.floorPage)}>
      <div className={css(styles.styleMenu)}>  
        <div className={css(styles.menuBtn)}>
          <Button 
            className={css(styles.btnMenu)} 
            handleClick={() => filterMenu('lunch')} 
            name={'Lanches'}/>
          <Button 
            className={css(styles.btnMenu)} 
            handleClick={() => filterMenu('breakfast')} 
            name={'Café da Manhã'}/>
        </div>
        <div className={css(styles.divMenu)}>
          {tipoMenu.map((item) => 
            <MenuCard 
              className={css(styles.menuCard)} 
              name={item.name} 
              price={item.price} 
              handleClick={() => countFunction(item)}
              key={item.id}/> 
              //handleClick={() => veryfyOptions(item)}/> 
          )}
        </div>
      </div>
      {/* { modal.status ? (
        <div >
          <h3>Extras</h3>
            {modal.item.extras.map((elem, index) => {
              <div key={index}>
                <input type='radio' name='extras' value={elem}/>
                <label>{elem}</label>
              </div>
            })}
          <h3>Opçoes</h3>
          {modal.item.options.map((elem, index) => {
              <div key={index}>
                <input type='radio' name='options' value={elem}/>
                <label>{elem}</label>
              </div>
            })}
        </div>

      ): false} */}
      <div className={css(styles.styleOrder)}>  
        <h1 className={css(styles.title)}>Resumo do Pedido</h1>
        
          <Input 
            className={css(styles.inputCli)} 
            value={client} 
            type={'text'} 
            placeholder={'Nome'} 
            handleChange={event => setClient(event.currentTarget.value)}/>
          <Input 
            className={css(styles.inputCli)} 
            value ={table} 
            type={'number'} 
            placeholder={'Mesa'} 
            handleChange={event => setTable(event.currentTarget.value)} />
        
        <section className={css(styles.cardOrder)}>
          {pedido.map((elem) => 
            <span className={css(styles.pOrder)}>
              <p className={css(styles.pOrder)}> {elem.name} - R$ {elem.price},00 </p>
              <Button 
                className={css(styles.btnRemov)} 
                name={'-'} 
                handleClick={(event) => {
                  event.preventDefault();
                  removeItem(elem);
                }}/>
              <p className={css(styles.pOrder)}> {elem.count} </p>
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
            </span>
          )}
        </section>
          <strong className={css(styles.total)}>Total: {total},00</strong>
    
            <Button 
              className={css(styles.btnPedido)} 
              name={'Enviar Pedido'} 
              handleClick={(event) => {
                event.preventDefault();
                sendPedido();
              }}/>
      </div>
    </div>
    </>
  );
}

export default Lounge;

const styles = StyleSheet.create({
  title:{
    color: 'white',
    marginTop: '0',
  },
  floorPage: {
    display: 'flex',
    borderTop: '2px solid black',
    padding: '14px',
  },
  styleMenu: {
    display: 'flex',
    flexDirection: 'column',
    width: '50vw',
    padding:'14px',
    marginTop: '10px',
  },
  divMenu: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%',
    height: '20%',
    justifyContent: 'space-evenly'
  },
  menuBtn: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  styleOrder: {
    display: 'flex',
    flexDirection: 'column',
    alignItems:'center',
    width: '50vw',
    padding:'14px',
    marginTop:'10px',
    border: 'solid 2px',
  },
  btnMenu: {
    width: '170px',
    height: '50px',
    margin: '20px',
    padding: '4px',
    background: 'orange',
    fontSize: '130%',
    color:'white',
    borderRadius: '20px',
    border: 'none',
  },
  btnAdd: {
    width: '40px',
    height: '40px',
    borderRadius: '50px',
    border: 'solid',
    backgroundColor:'#4cd137',
    margin: '10px',
    fontSize: '120%',
  },
  btnRemov: {
    width: '40px',
    height: '40px',
    borderRadius: '50px',
    border: 'solid',
    backgroundColor:'#e84118',
    margin: '10px',
    fontSize: '120%',
  },
  btnDel: {
    fontSize: '30px',
    backgroundColor: '#995DB5',
    border: 'none'
  },
  cardOrder:{
    display:'flex',
    flexDirection:'column',
    alignItems:'baseline',
  },
  pOrder: {
    margin: '0',
    display: 'flex',
    alignItems: 'center',
    fontSize: '20px',
    color: 'white',
  },
  btnPedido: {
    width: '50%',
    height: '50px',
    background: '#F79539',
    fontSize: '130%',
    color:'white',
    border: 'none',
    borderRadius: '20px',
  },
  inputCli: {
    margin:'alto',
    width: '80%',
    padding: '10px',
    fontSize: '20px',
    margin: '10px',
    borderRadius: '4px',
  },
  total: {
    margin: '1vw',
    fontSize: '150%',
    color:'white'
  },
  menuCard: {
    margin: '10px',
    width: '200px',
    height: '100px',
    background: '#F9AB55',
    fontSize: '120%',
    color: '#7A4991',
    flexDirection:'column',
    alignItems: 'center',
    display: 'flex',
    justifyContent:'space-around',
    textAlign:'center',
    borderColor: 'black',
    borderStyle: 'solid',
    borderRadius: '4px',
  }

})
