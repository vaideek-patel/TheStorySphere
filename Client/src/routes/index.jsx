import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from '../components/pages/Home/Home'
import Login from "../components/pages/Login/Login"
import SignUp from "../components/pages/SignUp/SignUp"
import Favourites from "../components/pages/Favourites/Favourites"
import Cart from "../components/pages/Cart/Cart"
import Orders from '../components/pages/Orders/Orders'

const RouteFile = () => {
  return (
    // <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signUp' element={<SignUp />} />
        <Route path='/favourites' element={<Favourites />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/orders' element={<Orders />} />
      </Routes>
    // </BrowserRouter>
  )
}

export default RouteFile
