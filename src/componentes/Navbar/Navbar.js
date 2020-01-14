import React from "react";
import { Link } from 'react-router-dom';
import logobq from './logobq.png'
import { StyleSheet, css } from 'aphrodite';

const Navbar = () => {
  return (
    <header className={css(styles.header)}>
      <img className={css(styles.logo)} src={logobq} alt="Logotipo" />
      <div>
        <nav className={css(styles.nav)}>
          <Link className={css(styles.colorNav)} to='/lounge' >Salão</Link>
          <Link className={css(styles.colorNav)} to='/kitchen'>Cozinha</Link>
          <Link className={css(styles.colorNav)} to='/delivery'>Delivery</Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;

const styles = StyleSheet.create({
  header: {
    padding: '2vw',
    display: "flex",
    flexDirection: 'column',
    alignItems: 'center',
  },
  logo: {
    width: '50%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  nav: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: 'auto',
    marginTop: '2vw',
  },
  colorNav: {
    backgroundColor: '#F79539',
    fontSize: '130%',
    fontWeight: 'bold',
    color: 'white',
    padding: '10px',
    width: '220px',
    height: 'auto',
    textDecorationLine: 'none',
    textAlign: 'center',
  }

})
