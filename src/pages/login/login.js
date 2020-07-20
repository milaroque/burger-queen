import React, {useState} from 'react';
import Button from '../../components/button/Button'
import Input from '../../components/input/Input'
import Image from '../../components/image/image'
import logo from '../../assets/logo.png'
import Modal from '../../components/modal/modal';
import Register from '../register/register';

const Login = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
return (
    <div>
        <Image src={logo} alt='logo' class='logo-login'/>
        <form>
            <Input type="email" id="email" class="emaill" placeholder="Digite seu email" />
            <Input type="password" id="password" class="passwordd" placeholder="Digite sua senha" />
            <Button id="login" class="logind" name="Entrar" />
            <p onClick={ () => setIsModalVisible(true) }>Ainda não tem cadastro? Registre-se aqui!</p>
            {isModalVisible ? (
            <Modal onClose={ () => setIsModalVisible(false) }>
                <Register />
            </Modal>
            ) : null}
        </form>
    </div>
)
}

export default Login;