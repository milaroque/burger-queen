import React from 'react';
import Button from '../../components/button/Button'
import Input from '../../components/input/Input'
import Image from '../../components/image/image'
import chef from '../../assets/chef.png'
import hall from '../../assets/hall.png'
import './register.css'

const Register = () => {
return (
    <form class='form-register'>
        <Input type="name" id="name" class="input-text" placeholder="Nome e Sobrenome" />
        <Input type="email" id="email" class="input-text" placeholder="Digite seu email" />
        <Input type="password" id="password" class="input-text" placeholder="Digite sua senha" />
        <Button id="register" class="btn-register" name="Registrar" />
        <div class='select-type'>
          <Image src={chef} alt='img-chef' class='chef-kitchen'/>
          <label htmlFor='cozinha' class='label-kitchen'>COZINHA</label>
          <Input type='radio' class='btn-radio-kitchen' name='option-kitchen' id='kitchen' />
          </div>
          <div class='select-type-two'>
            <Image src={hall} alt='img-hall' class='img-hall'/>
            <label htmlFor='salao' class='label-hall'>SALÃO</label>
            <Input type='radio' class='btn-radio-hall' name='option-hall' id='hall' />
          </div>
    </form>

)
}

export default Register;