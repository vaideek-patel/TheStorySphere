import React from 'react'
import { Routes, Route } from "react-router-dom"
import Home from '../components/pages/Home/Home'
import Login from "../components/pages/Login/Login"
import SignUp from "../components/pages/SignUp/SignUp"
import Favourites from "../components/pages/Favourites/Favourites"
import Cart from "../components/pages/Cart/Cart"
import Orders from '../components/pages/Orders/Orders'
import Books from '../components/pages/Books/Books'
import RecentlyLaunched from '../components/pages/Books/RecentlyLaunched'

const RouteFile = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signUp' element={<SignUp />} />
      <Route path='/favourites' element={<Favourites />} />
      <Route path='/cart' element={<Cart />} />
      <Route path='/orders' element={<Orders />} />
      <Route path='/books' element={<Books />} />
      <Route path='/books/recentlyLaunched' element={<RecentlyLaunched />} />
    </Routes>
  )
}

export default RouteFile
