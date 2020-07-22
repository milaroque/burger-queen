import React,  {useState} from 'react';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import Button from '../../components/button/Button'
import Input from '../../components/input/Input'
import Image from '../../components/image/image'
import Chef from '../../assets/chef.png'
import Hall from '../../assets/hall.png'
import './register.css'

const Register = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [job, setJob] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const history = useHistory();
  
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
      if (error.code === 'auth/invalid-email') {
        Swal.fire({
          text: 'Email inválido',
          icon: 'warning',
        });
      } else if (error.code === 'auth/weak-password') {
        Swal.fire({
          text: 'Senha deve conter no mínino 6 caracteres',
          icon: 'warning',
        });
      } else if (error.code === 'auth/email-already-in-use') {
        Swal.fire({
          text: 'Usuário já cadastrado',
          icon: 'warning',
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
    <form class='form-register'>
        <Input type="name" id="name" class="input-text" placeholder="Nome e Sobrenome" />
        <Input type="email" id="email" class="input-text" placeholder="Digite seu email" />
        <Input type="password" id="password" class="input-text" placeholder="Digite sua senha" />
        <Button id="register" class="btn-register" name="Registrar" />
        <div class='select-type'>
          <Image src={Chef} alt='img-chef' class='chef-kitchen'/>
          <label htmlFor='cozinha' class='label-kitchen'>COZINHA</label>
          <Input type='radio' class='btn-radio-kitchen' name='option-kitchen' id='kitchen' />
          </div>
          <div class='select-type-two'>
            <Image src={Hall} alt='img-hall' class='img-hall'/>
            <label htmlFor='salao' class='label-hall'>SALÃO</label>
            <Input type='radio' class='btn-radio-hall' name='option-hall' id='hall' />
          </div>
    </form>

)

}

export default Register