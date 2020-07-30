
import React, { useEffect, useState } from 'react'
import Menu from '../../components/menu/menu';
import getMenu from '../../functions/firebaseRead'
import Nav from "../../components/nav/Nav";
import Modal from '../../components/modal/modal';
import Button from '../../components/button/Button';
import Order from '../../components/order/order';

const NewRequest = () => {
const [breakfast, setBreakfast] = useState([])
const [hamburger, setHamburger] = useState([])
const [sideDishes, setSideDishes] = useState([])
const [drinks, setDrinks] = useState([])
const [add, setAdd] = useState([])
const [order, setOrder] = useState([])
const [isModalVisible, setIsModalVisible] = useState(false);

useEffect(() => {
    getMenu().then(([breakfast, hamburger, sideDishes, drinks, add]) => {

      setBreakfast(breakfast)
      setHamburger(hamburger)
      setSideDishes(sideDishes)
      setDrinks(drinks)
      setAdd(add)
    })

  }, []) //eslint-disable-line

  const saveOrder = (newItem) => {
    setOrder([...order, newItem])
  }

  const addItem = (event) => {
    const price = event.target.value;
    const item = event.target.name;
    saveOrder({
      item,
      quantity: 1,
      price
    })
  }
  

      return (
    <main>
        <div link='/newRequest'>
       <Nav>
         
       </Nav>
      </div>
    <section>
      <div>MENU</div>
      <div>Café da Manhã</div> {
                (
                  breakfast.map(item => (
                    <Menu name={`${item.item} `}
                    price={`R$${item.price}`}
                    value={item.id}
                    key={item.id}
                    src={item.icon}
                    className='image'
                    onClick={(e) => addItem(e)}
                  />
                  ))
                ) 
            } </section>
            <section>
      <div>Hamburgers</div> 
      <div onClick={() => setIsModalVisible(true)}>
      {
                (
                  hamburger.map(item => (
                    <Menu name={`${item.item} `}
                    price={`R$${item.price}`}
                    value={item.id}
                    key={item.id}
                    src={item.icon}
                  />
                  ))
                ) 
            } 
            </div>
            </section>
            {isModalVisible ? (
            <Modal onClose={() => setIsModalVisible(false)}>
              <section>
      <div>OPÇÕES</div>
      <div>
      <Button name='Bovino'/>
      <Button name='Frango'/>
      <Button name='Vegetariano'/>
      </div>
      {add.map((item) => (
        <Menu
          name={`${item.item} `}
          price={`R$${item.price}`}
          value={item.id}
          key={item.id}
          src={item.icon}
          className="image"
        />
      ))}{" "}
    </section>
            </Modal>
          ) : null}
            <section>
      <div>Acompanhamentos</div> {
                (
                  sideDishes.map(item => (
                    <Menu name={`${item.item} `}
                    price={`R$${item.price}`}
                    value={item.id}
                    key={item.id}
                    src={item.icon}
                    onClick={(e) => addItem(e)}
                  />
                  ))
                ) 
            } </section>
            <section>
      <div>Bebidas</div> {
                (
                  drinks.map(item => (
                    <Menu name={`${item.item} `}
                    price={`R$${item.price}`}
                    value={item.id}
                    key={item.id}
                    src={item.icon}
                    onClick={(e) => addItem(e)}
                  />
                  ))
                ) 
            } </section>
             <section>
       {
                (
                  order.map(item => (
                    <Order 
                    order={order}
                    item={`${item.item} `}
                    price={`R$${item.price}`}
                    quantity={item.quantity}
                    key={item.id}
                  />
                  ))
                ) 
            } </section>
            
      </main>
  
    ) 

}

export default NewRequest