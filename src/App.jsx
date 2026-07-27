import React, { lazy } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Component/Layout/Layout'
import AuthContextProvider from './Context/AuthContextProvider'
import ProtectedRouting from './Component/ProtectedRouting/ProtectedRouting'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import CartContextProvider from './Context/CartContextProvider'
import WishlistContextProvider from './Context/WishlistContextProvider'
import { Toaster } from 'react-hot-toast'

const Home = lazy(() => import('./Component/Home/Home'))
const Cart = lazy(() => import('./Component/Cart/Cart'))
const Product = lazy(() => import('./Component/Product/Product'))
const Login = lazy(() => import('./Component/Login/Login'))
const Signup = lazy(() => import('./Component/Signup/Signup'))
const ForgotPassword = lazy(() => import('./Component/ForgotPassword/ForgotPassword'))
const NotFound = lazy(() => import('./Component/NotFound/NotFound'))
const UpdatePassword = lazy(() => import('./Component/UpdatePassword/UpdatePassword'))
const Brands = lazy(() => import('./Component/Brands/Brands'))
const Categories = lazy(() => import('./Component/Cstegories/Categories'))
const ProductDetails = lazy(() => import('./Component/ProductDetails/ProductDetails'))
const Wishlist = lazy(() => import('./Component/Wishlist/Wishlist'))
const Checkout = lazy(() => import('./Component/Checkout/Checkout'))

export default function App() {
  let router = createBrowserRouter([
    {
      path: "", element: <Layout />, children: [
        { index: true, element: <Home /> },
        { path: "product", element: <Product /> },
        { path: "brands", element: <Brands /> },
        { path: "categories", element: <Categories /> },
        { path: "productDetails/:id", element: <ProductDetails /> },
        { path: "cart", element: <ProtectedRouting> <Cart /></ProtectedRouting> },
        { path: "wishlist", element: <ProtectedRouting> <Wishlist /></ProtectedRouting> },
        { path: "checkout", element: <ProtectedRouting> <Checkout /></ProtectedRouting> },
        { path: "login", element: <Login /> },
        { path: "signup", element: <Signup /> },
        { path: "forgotPassword", element: <ForgotPassword /> },
        { path: "updatePassword", element: <UpdatePassword /> },
        { path: "*", element: <NotFound /> },
      ]
    }
  ])
  let client = new QueryClient()
  return (
    <div>
      <QueryClientProvider client={client}>
        <AuthContextProvider>
          <CartContextProvider>
            <WishlistContextProvider>
              <RouterProvider router={router}></RouterProvider>
              <Toaster position="top-right" reverseOrder={false} />
            </WishlistContextProvider>
          </CartContextProvider>
        </AuthContextProvider>
      </QueryClientProvider>
    </div>
  )
}
