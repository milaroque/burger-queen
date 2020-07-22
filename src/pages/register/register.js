import React,  {useState} from 'react';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import Button from '../../components/button/Button'
import Input from '../../components/input/Input'
import firebase from '../../config/firebase.js'

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
    <div>
        <Input type="name" id="name" class="name" value={name} onChange={e => setName(e.target.value)} placeholder="Nome e Sobrenome" />
        <Input type="email" id="email" class="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Digite seu email" />
        <Input type="password" id="password" class="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Digite sua senha" />
        <Input type="password" id="passwordConfirm" class="password" value={passwordConfirm} onChange={e => setPasswordConfirm(e.target.value)} placeholder="Confirme sua senha" />
        <Button id="register" type='submit' onClick={createUser} class="register" name="Registrar" />
        <div className=''>
          <label htmlFor='cozinha'>COZINHA</label>
          <Input type='radio' className='' name='job' value='kitchen' onChange={e => setJob(e.target.value)} id='kitchen' />
          <label htmlFor='salao'>SALÃO</label>
          <Input type='radio' className='' name='job' value='hall' onChange={e => setJob(e.target.value)} id='salao' />
        </div>
    </div>
)

}

export default Register