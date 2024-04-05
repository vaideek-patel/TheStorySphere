import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Protected from './Protected.jsx';

const Home = lazy(() => import('../components/pages/Home/Home'));
const Login = lazy(() => import('../components/pages/Login/Login'));
const SignUp = lazy(() => import('../components/pages/SignUp/SignUp'));
const Favourites = lazy(() => import('../components/pages/Favourites/Favourites'));
const Cart = lazy(() => import('../components/pages/Cart/Cart'));
const Orders = lazy(() => import('../components/pages/Orders/Orders'));
const Books = lazy(() => import('../components/pages/Books/Books'));
const RecentlyLaunched = lazy(() => import('../components/pages/Books/RecentlyLaunched'));
const WishListRegistryInfo = lazy(() => import('../components/pages/Wishlist&Registry/WishList&RegistryInfo'));
const RegisterWishlist = lazy(() => import('../components/pages/Wishlist&Registry/WishList/RegisterWishlist'));
const RegisterNewRegistry = lazy(() => import('../components/pages/Wishlist&Registry/Registry/RegisterNewRegistry'));
const ManageWishListRegistry = lazy(() => import('../components/pages/Wishlist&Registry/ManageWishList&Registry'));
const BookDetailPage = lazy(() => import('../components/pages/Books/BookDetailPage'));
const ViewWishListRegistry = lazy(() => import('../components/pages/Wishlist&Registry/ViewWishList&Registry'));
const CheckOutPage = lazy(() => import('../components/pages/CheckOutPage/CheckOutPage'));
const OrderConfirmationPage = lazy(() => import('../components/pages/OrderConfirmation/OrderConfirmationPage'));
const Account = lazy(() => import('../components/pages/Account/Account'));
const BestSeller = lazy(() => import('../components/pages/Books/BestSeller'));
const SpecialOffers = lazy(() => import('../components/pages/Books/SpecialOffers'));
const Collections = lazy(() => import('../components/pages/Books/Collections.jsx'));

const RouteFile = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Protected Component={Login} />} />
        <Route path="/signUp" element={<Protected Component={SignUp} />} />
        <Route path="/account" element={<Account />} />
        <Route path="/favourites" element={<Favourites />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/manage-orders" element={<Orders />} />
        <Route path="/books" element={<Books />} />
        <Route path="/books/recentlyLaunched" element={<RecentlyLaunched />} />
        <Route path="/info/wishlist-and-registry" element={<WishListRegistryInfo />} />
        <Route path="/wishlists/new" element={<RegisterWishlist />} />
        <Route path="/create_registry" element={<RegisterNewRegistry />} />
        <Route path="/wishlists" element={<ManageWishListRegistry />} />
        <Route path="/books/:id" element={<BookDetailPage />} />
        <Route path="/wishlist/:id" element={<ViewWishListRegistry />} />
        <Route path="/checkout" element={<CheckOutPage />} />
        <Route path="/confirmedOrder/:id" element={<OrderConfirmationPage />} />
        <Route path="/categories/popular-books" element={<BestSeller />} />
        <Route path="/lists/special-offers-on-TheStorySphere" element={<SpecialOffers />} />
        <Route path="/collections/:categoryId/:subCategoryId/:subcategoryName" element={<Collections />} />
      </Routes>
    </Suspense>
  );
};

export default RouteFile;
