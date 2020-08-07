import React from 'react';
import './App.css';
import Login from './pages/login/login.js'
import OrdersReceived from './pages/kitchen/ordersReceived'
import NewRequest from './pages/hall/newRequest'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import OrdersDelivery from './pages/kitchen/ordersToBeDelivered';
import HistoricOrders from './pages/hall/historicOrders';
import HistoricOrdersKitchen from './pages/kitchen/historicOrdersKitchen';

export default function App() {

  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/ordersReceived" component={OrdersReceived} />
        <Route path="/newRequest" component={NewRequest} />
        <Route path="/ordersToBeDelivered" component={OrdersDelivery} />
        <Route path="/historicOrders" component={HistoricOrders} />
        <Route path="/historicOrdersKitchen" component={HistoricOrdersKitchen} />
        <Route exact path="/" component={Login} />
      </Switch>
    </Router>
  );
}
