import React, { useContext } from 'react'
import logoImg from '../../assets/images/logo.png'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../Context/AuthContextProvider'
import { CartContext } from '../../Context/CartContextProvider'
import { WishlistContext } from '../../Context/WishlistContextProvider'

export default function Navbar() {
  let { token, setToken } = useContext(AuthContext)
  let { numOfCartItems } = useContext(CartContext)
  let { wishlistCount } = useContext(WishlistContext)
  let navg = useNavigate()

  function logout() {
    setToken(null)
    localStorage.removeItem("token")
    navg("/login")
  }
  return (
    <>
      <nav className='shadow-xl py-2 fixed w-full top-0 left-0 z-50 bg-white'>
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between md:justify-center mx-auto p-4">
          <div className="logo ">
            <Link to="" className="flex space-x-3 items-center rtl:space-x-reverse">
              <img src={logoImg} className="h-8" alt="Fresh Cart Logo" />
              <span className="self-center text-3xl font-semibold whitespace-nowrap">Fresh Cart</span>
            </Link>
          </div>
          <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden focus:outline-none focus:ring-2 focus:ring-gray-200" aria-controls="navbar-default" aria-expanded="false">
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>
          <div className="hidden w-10/12  md:flex md:justify-between" id="navbar-default">
            {token ?
              <ul className="font-medium flex flex-col items-center p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white">
                <li className='flex items-center'>
                  <NavLink to="" className={(x) => x.isActive ? "block py-2 text-active px-3 md:p-0 ms-4" : "block py-2 px-3 md:p-0 ms-4"} aria-current="page">Home</NavLink>
                </li>
                <li className='flex items-center'>
                  <NavLink to="/product" className={(x) => x.isActive ? "block py-2 text-active px-3 md:p-0" : "block py-2 px-3 md:p-0"} >Products</NavLink>
                </li>
                <li className='flex items-center'>
                  <NavLink to="/categories" className={(x) => x.isActive ? "block py-2 text-active px-3 md:p-0" : "block py-2 px-3 md:p-0"} >Categories</NavLink>
                </li>
                <li className='flex items-center'>
                  <NavLink to="/brands" className={(x) => x.isActive ? "block py-2 text-active px-3 md:p-0" : "block py-2 px-3 md:p-0"} >Brands</NavLink>
                </li>
                <li className='flex items-center'>
                  <NavLink to="/wishlist" className={(x) => x.isActive ? "block py-2 text-active px-3 md:p-0" : "block py-2 px-3 md:p-0"} >
                    Wishlist
                    {wishlistCount > 0 ? (
                      <span className="ms-1.5 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full inline-flex items-center justify-center">
                        {wishlistCount}
                      </span>
                    ) : null}
                  </NavLink>
                </li>
                <li className='flex items-center'>
                  <NavLink to="/cart" className={(x) => x.isActive ? "block py-2 text-active px-3 md:p-0" : "block py-2 px-3 md:p-0"} >
                    Cart
                    {numOfCartItems > 0 ? (
                      <span className="ms-1.5 bg-active text-white text-[10px] font-bold px-2 py-0.5 rounded-full inline-flex items-center justify-center">
                        {numOfCartItems}
                      </span>
                    ) : null}
                  </NavLink>
                </li>
              </ul> : ""}

            <ul className="font-medium flex flex-col items-center p-4 md:p-0 mt-4 border ms-auto border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-3.5 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white">
              <li className='flex items-center'>
                <a href='https://www.facebook.com/' className="block py-2 md:p-0 hover:text-active duration-500" target='_blank' rel='noreferrer'><i className='fa-brands fa-facebook'></i></a>
              </li>
              <li className='flex items-center'>
                <a href='https://www.instagram.com/' className="block py-2 md:p-0 hover:text-active duration-500 " target='_blank' rel='noreferrer'><i className='fa-brands fa-instagram'></i></a>
              </li>
              <li className='flex items-center'>
                <a href='https://www.linkedin.com/' className="block py-2 md:p-0 hover:text-active duration-500 " target='_blank' rel='noreferrer'><i className='fa-brands fa-linkedin'></i></a>
              </li>
              <li className='flex items-center'>
                <a href='https://www.x.com/' className="block py-2 md:p-0 hover:text-active duration-500 " target='_blank' rel='noreferrer'><i className='fa-brands fa-twitter'></i></a>
              </li>

              {token ? <li>
                <span onClick={logout} className="block py-2 px-3 md:p-0 cursor-pointer hover:text-active" >Logout</span>
              </li> : <>
                <li className='flex items-center'>
                  <NavLink to="/login" className={(x) => x.isActive ? "block py-2 text-active px-3 md:p-0" : "block py-2 px-3 md:p-0"} >Login</NavLink>
                </li>
                <li className='flex items-center'>
                  <NavLink to="/signup" className={(x) => x.isActive ? "block py-2 text-active px-3 md:p-0" : "block py-2 px-3 md:p-0"} >Signup</NavLink>
                </li>
              </>}
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}
