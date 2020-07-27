import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import Button from '../../components/button/Button'
import Input from '../../components/input/Input'
import Image from '../../components/image/image'
import chef from '../../assets/chef.png'
import hall from '../../assets/hall.png'
import firebase from '../../config/firebase.js'
import "firebase/firebase-auth";
import "firebase/firebase-firestore";
import './register.css'
import authErrors from '../../config/errorsfirebase';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [job, setJob] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const history = useHistory();
  const eye = <FontAwesomeIcon icon={faEye} />;
  const [passwordShownn, setPasswordShownn] = useState(false);
  
  const togglePasswordVisiblityy = () => {
  setPasswordShownn(passwordShownn ? false : true);
};
  
const registerLogin = () => {
  if (!name || !email || !job || !password) {
    Swal.fire({
      text: 'Preencha os campos em branco',
      icon: 'warning',
    });
  }else if (password !== passwordConfirm) {
    Swal.fire({
      text: 'Senhas não conferem',
      icon: 'warning',
    });
  }else {
    firebase.auth()
    .createUserWithEmailAndPassword(email, password)
    .then(() => {
      if (job === 'hall') {
        history.push('/newRequest');
      } else {
        history.push('/ordersReceived');
      }
    })
    .then(() => {
      const uid = firebase.auth().currentUser.uid;
      firebase.firestore().collection('users')
        .doc(uid)
        .set({
          name,
          job,
          uid: firebase.auth().currentUser.uid,
          email
        })
        .then(
          firebase.auth().currentUser.updateProfile({
            displayName: name,
          })
        );
    })
    .catch((error) => {
      if (authErrors[error.code]) {
        Swal.fire({
          text: authErrors[error.code],
          icon: "warning",
        });
      }else {
        Swal.fire({
          text: error,
          icon: "warning",
        });
    }
  }

  const createUser = (event) => {
    event.preventDefault();
    registerLogin(email, password)
  }

  return (
    <div className='form-register'>
        <Input type="name" id="name" class="input-text" value={name} onChange={e => setName(e.target.value)} placeholder="Nome e Sobrenome" />
        <Input type="email" id="email" class="input-text" value={email} onChange={e => setEmail(e.target.value)} placeholder="Digite seu email" />
        <Input type={passwordShownn ? "text" : "password"} id="password" class="input-text" value={password} onChange={e => setPassword(e.target.value)} placeholder="Digite sua senha" />
        <span className="eye1 eyes" onClick={togglePasswordVisiblityy}>{eye}</span>
        <Input type={passwordShownn ? "text" : "password"} id="passwordConfirm" class="input-text" value={passwordConfirm} onChange={e => setPasswordConfirm(e.target.value)} placeholder="Confirme a sua senha" />
        <span className="eye2 eyes" onClick={togglePasswordVisiblityy}>{eye}</span>
        <div className='select-type'>
          <Image src={chef} alt='img-chef' class='chef-kitchen'/>
          <label htmlFor='cozinha' className='label-kitchen'>COZINHA</label>
          <Input type='radio' class='btn-radio-kitchen' name='job' value='kitchen' onChange={e => setJob(e.target.value)} id='kitchen' />
          </div>
          <div className='select-type-two'>
            <Image src={hall} alt='img-hall' class='img-hall'/>
            <label htmlFor='salao' className='label-hall'>SALÃO</label>
            <Input type='radio' class='btn-radio-hall' name='job' value='hall' onChange={e => setJob(e.target.value)} id='hall' />
          </div>
  <Button id="register" class="btn-register" type='submit' onClick={createUser} name="Registrar" />
    </div>

  )

}

export default Register
