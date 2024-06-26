import React, { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { createBrowserRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Layout from '../components/layout/Layout/Layout.jsx';
import Protected from './Protected.jsx';
import ErrorPage from '../components/pages/ErrorPage/ErrorPage.jsx';
import BuyerPrivateRoute from '../components/PublicPrivateRoutes/BuyerPrivateRoutes/BuyerPrivateRoutes.jsx';
import AdminPrivateRoute from '../components/PublicPrivateRoutes/AdminPrivateRoutes/AdminPrivateRoute.jsx';
import SellerPrivateRoute from '../components/PublicPrivateRoutes/SellerPrivateRoutes/SellerPrivateRoutes.jsx';
import SearchedBooks from '../components/pages/Books/SearchedBooks.jsx';
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
  const role = useSelector((state) => state.role);
  return createBrowserRouter([
    {

      element: <Layout />,
      children: [
        {
          path: '/',
          element: <Home />
        },
        {
          path: '/login',
          element: <Login />
        },
        {
          path: '/SignUp',
          element: <SignUp />
        },
        {
          path: '/seller/login',
          element: <SellerLogin />
        },
        {
          path: '/AdminLogin',
          element: <AdminLogin />
        },
        {

          element: <BuyerPrivateRoute isAuth={role.user !== null ? true : false} />,
          children: [
            {
              path: '/account',
              element: <Account />,
            },
            {
              path: '/edit-account/:userId',
              element: <EditAccount />,
            },
            {
              path: '/favourites',
              element: <Favourites />,
            },
            {
              path: '/cart',
              element: <Cart />,
            },
            {
              path: '/manage-orders',
              element: <Orders />,
            },
            {
              path: '/books',
              element: <Books />,
            },
            {
              path: '/books/recentlyLaunched',
              element: <NationalPoetryMonth />,
            },
            {
              path: '/books/nationalPoetryMonth',
              element: <RecentlyLaunched />,
            },
            {
              path: '/books/booksThatMakeSmarter',
              element: <BooksThatMakeSmarter />,
            },
            {
              path: '/books/CarolShieldsPrize',
              element: <CarolShieldsPrize />,
            },
            {
              path: '/books/bestSellers-of-the-week',
              element: <BestSellerOfTheWeek />,
            },
            {
              path: '/books/:id',
              element: <BookDetailPage />,
            },
            {
              path: '/checkout',
              element: <CheckOutPage />,
            },
            {
              path: '/confirmedOrder/:id',
              element: <OrderConfirmationPage />,
            },
            {
              path: '/categories/popular-books',
              element: <BestSeller />,
            },
            {
              path: '/books/recentlyLaunched',
              element: <RecentlyLaunched />,
            },
            {
              path: '/lists/special-offers-on-TheStorySphere',
              element: <SpecialOffers />,
            },
            {
              path: '/collections/:categoryId/:subCategoryId/:subcategoryName',
              element: <Collections />,
            },
            {
              path: '/buyer/leaveAReview/:bookId',
              element: <ReviewPage />,
            },
            {
              path: '/search',
              element: <SearchedBooks />,
            }
          ],
        },
        {
          element: <AdminPrivateRoute isAuth={role.admin !== null ? true : false} />,
          children: [
            {
              path: '/admin/home',
              element: <AdminHome />,
            },
            {
              path: '/admin/manage-category',
              element: <ManageCategory />,
            },
            {
              path: '/admin/manage-sub-category',
              element: <ManageSubCategory />,
            },
            {
              path: '/admin/manage-books',
              element: <ManageBooks />,
            },
            {
              path: '/admin/manage-orders',
              element: <ManageOrders />,
            },
            {
              path: '/admin/updateOrders/:orderId',
              element: <UpdateOrder />,
            },
            {
              path: '/admin/manage-sellers',
              element: <ManageSellers />,
            },
            {
              path: '/admin/updateSeller/:sellerId',
              element: <UpdateSeller />,
            },
            {
              path: '/admin/register-newSeller',
              element: <RegisterSeller />,
            },
            {
              path: '/admin/register-newBook',
              element: <RegisterBook />,
            },
            {
              path: '/admin/updateBook/:bookId',
              element: <UpdateBookByAdmin />,
            },
            {
              path: '/admin/register-newSubCategory',
              element: <RegisterSubCategory />,
            },
            {
              path: '/admin/manage-sub-category/:subCategoryId',
              element: <UpdateSubCategory />,
            },
            {
              path: '/admin/register-newCategory',
              element: <RegisterCategory />,
            },
            {
              path: '/admin/update-Category/:id',
              element: <UpdateCateogry />,
            },
            {
              path: '/admin/register-newUser',
              element: <RegisterUser />,
            },
            {
              path: '/admin/update-user/:userId',
              element: <UpdateUser />,
            },
            {
              path: '/admin/sellerPermission',
              element: <SellerPermission />,
            },
            {
              path: '/admin/updateSellerPermission/:sellerId',
              element: <UpdateSellerPermissions />,
            }
          ]
        },
        {
          element: <SellerPrivateRoute isAuth={role.seller !== null ? true : false} />,
          children: [
            {
              path: "/seller",
              element: <SellerHome />,
            },
            {
              path: "/seller/registerNewBook/:sellerId",
              element: <RegisterNewBook />,
            },
            {
              path: "/seller/updateBook/:sellerId/:bookId",
              element: <UpdateBook />,
            }
          ],
        },
        {
          path: '*',
          element: <ErrorPage />,
        },
      ]
    }
  ]);
};

export default RouteFile;

