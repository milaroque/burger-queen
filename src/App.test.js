import React from 'react';
import { render, waitForElement, fireEvent } from '@testing-library/react';
import { BrowserRouter, Route } from "react-router-dom";
import Login from './pages/login/login'

describe('Tests for Input component', () => {
  it('Verify input event onChange for email', async () => {
    const {getByTestId} = render(<BrowserRouter><Route exact path="/" component={Login} /> </BrowserRouter>)
    const email = await waitForElement(
      () => getByTestId('email')
    )
    fireEvent.change(
      email,
      {target: {value: 'email'}}
    )
    expect(email.value).toEqual('email')
  })
  it('Verify input event onChange for password', async () => {
    const {getByTestId} = render(<BrowserRouter><Route exact path="/" component={Login} /> </BrowserRouter>)
    const password = await waitForElement(
      () => getByTestId('password')
    )
    fireEvent.change(
      password,
      {target: {value: 'password'}}
    )
    expect(password.value).toEqual('password')
})
it("Verify if there is one button inside Login", () => {
 const { container } = render(<BrowserRouter><Route exact path="/" component={Login} /> </BrowserRouter>)
  const number = container.getElementsByTagName("button").length;
  expect(number).toBe(1);
})
it('Verify button event onClick', async () => {
  const {getByTestId} = render(<BrowserRouter><Route exact path="/" component={Login} /> </BrowserRouter>)
  const btnNode = await waitForElement(
    () => getByTestId('form-btn')
  )
  fireEvent.click(btnNode)
})

})