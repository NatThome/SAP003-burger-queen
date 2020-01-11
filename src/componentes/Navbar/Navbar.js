import React from "react";
import { Link } from 'react-router-dom';
import logobq from './logobq.png'
import { StyleSheet, css } from 'aphrodite';

const Navbar = () => {
    return (
		<header className={css(styles.header)}>
			<nav className={css(styles.nav)}>
				<ul>
					<p >
						<Link className={css(styles.pages)} to='/lounge' >Salão</Link>
					</p>
					<li >
						<Link className={css(styles.pages)} to='/kitchen'>Cozinha</Link>
					</li>
				</ul>
			</nav>
			<img className={css(styles.logo)} src={logobq} alt="Logotipo" />
		</header>
	);
};

export default Navbar;

const styles = StyleSheet.create ({
	header: {
		padding:'2vw',
		display: "flex",
	},
	logo: {
		display:'flex',
		flexDirection:'row',
		width:'50%',
		height:'auto',
		alignItems:'center',
	},
	nav: {
		display:'flex',
		flexDirection:'row',
		width:'25%',
		height:'auto',
	},
	pages: {
		display:'flex',
		justifyContent:'center',
	},
	
})
