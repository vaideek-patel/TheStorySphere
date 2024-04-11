import React, { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Protected from './Protected.jsx';
const Home = lazy(() => import('../components/pages/Home/Home'));
const Login = lazy(() => import('../components/pages/Login/Login'));
const SellerLogin = lazy(() => import('../components/pages/Dashboard/SellerDashboard/Login/SellerLogin.jsx'));
const SellerHome = lazy(() => import('../components/pages/Dashboard/SellerDashboard/Home/Home.jsx'));
const SignUp = lazy(() => import('../components/pages/SignUp/SignUp'));
const Favourites = lazy(() => import('../components/pages/Favourites/Favourites'));
const Cart = lazy(() => import('../components/pages/Cart/Cart'));
const Orders = lazy(() => import('../components/pages/Orders/Orders'));
const Books = lazy(() => import('../components/pages/Books/Books'));
const RecentlyLaunched = lazy(() => import('../components/pages/Books/RecentlyLaunched'));
const NationalPoetryMonth = lazy(() => import('../components/pages/Books/NationalPoetryMonth.jsx'));
const BooksThatMakeSmarter = lazy(() => import('../components/pages/Books/BooksThatMakeSmarter.jsx'))
const CarolShieldsPrize = lazy(() => import('../components/pages/Books/CarolShieldsPrize.jsx'))





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
const BestSellerOfTheWeek = lazy(() => import('../components/pages/Books/BestSellerOfTheWeek.jsx'));
const SpecialOffers = lazy(() => import('../components/pages/Books/SpecialOffers'));
const Collections = lazy(() => import('../components/pages/Books/Collections.jsx'));
const EditAccount = lazy(() => import('../components/pages/Account/EditAccount.jsx'));
const ReviewPage = lazy(() => import('../components/pages/ReviewPage/ReviewPage.jsx'));

//Seller
const RegisterNewBook = lazy(() => import('../components/pages/Dashboard/SellerDashboard/RegisterBook/RegisterBook.jsx'));
const UpdateBook = lazy(() => import('../components/pages/Dashboard/SellerDashboard/RegisterBook/UpdateBook/UpdateBook.jsx'));

//Admin
const AdminLogin = lazy(() => import('../components/pages/Dashboard/AdminDashboard/Login/AdminLogin.jsx'));
const AdminHome = lazy(() => import('../components/pages/Dashboard/AdminDashboard/Home/AdminHome.jsx'));
const ManageCategory = lazy(() => import('../components/pages/Dashboard/AdminDashboard/Manage/ManageCategory/ManageCategory.jsx'))
const ManageSubCategory = lazy(() => import('../components/pages/Dashboard/AdminDashboard/Manage/ManageSubCategory/ManageSubCategory.jsx'))
const ManageBooks = lazy(() => import('../components/pages/Dashboard/AdminDashboard/Manage/ManageBooks/ManageBooks.jsx'))
const ManageOrders = lazy(() => import('../components/pages/Dashboard/AdminDashboard/Manage/ManageOrders/ManageOrders.jsx'))
const ManageSellers = lazy(() => import('../components/pages/Dashboard/AdminDashboard/Manage/ManageSellers/ManageSellers.jsx'))
const RegisterSeller = lazy(() => import('../components/pages/Dashboard/AdminDashboard/Register/RegisterSeller/RegisterSeller.jsx'))
const RegisterBook = lazy(() => import('../components/pages/Dashboard/AdminDashboard/Register/RegisterBook/RegisterBook.jsx'))
const RegisterSubCategory = lazy(() => import('../components/pages/Dashboard/AdminDashboard/Register/RegisterSubCategory/RegisterSubCategory.jsx'))
const RegisterCategory = lazy(() => import('../components/pages/Dashboard/AdminDashboard/Register/RegisterCategory/RegisterCategory.jsx'))
const UpdateCateogry = lazy(() => import('../components/pages/Dashboard/AdminDashboard/Update/UpdateCategory/UpdateCategory.jsx'))
const RegisterUser = lazy(() => import('../components/pages/Dashboard/AdminDashboard/Register/RegisterUser/RegisterUser.jsx'))
const UpdateUser = lazy(() => import('../components/pages/Dashboard/AdminDashboard/Update/UpdateUser/UpdateUser.jsx'))
const UpdateBookByAdmin = lazy(() => import('../components/pages/Dashboard/AdminDashboard/Update/UpdateBook/UpdateBook.jsx'))
const UpdateSeller = lazy(() => import('../components/pages/Dashboard/AdminDashboard/Update/UpdateSeller/UpdateSeller.jsx'))
const UpdateOrder = lazy(() => import('../components/pages/Dashboard/AdminDashboard/Update/UpdateOrder/UpdateOrder.jsx'))
const SellerPermission = lazy(() => import('../components/pages/Dashboard/AdminDashboard/Manage/SellerPermission/SellerPermission.jsx'))
const UpdateSellerPermissions = lazy(() => import('../components/pages/Dashboard/AdminDashboard/Update/UpdateSeller/UpdateSellerPermissions.jsx'))
const UpdateSubCategory = lazy(() => import('../components/pages/Dashboard/AdminDashboard/Update/UpdateSubCategory/UpdateSubCategory.jsx'))


const RouteFile = () => {

  return (
    <Routes>
      <Route path="/adminLogin" element={<AdminLogin />} />
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Protected Component={Login} />} />
      <Route path="/seller/login" element={<SellerLogin />} />
      <Route path="/seller" element={<SellerHome />} />
      <Route path="/signUp" element={<Protected Component={SignUp} />} />
      <Route path="/account" element={<Account />} />
      <Route path="/edit-account/:userId" element={<EditAccount />} />
      <Route path="/favourites" element={<Favourites />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/manage-orders" element={<Orders />} />
      <Route path="/books" element={<Books />} />
      <Route path="/books/recentlyLaunched" element={<RecentlyLaunched />} />
      <Route path="/books/nationalPoetryMonth" element={<NationalPoetryMonth />} />
      <Route path="/books/booksThatMakeSmarter" element={<BooksThatMakeSmarter />} />
      <Route path="/books/CarolShieldsPrize" element={<CarolShieldsPrize />} />
      <Route path="/books/bestSellers-of-the-week" element={<BestSellerOfTheWeek />} />
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
      <Route path="/seller/registerNewBook/:sellerId" element={<RegisterNewBook />} />
      <Route path="/seller/updateBook/:sellerId/:bookId" element={<UpdateBook />} />
      <Route path="/buyer/leaveAReview/:bookId" element={<ReviewPage />} />

      <Route path="/admin/home" element={<AdminHome />} />
      <Route path="/admin/manage-category" element={<ManageCategory />} />
      <Route path="/admin/manage-sub-category" element={<ManageSubCategory />} />
      <Route path="/admin/manage-books" element={<ManageBooks />} />
      <Route path="/admin/manage-orders" element={<ManageOrders />} />
      <Route path="/admin/updateOrders/:orderId" element={<UpdateOrder />} />
      <Route path="/admin/manage-sellers" element={<ManageSellers />} />
      <Route path="/admin/updateSeller/:sellerId" element={<UpdateSeller />} />
      <Route path="/admin/register-newSeller" element={<RegisterSeller />} />
      <Route path="/admin/register-newBook" element={<RegisterBook />} />
      <Route path="/admin/updateBook/:bookId" element={<UpdateBookByAdmin />} />
      <Route path="/admin/register-newSubCategory" element={<RegisterSubCategory />} />
      <Route path="/admin/manage-sub-category/:subCategoryId" element={<UpdateSubCategory />} />

      <Route path="/admin/register-newCategory" element={<RegisterCategory />} />
      <Route path="/admin/update-Category/:id" element={<UpdateCateogry />} />
      <Route path="/admin/register-newUser" element={<RegisterUser />} />
      <Route path="/admin/update-user/:userId" element={<UpdateUser />} />
      <Route path="/admin/sellerPermission" element={<SellerPermission />} />
      <Route path="/admin/updateSellerPermission/:sellerId" element={<UpdateSellerPermissions />} />
    </Routes>
  );
};

export default RouteFile;

