import React from "react";
import { 
  BrowserRouter as Router, 
  Route, 
  Switch, 
  } from 'react-router-dom';
import Kitchen from './pages/Kitchen';
import Lounge from './pages/Lounge';
import Navbar from './componentes/Navbar/Navbar.js';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Switch>
          <Route exact path="/lounge" component={Lounge}/>
          <Route path="/kitchen" component={Kitchen}/>
        </Switch>
      </div>
    </Router>
  )
}

export default App;