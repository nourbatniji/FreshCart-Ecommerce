import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Component/Layout/Layout'
import Home from './Component/Home/Home'
import Cart from './Component/Cart/Cart'
import Product from './Component/Product/Product'
import Login from './Component/Login/Login'
import Signup from './Component/Signup/Signup'
import ForgotPassword from './Component/ForgotPassword/ForgotPassword'
import NotFound from './Component/NotFound/NotFound'
import UpdatePassword from './Component/UpdatePassword/UpdatePassword'
import AuthContextProvider from './Context/AuthContextProvider'
import ProtectedRouting from './Component/ProtectedRouting/ProtectedRouting'
import Brands from './Component/Brands/Brands'
import Categories from './Component/Cstegories/Categories'
import ProductDetails from './Component/ProductDetails/ProductDetails'
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'
import CartContextProvider from './Context/CartContextProvider'

export default function App() {
  let router = createBrowserRouter([
    {
      path: "", element: <Layout />, children: [
        { index: true, element: <ProtectedRouting> <Home /></ProtectedRouting> },
        { path: "cart", element: <ProtectedRouting> <Cart /></ProtectedRouting> },
        { path: "product", element: <ProtectedRouting> <Product /></ProtectedRouting> },
        { path: "brands", element: <ProtectedRouting> <Brands /></ProtectedRouting> },
        { path: "categories", element: <ProtectedRouting> <Categories /></ProtectedRouting> },
        { path: "productDetails/:id", element: <ProtectedRouting> <ProductDetails /></ProtectedRouting> },
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
          <RouterProvider router={router}></RouterProvider>
          </CartContextProvider>
        </AuthContextProvider>
      </QueryClientProvider>
    </div>
  )
}
