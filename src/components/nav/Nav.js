import React from 'react';
import { Link } from 'react-router-dom'
import Image from "../../components/image/image";
import logo from "../../assets/logo.png";
import menu from "../../assets/menuhamburguer.png"
import exit from "../../assets/exit.png"
import firebase from "../../config/firebase.js";
import "firebase/firebase-auth";
import "./nav.css";


const Nav = () => {
  return (
    <nav className="menu-buguer">
      <div>
        <Image src={menu} alt="menu" class="menu-hamburguer" />
      </div>
      <div>
        <Image src={logo} alt="logo-nav" class="logo-nav" />
      </div>
      <div>
        <Link to='/'>
          <button
            id="exit"
            className="btn-exit"
            onClick={() => firebase.auth().signOut()}>
            <Image src={exit} alt="exit" class="exit-login" />
          </button>
        </Link>
      </div>
    </nav>
  )

}

export default Nav;

