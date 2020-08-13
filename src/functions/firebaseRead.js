import firebase from "../config/firebase";
import "firebase/firebase-auth";
import "firebase/firebase-firestore";

export const getBreak = () => {
    return new Promise((resolve) => {
      firebase.firestore().collection('breakfast')
      .orderBy('item', 'asc')
      .onSnapshot(querySnapshot => {
        const breakfast = querySnapshot.docs.map((doc) => ({
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
      .onSnapshot(querySnapshot => {
        const hamburger = querySnapshot.docs.map((doc) => ({
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
      .onSnapshot(querySnapshot => {
        const sideDishes = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        })
        )
        resolve(sideDishes);
      })
    })
  }

  export const getDrinks= () => {
    return new Promise((resolve) => {
      firebase.firestore().collection('drinks')
      .orderBy('item', 'desc')
      .onSnapshot(querySnapshot => {
        const drinks = querySnapshot.docs.map((doc) => ({
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

    ])
  }

  export default getMenu