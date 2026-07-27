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

  const getLinkClass = ({ isActive }) =>
    `font-semibold transition-all duration-200 cursor-pointer ${
      isActive ? 'text-active' : 'text-gray-600 hover:text-active'
    }`

  return (
    <nav className="shadow-sm backdrop-blur-md bg-white/80 py-4 fixed w-full top-0 left-0 z-50 border-b border-slate-100 transition duration-300">
      <div className="max-w-7xl flex items-center justify-between mx-auto px-4 md:px-8">
        
        {/* Brand Logo */}
        <div className="flex items-center gap-10">
          <Link to="" className="flex space-x-2.5 items-center">
            <img src={logoImg} className="h-9" alt="Fresh Cart Logo" />
            <span className="self-center text-2xl font-black tracking-tight text-gray-900">
              Fresh<span className="text-active">Cart</span>
            </span>
          </Link>

          {/* Center Navigation Links (Visible when logged in) */}
          {token && (
            <ul className="hidden md:flex items-center gap-6 text-sm">
              <li>
                <NavLink to="" end className={getLinkClass}>Home</NavLink>
              </li>
              <li>
                <NavLink to="/product" className={getLinkClass}>Products</NavLink>
              </li>
              <li>
                <NavLink to="/categories" className={getLinkClass}>Categories</NavLink>
              </li>
              <li>
                <NavLink to="/brands" className={getLinkClass}>Brands</NavLink>
              </li>
            </ul>
          )}
        </div>

        {/* Right Section Actions */}
        <div className="flex items-center gap-6">
          
          {/* Social Links (Hidden on small screens) */}
          <div className="hidden lg:flex items-center gap-3 text-gray-400">
            <a href="https://www.facebook.com/" target="_blank" rel="noreferrer" className="hover:text-active transition duration-200">
              <i className="fa-brands fa-facebook text-base"></i>
            </a>
            <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" className="hover:text-active transition duration-200">
              <i className="fa-brands fa-instagram text-base"></i>
            </a>
            <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" className="hover:text-active transition duration-200">
              <i className="fa-brands fa-linkedin text-base"></i>
            </a>
            <a href="https://www.x.com/" target="_blank" rel="noreferrer" className="hover:text-active transition duration-200">
              <i className="fa-brands fa-twitter text-base"></i>
            </a>
          </div>

          {/* User Auth controls / Wishlist / Cart Icons */}
          <div className="flex items-center gap-5">
            {token ? (
              <>
                {/* Wishlist Link Icon with Badge */}
                <NavLink to="/wishlist" className={({ isActive }) => `relative flex items-center p-1.5 rounded-full transition ${isActive ? 'text-active bg-emerald-50' : 'text-gray-600 hover:text-active hover:bg-slate-50'}`}>
                  <i className="fa-regular fa-heart text-xl"></i>
                  {wishlistCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center border border-white">
                      {wishlistCount}
                    </span>
                  )}
                </NavLink>

                {/* Cart Link Icon with Badge */}
                <NavLink to="/cart" className={({ isActive }) => `relative flex items-center p-1.5 rounded-full transition ${isActive ? 'text-active bg-emerald-50' : 'text-gray-600 hover:text-active hover:bg-slate-50'}`}>
                  <i className="fa-solid fa-cart-shopping text-xl"></i>
                  {numOfCartItems > 0 && (
                    <span className="absolute -top-1 -right-1 bg-active text-white text-[10px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center border border-white animate-pulse">
                      {numOfCartItems}
                    </span>
                  )}
                </NavLink>

                {/* Logout Action */}
                <button 
                  onClick={logout} 
                  className="hidden sm:inline-block text-sm font-semibold text-gray-600 hover:text-red-500 transition cursor-pointer"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="flex items-center gap-4 text-sm">
                <NavLink to="/login" className={getLinkClass}>Login</NavLink>
                <NavLink to="/signup" className="bg-active hover:bg-active/95 text-white font-bold px-4 py-2 rounded-xl transition duration-200 shadow-sm shadow-active/10 text-xs">
                  Sign Up
                </NavLink>
              </div>
            )}
          </div>
        </div>

      </div>
    </nav>
  )
}
