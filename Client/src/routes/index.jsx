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
import WishListRegistryInfo from '../components/pages/Wishlist&Registry/WishList&RegistryInfo'
import RegisterWishlist from '../components/pages/Wishlist&Registry/WishList/RegisterWishlist'
import RegisterNewRegistry from '../components/pages/Wishlist&Registry/Registry/RegisterNewRegistry'
import ManageWishListRegistry from '../components/pages/Wishlist&Registry/ManageWishList&Registry'
import BookDetailPage from '../components/pages/Books/BookDetailPage'
import ViewWishListRegistry from '../components/pages/Wishlist&Registry/ViewWishList&Registry'
import CheckOutPage from '../components/pages/CheckOutPage/CheckOutPage'

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
      <Route path='/info/wishlist-and-registry' element={<WishListRegistryInfo />} />
      <Route path='/wishlists/new' element={<RegisterWishlist />} />
      <Route path='/create_registry' element={<RegisterNewRegistry />} />
      <Route path='/wishlists' element={<ManageWishListRegistry />} />
      <Route path="/books/:id" element={<BookDetailPage />} />
      <Route path="/wishlist/:id" element={<ViewWishListRegistry />} />
      <Route path="/checkout" element={<CheckOutPage />} />
    </Routes>
  )
}

export default RouteFile
