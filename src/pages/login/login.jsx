import React, { useState } from "react";
import Button from "../../components/button/Button";
import Input from "../../components/input/Input";
import Image from "../../components/image/image";
import logo from "../../assets/logo.png";
import Modal from "../../components/modal/modal";
import Register from "../register/register";
import Footer from '../../components/footer/footer'
import firebase from "../../config/firebase.js";
import "firebase/firebase-auth";
import "firebase/firebase-firestore";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
import "./login.css";
import authErrors from "../../config/errorsfirebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false)
  const history = useHistory();
  const eyes = <FontAwesomeIcon icon={faEye} />;

  const loginUser = () => {
    if (!email) {
      Swal.fire({
        text: 'Prencha o campo de "email"',
        icon: "warning",
      });
    } else if (!password) {
      Swal.fire({
        text: 'Prencha o campo de "senha"',
        icon: "warning",
      });
    } else {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((uid) => {
          firebase
            .firestore()
            .collection("users")
            .doc(uid.user.uid)
            .get()
            .then((doc) => {
              if (doc.data().job === "hall") {
                history.push("/newRequest");
              } else {
                history.push("/ordersReceived");
              }
            });
        })
        .catch(function (error) {
          if (authErrors[error.code]) {
            Swal.fire({
              text: authErrors[error.code],
              icon: "warning",
            });
          } else {
            Swal.fire({
              text: error,
              icon: "warning",
            });
          }
        });
    }
  };

  const signIn = (event) => {
    event.preventDefault();
    loginUser(email, password);
  };

  return (
    <>
    <div className="div">
      <figure>
        <Image src={logo} alt="logo" class="logo-login" />
      </figure>
      <div className="select-form">
        <form className="form-login">
          <Input
            type="email"
            data="email"
            id="email"
            className="input-login"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Digite seu email"
          />
          <div className='eyes-devil'>
          <Input
            type={showPassword  ? "text" : "password"}
            data="password"
            id="password"
            className="input-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Digite sua senha"
          />
          <i className="eye" onClick={() => setShowPassword(!showPassword)}>{eyes}</i>
          </div>
          <Button
            id="login"
            className="button-loggin"npm 
            name="Entrar"
            onClick={signIn}
          />
          <p onClick={() => setIsModalVisible(true)}>
            Ainda não tem cadastro? Registre-se AQUI!
          </p>
          </form>
          {isModalVisible ? (
            <Modal onClose={() => setIsModalVisible(false)}>
              <Register />
            </Modal>
          ) : null}
        
      </div>
    </div>
    <Footer />
    </>
  );
};

export default Login;
