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

export default function App() {

  return (
    <Router>
        <Switch>
          <Route path="/login" component={Login}/>
          <Route path="/ordersReceived" component={OrdersReceived}/>
          <Route path="/newRequest" component={NewRequest}/>
          <Route exact path="/" component={Login}/>
        </Switch>
    </Router>
  );
}
