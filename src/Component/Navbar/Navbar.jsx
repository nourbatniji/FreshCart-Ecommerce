import React, { useContext, useEffect, useState } from 'react'
import logoImg from '../../assets/images/logo.png'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../Context/AuthContextProvider'
import { CartContext } from '../../Context/CartContextProvider'
import { WishlistContext } from '../../Context/WishlistContextProvider'
import { AnimatePresence, motion } from 'framer-motion'

const navLinks = [
  { to: '', label: 'Home', end: true },
  { to: '/product', label: 'Products' },
  { to: '/categories', label: 'Categories' },
  { to: '/brands', label: 'Brands' },
]

export default function Navbar() {
  let { token, setToken } = useContext(AuthContext)
  let { numOfCartItems } = useContext(CartContext)
  let { wishlistCount } = useContext(WishlistContext)
  let navg = useNavigate()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [token])

  function logout() {
    setToken(null)
    localStorage.removeItem('token')
    setMenuOpen(false)
    navg('/login')
  }

  const getLinkClass = ({ isActive }) =>
    `font-semibold transition-all duration-200 cursor-pointer ${
      isActive ? 'text-active' : 'text-gray-600 hover:text-active'
    }`

  const getMobileLinkClass = ({ isActive }) =>
    `block w-full px-4 py-3 rounded-xl font-semibold text-base transition-all duration-200 ${
      isActive ? 'text-active bg-emerald-50' : 'text-gray-700 hover:bg-slate-50'
    }`

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`backdrop-blur-md bg-white/80 py-4 fixed w-full top-0 left-0 z-50 border-b transition-all duration-300 ${
        scrolled ? 'shadow-sm border-slate-100' : 'border-transparent'
      }`}
    >
      <div className="max-w-7xl flex items-center justify-between mx-auto px-4 md:px-8">

        {/* Brand Logo */}
        <div className="flex items-center gap-10">
          <Link to="" className="flex space-x-2.5 items-center" onClick={() => setMenuOpen(false)}>
            <img src={logoImg} className="h-9" alt="Fresh Cart Logo" />
            <span className="self-center text-2xl font-black tracking-tight text-gray-900">
              Fresh<span className="text-active">Cart</span>
            </span>
          </Link>

          {/* Center Navigation Links */}
          <ul className="hidden md:flex items-center gap-6 text-sm">
            {navLinks.map((link) => (
              <li key={link.label}>
                <NavLink to={link.to} end={link.end} className={getLinkClass}>{link.label}</NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Section Actions */}
        <div className="flex items-center gap-4 md:gap-6">

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
          <div className="flex items-center gap-3 md:gap-5">
            {token ? (
              <>
                {/* Wishlist Link Icon with Badge */}
                <NavLink to="/wishlist" className={({ isActive }) => `relative flex items-center p-1.5 rounded-full transition ${isActive ? 'text-active bg-emerald-50' : 'text-gray-600 hover:text-active hover:bg-slate-50'}`}>
                  <motion.i whileTap={{ scale: 0.85 }} className="fa-regular fa-heart text-xl"></motion.i>
                  <AnimatePresence>
                    {wishlistCount > 0 && (
                      <motion.span
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center border border-white"
                      >
                        {wishlistCount}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </NavLink>

                {/* Cart Link Icon with Badge */}
                <NavLink to="/cart" className={({ isActive }) => `relative flex items-center p-1.5 rounded-full transition ${isActive ? 'text-active bg-emerald-50' : 'text-gray-600 hover:text-active hover:bg-slate-50'}`}>
                  <motion.i whileTap={{ scale: 0.85 }} className="fa-solid fa-cart-shopping text-xl"></motion.i>
                  <AnimatePresence>
                    {numOfCartItems > 0 && (
                      <motion.span
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        className="absolute -top-1 -right-1 bg-active text-white text-[10px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center border border-white"
                      >
                        {numOfCartItems}
                      </motion.span>
                    )}
                  </AnimatePresence>
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
              <div className="hidden sm:flex items-center gap-4 text-sm">
                <NavLink to="/login" className={getLinkClass}>Login</NavLink>
                <NavLink to="/signup" className="bg-active hover:bg-active/95 text-white font-bold px-4 py-2 rounded-xl transition duration-200 shadow-sm shadow-active/10 text-xs">
                  Sign Up
                </NavLink>
              </div>
            )}

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="md:hidden relative w-9 h-9 flex items-center justify-center text-gray-700 cursor-pointer"
              aria-label="Toggle menu"
            >
              <i className={`fa-solid ${menuOpen ? 'fa-xmark' : 'fa-bars'} text-xl`}></i>
            </button>
          </div>
        </div>

      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden overflow-hidden border-t border-slate-100 bg-white/95 backdrop-blur-md"
          >
            <ul className="px-4 py-3 space-y-1">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <NavLink to={link.to} end={link.end} className={getMobileLinkClass} onClick={() => setMenuOpen(false)}>
                    {link.label}
                  </NavLink>
                </li>
              ))}
              <li className="pt-2 mt-2 border-t border-slate-100">
                {token ? (
                  <button
                    onClick={logout}
                    className="w-full text-left px-4 py-3 rounded-xl font-semibold text-base text-red-500 hover:bg-red-50 transition cursor-pointer"
                  >
                    Logout
                  </button>
                ) : (
                  <div className="flex flex-col gap-2 px-4">
                    <NavLink to="/login" onClick={() => setMenuOpen(false)} className="w-full text-center px-4 py-3 rounded-xl font-semibold text-base text-gray-700 border border-gray-200 hover:bg-slate-50 transition">
                      Login
                    </NavLink>
                    <NavLink to="/signup" onClick={() => setMenuOpen(false)} className="w-full text-center px-4 py-3 rounded-xl font-bold text-base bg-active text-white hover:bg-active/95 transition">
                      Sign Up
                    </NavLink>
                  </div>
                )}
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
