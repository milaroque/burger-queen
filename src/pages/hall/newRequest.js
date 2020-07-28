import React from 'react'
import { Link } from 'react-router-dom'
import Button from '../../components/button/Button'
import firebase from "../../config/firebase.js";
import "firebase/firebase-auth";
import "firebase/firebase-firestore";
import Nav from"../../components/nav/Nav";

const newRequest = () => {
    return (
        <div link='/newRequest'>
            <Link>
          Novo Pedido
        </Link>
            <div>Página do Salão</div>
            <div>
      <Link to='/'>
        <Button name='SAIR'
          handleClick={() => firebase.auth().signOut()}/>
        </Link>
      </div>
        </div>
    )
}

export default newRequest