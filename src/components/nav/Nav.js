import React from 'react';
import { Link } from 'react-router-dom'
import Image from "../../components/image/image";
import logo from "../../assets/logo.png";
import menu from "../../assets/menuhamburguer.png"
import exit from "../../assets/exit.png"
import Button from "../button/Button"
import firebase from "../config/firebase.js";
import "firebase/firebase-auth";


const Nav = () => {
  return (
    <nav>
      <div>
        <Image src={menu} alt="menu" className="menu-hamburguer" />
      </div>
      <div>
        <Image src={logo} alt="logo-nav" className="logo-nav" />
      </div>
      <div>
        <Link to='/'>
          <Button
            id="exit"
            className="btn-exit"
            onClick={() => firebase.auth().signOut()}>
            <Image src={exit} alt="exit" className="exit-login" />
          </Button>
        </Link>
      </div>
    </nav>
  )

}
export default Nav;
