import React, { useState, useEffect } from 'react';
import Button from './componentes/Button';
// import Waiter from "./pages/waiter";
// import Kitchen from "./pages/kitchen";
// import Routes from './pages/routes';
import firebase from './componentes/firebase/firebase';
import { StyleSheet, css } from 'aphrodite';
import MenuCard from './componentes/Card';
import Input from './componentes/Input';
// import logo from './logo.svg';
// import './App.css';

function App() {
  // const App = () => <Routes />;
  const [menu, setMenu] = useState([]);
  const [tipoMenu, setTipoMenu] = useState([]);
  const [pedido, setPedido] = useState([]);

  useEffect(() => {
  firebase.firestore().collection('menu').get().then(snapshot => {
    const menuTela = snapshot.docs.map((doc) => ({
      ...doc.data()
    }))
    setMenu(menuTela);
    setTipoMenu(tipoMenu);
  })
  }, [0])

  function filterMenu(tipoMenu){
    if(tipoMenu === 'lunch'){
      const filtered = menu.filter((item) => item.category === "lunch")
      setTipoMenu(filtered);
    } else if(tipoMenu === 'breakfast'){
      const filtered = menu.filter((item) => item.category === "breakfast")
      setTipoMenu(filtered);
    } 
  }

  // function addCommand(item){
  //  setPedido(estadoAtual => [...estadoAtual, item]);

  // }

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

  const deletItem = (item) => {
    const index = (pedido.indexOf(item));
    pedido.splice(index, 1);
    setPedido([...pedido])
  }
  
  return (
    <>
      <h1>Burger Queen</h1>

      <div>
        <h1> Pedido </h1>
          {pedido.map((elem) => 
          <div>
            {elem.name} - {elem.price} * {elem.count}
            <Button name={'Deletar'} handleClick={(event) => {
              event.preventDefault();
              deletItem(elem);
            }}/>
          </div>
          )}
          <strong>Total: {total}</strong>
      </div>
      
      <div>
        <Input className={css(styles.inputCli)} type={Text} placeholder={'Nome'} onChange={''}/>
        <Input className={css(styles.inputCli)} type={Number} placeholder={'Mesa'} onChange={''}/>
      </div>

      <div>
        <Button className={css(styles.btnMenu)} handleClick={() => filterMenu('lunch')} name={'Lanches'}/>
        <Button className={css(styles.btnMenu)} handleClick={() => filterMenu('breakfast')} name={'Café da Manhã'}/>
      </div>

      <div>
        {tipoMenu.map((item) => 
          <MenuCard name={item.name} price={item.price} handleClick={() => countFunction(item)}/> 
        )}
      </div>
    </>
  );
}

export default App;

const styles = StyleSheet.create({
  btnMenu: {
    width: '30%',
    height: '50%',
    background: 'orange',
  }
})
