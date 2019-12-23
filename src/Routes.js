import React from 'react';
//import { isAuthenticated } from '../auth'
import { BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import Kitchen from './pages/Kitchen';
import Waiter from './pages/Waiter';


// const PrivateRoute = ({ component: Component, ...rest }) => (
//     <Route
//       {...rest}
//       render={props =>
//         isAuthenticated() ? (
//           <Component {...props} />
//         ) : (
//           <Redirect to={{ pathname: '/', state: { from: props.location} }} />
//         )
//       }
//     />
//   );
  
  const Routes = () => (
    <>
    <BrowserRouter>
      <Switch>
        <Route exact path='/Kitchen' component={() => <h1>Oie</h1>} />
        <Route path='/Waiter' component={() => <h1> Logado</h1>} />
      </Switch>
    </BrowserRouter>
    </>
  )

  export default Routes;