import React from 'react';
import './App.css';
import Login from './pages/login/login.js'
import OrdersReceived from './pages/kitchen/ordersReceived'
import NewRequest from './pages/hall/newRequest'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import OrdersDelivery from './pages/hall/ordersToBeDelivered';
import HistoricOrders from './pages/hall/historicOrders';
import HistoricOrdersKitchen from './pages/kitchen/historicOrdersKitchen';
import firebase from './config/firebase';
import 'firebase/firebase-auth'

export default function App() {
  const PrivateRoute = ({component: Component, ...rest}) => {
    return (
        <Route {...rest} render={props => (
            firebase.auth().currentUser ?
                <Component {...props} />
            : <Redirect to='/' /> 
        )} />
    );
    };
    
  return (
    <Router>
        <Switch>
          <Route path="/login" component={Login}/>
          <PrivateRoute path="/ordersReceived" component={OrdersReceived}/>
          <PrivateRoute path="/newRequest" component={NewRequest}/>
          <PrivateRoute path="/ordersToBeDelivered" component={OrdersDelivery}/>
          <PrivateRoute path="/historicOrders" component={HistoricOrders}/>
          <PrivateRoute path="/historicOrdersKitchen" component={HistoricOrdersKitchen}/>
          <Route exact path="/" component={Login}/>
        </Switch>
    </Router>
  );
}
