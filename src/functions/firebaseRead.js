import firebase from "../config/firebase";
import "firebase/firebase-auth";
import "firebase/firebase-firestore";

export const getBreak = () => {
    return new Promise((resolve) => {
      firebase.firestore().collection('breakfast')
      .orderBy('item', 'asc')
        .get()
        .then((snapshot) => {
          const breakfast = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
          })
          )
          resolve(breakfast);
  
        })
    })
  }

  export const getHamb= () => {
    return new Promise((resolve) => {
      firebase.firestore().collection('hamburger')
        .get()
        .then((snapshot) => {
          const hamburger = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
          })
          )
          resolve(hamburger);
  
        })
    })
  }
  export const getSideDishes= () => {
    return new Promise((resolve) => {
      firebase.firestore().collection('side-dishes')
      .orderBy('item', 'asc')
        .get()
        .then((snapshot) => {
          const sideDishes = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
          })
          )
          resolve(sideDishes);
  
        })
    })
  }
  export const getAdd= () => {
    return new Promise((resolve) => {
      firebase.firestore().collection('additional')
        .get()
        .then((snapshot) => {
          const add = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
          })
          )
          resolve(add);
  
        })
    })
  }
  export const getDrinks= () => {
    return new Promise((resolve) => {
      firebase.firestore().collection('drinks')
      .orderBy('item', 'desc')
        .get()
        .then((snapshot) => {
          const drinks = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
          })
          )
          resolve(drinks);
  
        })
    })
  }

const getMenu = () => {
     return Promise.all([
      getBreak(),
      getHamb(),
      getSideDishes(),
      getDrinks(),
      getAdd(), 
      
    ])
  }

  export default getMenu