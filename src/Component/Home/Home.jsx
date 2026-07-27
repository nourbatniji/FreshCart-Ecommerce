import React, { useState, useContext } from 'react'
import MainSlider from '../MainSlider/MainSlider'
import CategorySider from '../CategorySider/CategorySider'
import { Link, useNavigate } from 'react-router-dom'
import useApi from '../../Hooks/useApi'
import { AuthContext } from '../../Context/AuthContextProvider'
import { CartContext } from '../../Context/CartContextProvider'
import { WishlistContext } from '../../Context/WishlistContextProvider'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'
import { fadeUp, staggerContainer } from '../../utils/motion'
import { requireAuth } from '../../utils/requireAuth'
import ProductCardSkeleton from '../Product/ProductCardSkeleton'

export default function Home() {
  let [page, setPage] = useState(1)
  const { token } = useContext(AuthContext)
  const { addToCart } = useContext(CartContext)
  const { wishlistIds, addToWishlist, removeFromWishlist } = useContext(WishlistContext)
  const navigate = useNavigate()

  let {data, isLoading, isError} = useApi(`products?limit=20&page=${page}`)

  const handleAddToCart = (e, productId) => {
    e.preventDefault()
    e.stopPropagation()
    if (!requireAuth(token, navigate)) return
    const addPromise = addToCart(productId)
    toast.promise(addPromise, {
      loading: 'Adding to cart...',
      success: 'Added to cart successfully! 🛒',
      error: 'Failed to add product to cart.'
    }, {
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      }
    })
  }

  const handleWishlistToggle = (e, productId) => {
    e.preventDefault()
    e.stopPropagation()
    if (!requireAuth(token, navigate)) return
    const isInWishlist = wishlistIds.includes(productId)
    if (isInWishlist) {
      removeFromWishlist(productId)
        .then(() => {
          toast.success("Removed from Wishlist", {
            icon: '💔',
            style: { borderRadius: '10px', background: '#333', color: '#fff' }
          })
        })
        .catch(() => toast.error("Failed to remove from wishlist"))
    } else {
      addToWishlist(productId)
        .then(() => {
          toast.success("Added to Wishlist", {
            icon: '❤️',
            style: { borderRadius: '10px', background: '#333', color: '#fff' }
          })
        })
        .catch(() => toast.error("Failed to add to wishlist"))
    }
  }

  return (
    <div className="max-w-7xl mx-auto mt-28 mb-20 px-4 md:px-8">
      {/* Hero Sliders */}
      <div className="mb-12 space-y-10">
        <MainSlider />
        <CategorySider />
      </div>

      {/* Section Heading */}
      <div className="mb-8">
        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Popular Products</h2>
        <p className="text-gray-500 mt-1 text-sm">Shop our top trending products from trusted brands</p>
      </div>

      {isError ? (
        <div className="text-center py-16 text-red-500 font-semibold">
          Failed to load products. Please try again.
        </div>
      ) : isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {new Array(10).fill('').map((_, i) => <ProductCardSkeleton key={i} />)}
        </div>
      ) : (
        <>
          {/* Product CSS Grid */}
          <motion.div
            variants={staggerContainer(0.05)}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
          >
            {data?.data?.data?.map((product) => {
              let { imageCover, _id, title, price, ratingsAverage, category } = product
              const isInWishlist = wishlistIds.includes(_id)

              return (
                <motion.div key={_id} variants={fadeUp}>
                  <Link to={`/productDetails/${_id}`} className="group">
                    <motion.div
                      whileHover={{ y: -4 }}
                      transition={{ duration: 0.2 }}
                      className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 h-[430px] flex flex-col justify-between p-4 relative"
                    >

                      {/* Floating Wishlist Heart */}
                      <motion.button
                        whileTap={{ scale: 0.8 }}
                        onClick={(e) => handleWishlistToggle(e, _id)}
                        className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm shadow-sm flex items-center justify-center hover:bg-white transition-all duration-200 cursor-pointer"
                      >
                        <i className={`fa-heart text-lg transition duration-200 ${
                          isInWishlist ? 'fa-solid text-red-500 scale-110' : 'fa-regular text-gray-400 hover:text-red-500'
                        }`}></i>
                      </motion.button>

                      {/* Image Area */}
                      <div className="overflow-hidden rounded-xl h-52 flex items-center justify-center bg-slate-50/50 mb-3 p-2">
                        <img
                          src={imageCover}
                          className="max-h-full object-contain group-hover:scale-105 transition duration-300"
                          alt={title}
                        />
                      </div>

                      {/* Meta info */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <span className="text-active text-[11px] font-extrabold uppercase tracking-wider bg-emerald-50 px-2 py-0.5 rounded">
                            {category?.name}
                          </span>
                          <h3 className="text-gray-800 font-bold text-sm mt-2 line-clamp-2 min-h-10 leading-snug group-hover:text-active transition duration-200">
                            {title}
                          </h3>
                        </div>

                        {/* Pricing & Ratings */}
                        <div className="flex items-center justify-between mt-2">
                          <span className="font-extrabold text-gray-900 text-base">{price} EGP</span>
                          <span className="flex items-center gap-1 text-xs font-semibold text-gray-700 bg-amber-50 px-2 py-0.5 rounded-lg">
                            <i className="fa-solid fa-star text-amber-500"></i>
                            {ratingsAverage}
                          </span>
                        </div>

                        {/* Add to Cart button */}
                        <motion.button
                          whileTap={{ scale: 0.96 }}
                          onClick={(e) => handleAddToCart(e, _id)}
                          className="w-full mt-4 bg-active hover:bg-active/95 text-white py-2.5 rounded-xl font-bold text-xs shadow-sm hover:shadow-md transition duration-200 flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <i className="fa-solid fa-cart-shopping"></i> Add to Cart
                        </motion.button>
                      </div>

                    </motion.div>
                  </Link>
                </motion.div>
              )
            })}
          </motion.div>

          {/* Clean Pagination */}
          <nav aria-label="Page navigation" className="mt-16 flex justify-center">
            <ul className="flex items-center gap-1.5">
              <li>
                <button
                  onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                  disabled={page === 1}
                  className="flex items-center justify-center w-9 h-9 rounded-xl border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 hover:text-gray-700 disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-gray-500 transition duration-200 cursor-pointer"
                >
                  <i className="fa-solid fa-angle-left text-xs"></i>
                </button>
              </li>
              {new Array(data?.data?.metadata?.numberOfPages || 1)
                .fill("")
                .map((_, i) => (
                  <li key={i}>
                    <button
                      onClick={() => setPage(i + 1)}
                      className={`w-9 h-9 rounded-xl border font-bold text-xs transition duration-200 cursor-pointer ${
                        page === i + 1
                          ? 'bg-active border-active text-white shadow-md shadow-active/10'
                          : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                      }`}
                    >
                      {i + 1}
                    </button>
                  </li>
                ))}
              <li>
                <button
                  onClick={() => setPage(prev => Math.min(prev + 1, data?.data?.metadata?.numberOfPages || 1))}
                  disabled={page === data?.data?.metadata?.numberOfPages}
                  className="flex items-center justify-center w-9 h-9 rounded-xl border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 hover:text-gray-700 disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-gray-500 transition duration-200 cursor-pointer"
                >
                  <i className="fa-solid fa-angle-right text-xs"></i>
                </button>
              </li>
            </ul>
          </nav>
        </>
      )}
    </div>
  )
}
