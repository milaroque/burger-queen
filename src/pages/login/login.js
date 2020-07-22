import React, {useState} from 'react';
import Button from '../../components/button/Button'
import Input from '../../components/input/Input'
import Image from '../../components/image/image'
import logo from '../../assets/logo.png'
import Modal from '../../components/modal/modal';
import Register from '../register/register';
import './login.css'

const Login = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
return (
    <div class='div'>
        <figure>
        <Image src={logo} alt='logo' class='logo-login'/>
        </figure>
        <div class='select-form'>
            <form class= 'form-login'>
                <Input type="email" id="email" class='input-login' placeholder="Digite seu email" />
                <Input type="password" id="password" class='input-login' placeholder="Digite sua senha" />
                <Button id="login" class="button-loggin" name="Entrar" />
                <p onClick={ () => setIsModalVisible(true) }>Ainda não tem cadastro? Registre-se aqui!</p>
                {isModalVisible ? (
                <Modal onClose={ () => setIsModalVisible(false) }>
                    <Register />
                </Modal>
                ) : null}
            </form>
        </div>
    </div>
)
}

export default Login;