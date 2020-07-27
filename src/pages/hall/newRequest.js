import React from 'react'
import { Link } from 'react-router-dom' 
import Button from '../../components/button/Button'
import firebase from "../../config/firebase.js";
import "firebase/firebase-auth";
import "firebase/firebase-firestore";

const NewRequest = () => {
  const getMenu = () => {
    firebase
      .firestore()
      .collection("menu")
      .get()
      .then((snapshot) => {
      const mymenu = snapshot.docs.filter(docs => docs.data().item).map((doc) => ({
        id: doc.id,
        ...doc.data()
      })
      )
       mymenu.map((item) => console.log(item.item, item.price))
      });
  
}  
    return (
        <div>
        <Button name='MENU'
          onClick={getMenu}/>
            <div>Página do Salão</div>
            <div>
      <Link to='/'>
        <Button name='SAIR'
          onClick={() => firebase.auth().signOut()}/>
        </Link>
      </div>
        </div>
    )
}

export default NewRequest