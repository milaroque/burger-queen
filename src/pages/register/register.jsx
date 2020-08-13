import React,  {useState} from 'react';
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
  const history = useHistory();
  const [showPassword, setShowPassword] = useState(false)
  const eye = <FontAwesomeIcon icon={faEye} />;
  
  
const registerLogin = () => {
  if (!name || !email || !job || !password) {
    Swal.fire({
      text: 'Preencha os campos em branco',
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
  });
  }
}

const createUser = (event) => {
  event.preventDefault();
  registerLogin(email, password)
}

return (
    <form className='form-register'>
        <Input type="name" id="name" className="input-text" value={name} onChange={e => setName(e.target.value)} placeholder="Nome e Sobrenome" />
        <Input type="email" id="email" className="input-text" value={email} onChange={e => setEmail(e.target.value)} placeholder="Digite seu email" />
        <fieldset className='olho-maldito'>
        <Input type={showPassword ? "text" : "password"} id="password" className="input-text" value={password} onChange={e => setPassword(e.target.value)} placeholder="Digite sua senha" />
        <i className="eye1 eyes" onClick={() => setShowPassword(!showPassword)}>{eye}</i>
        </fieldset>
        <div className='select-type'>
          <Image src={chef} alt='img-chef' class='chef-kitchen'/>
          <label htmlFor='cozinha' className='label-kitchen'>COZINHA</label>
          <Input type='radio' className='btn-radio-kitchen' name='job' value='kitchen' onChange={e => setJob(e.target.value)} id='kitchen' />
          </div>
          <div className='select-type-two'>
            <Image src={hall} alt='img-hall' class='img-hall'/>
            <label htmlFor='salao' className='label-hall'>SALÃO</label>
            <Input type='radio' className='btn-radio-hall' name='job' value='hall' onChange={e => setJob(e.target.value)} id='hall' />
          </div>
          <Button id="register" className="btn-register" type='submit' onClick={createUser} name="Registrar" />
    </form>

)

}

export default Register
