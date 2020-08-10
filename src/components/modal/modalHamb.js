import React from 'react'
import Input from '../input/Input'
import Image from '../image/image';
import Egg from '../../assets/fried-egg.png';
import Cheese from '../../assets/cheese.png'
import Button from '../button/Button';
import './modalHamb.css'

const ModalBurger = (props) => {
  return (
    <section className='modalburger'>
      <div className='descriptionmodal'>Opções e Complementos</div>
      <div className='option'>
        <Input type='radio' name='options' value='bovino' className='bovino' onChange={props.onChange} /> Bovino
          <Input type='radio' name='options' value='frango' className='frango' onChange={props.onChange} /> Frango
          <Input type='radio' name='options' value='vegetariano' className='vegetariano' onChange={props.onChange} /> Vegetariano
        </div>
      <div className='extras'>
        <div className='option-two'>
          <Input type='checkbox' name='extraOvo' value='+ ovo' className='extra-ovo' onChange={props.handleAddExtra} />
          <Image src={Egg} class='egg' /> R$1,00
      </div>
        <div className='option-tree'>
          <Input type='checkbox' name='extraQueijo' value='+ queijo' className='extra-queijo' onChange={props.handleAddExtra} />
          <Image src={Cheese} class='cheese' /> R$1,00
      </div>
      </div>
      <Button name='Adicionar' className='add' disabled={props.disabled} onClick={props.addOrder} />
    </section>
  )
}

export default ModalBurger