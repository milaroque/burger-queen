import React from 'react';
import Button from '../../components/button/Button'
import Input from '../../components/input/Input'

const Register = () => {
return (
    <form>
        <Input type="name" id="name" class="name" placeholder="Nome e Sobrenome" />
        <Input type="email" id="email" class="email" placeholder="Digite seu email" />
        <Input type="password" id="password" class="password" placeholder="Digite sua senha" />
        <Button id="register" class="register" name="Registrar" />
        <div className='select-role'>
          <label htmlFor='kitchen'>COZINHA</label>
          <Input type='radio' className='radio-button' name='option' id='kitchen' />
          <label htmlFor='hall'>SALÃO</label>
          <Input type='radio' className='radio-button' name='option' id='hall' />
        </div>
    </form>

)
}

export default Register;