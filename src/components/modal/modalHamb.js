import React from 'react'
import Input from '../input/Input'
import Image from '../image/image';
import Egg from '../../assets/fried-egg.png';
import Cheese from '../../assets/cheese.png'
import Button from '../button/Button';
import './modalHamb.css'

const ModalBurger = (props) => {
    return (
        <section>
        <div>OPÇÕES</div>
        <div>
          <Input type='radio' name='options' value='bovino' onChange={props.onChange} /> Bovino 
          <Input type='radio' name='options' value='frango' onChange={props.onChange} /> Frango 
          <Input type='radio' name='options' value='vegetariano' onChange={props.onChange} /> Vegetariano 
        </div>
        <div>
        <Input type='checkbox' name='extraOvo' value='+ ovo' onChange={props.handleAddExtra} />
          <Image src={Egg} class='egg' /> R$1,00
          </div>
          <div>
          <Input type='checkbox' name='extraQueijo' value='+ queijo' onChange={props.handleAddExtra} />
          <Image src={Cheese} class='cheese' /> R$1,00
        </div>
        <Button name='Adicionar' disabled={props.disabled} onClick={props.addOrder}/>
      </section>
    )
}

export default ModalBurger