
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
    <header className="hall">
      <Nav link='/newRequest'>

      </Nav>
      <header className="header-hall"> Novo Pedido </header>
      <main className="menu">
        <section className="breakfast-menu">
          <div className="breakfast"> Café da Manhã </div> {
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
        <section className="burges-menu">
          <div className="burgers">Hamburgers</div> {
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
        <section className="menu-sidedishes">
          <div className="sidedishes">Acompanhamentos</div> {
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
        <section className="menu-drinks">
          <div className="drinks">Bebidas</div> {
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
    </header>

  )

}

export default NewRequest