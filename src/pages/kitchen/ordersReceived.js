import React from 'react'
import { Link } from 'react-router-dom'
import Button from '../../components/button/Button';
import firebase from "../../config/firebase.js";
import "firebase/firebase-auth";
import "firebase/firebase-firestore";
import Nav from "../../components/nav/Nav";

const ordersReceived = () => {
    return(
      <div link='/newRequest'>
        <Nav>
            Cozinha
        </Nav>
      </div>
    )
  }

export default ordersReceived;