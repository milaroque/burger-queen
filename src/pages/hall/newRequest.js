
import React, { useEffect, useState } from 'react'
import Menu from '../../components/menu/menu';
import getMenu from '../../functions/firebaseRead'
import Nav from "../../components/nav/Nav";
import "./newRequest.css"
const NewRequest = () => {
  const [breakfast, setBreakfast] = useState([])
  const [hamburger, setHamburger] = useState([])
  const [sideDishes, setSideDishes] = useState([])
  const [drinks, setDrinks] = useState([])


  useEffect(() => {
    getMenu().then(([breakfast, hamburger, sideDishes, drinks]) => {

      setBreakfast(breakfast)
      setHamburger(hamburger)
      setSideDishes(sideDishes)
      setDrinks(drinks)
    })

  }, []) //eslint-disable-line

  return (
    <main>
      <div link='/newRequest'>
        <Nav>

        </Nav>
      </div>
      <section className="menu">
        <div className="header-hall">Novo Pedido</div>
        <div className="header-hall">Café da Manhã</div> {
          (
            breakfast.map(item => (
              <Menu name={`${item.item} `}
                price={`R$${item.price}`}
                value={item.id}
                key={item.id}
                src={item.icon}
                className='image'
              />
            ))
          )
        } </section>
      <section>
        <div>Hamburgers</div> {
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
        } </section>
      <section>
        <div>Acompanhamentos</div> {
          (
            sideDishes.map(item => (
              <Menu name={`${item.item} `}
                price={`R$${item.price}`}
                value={item.id}
                key={item.id}
                src={item.icon}
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
              />
            ))
          )
        } </section>

    </main>

  )

}

export default NewRequest