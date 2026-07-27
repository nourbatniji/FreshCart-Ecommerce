import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../Context/AuthContextProvider'
import { CartContext } from '../../Context/CartContextProvider'
import { WishlistContext } from '../../Context/WishlistContextProvider'
import toast from 'react-hot-toast'
import { AnimatePresence, motion } from 'framer-motion'
import { requireAuth } from '../../utils/requireAuth'

export default function ProductDetails() {
  const { id } = useParams()
  const { token } = useContext(AuthContext)
  const { addToCart } = useContext(CartContext)
  const { wishlistIds, addToWishlist, removeFromWishlist } = useContext(WishlistContext)
  const [activeImage, setActiveImage] = useState(null)
  const navigate = useNavigate()

  const { data, isLoading, isError } = useQuery({
    queryKey: ['ProductDetails', id],
    queryFn: function () {
      return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    }
  })

  const product = data?.data?.data

  useEffect(() => {
    setActiveImage(product?.imageCover || null)
  }, [product?.imageCover])

  const handleAddToCart = (productId) => {
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

  const handleWishlistToggle = (productId) => {
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

  if (isLoading) {
    return (
      <div className="mt-36 mb-20 px-4 md:px-0">
        <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 p-6 md:p-12 animate-pulse">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="w-full lg:w-5/12">
              <div className="w-full h-[400px] rounded-2xl bg-gray-150" />
            </div>
            <div className="w-full lg:w-7/12 space-y-4">
              <div className="h-6 w-32 rounded-full bg-gray-150" />
              <div className="h-10 w-3/4 rounded bg-gray-150" />
              <div className="h-4 w-full rounded bg-gray-150" />
              <div className="h-4 w-5/6 rounded bg-gray-150" />
              <div className="h-14 w-full rounded-2xl bg-gray-150 mt-8" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="flex h-screen items-center justify-center text-red-500 font-bold">
        Failed to load product details. Please try again.
      </div>
    )
  }

  const isInWishlist = wishlistIds.includes(product?._id || product?.id)

  return (
    <div className="mt-36 mb-20 px-4 md:px-0">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-6xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 p-6 md:p-12"
      >
        <div className="flex flex-col lg:flex-row gap-12 items-center">

          {/* Gallery Area */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="w-full lg:w-5/12 flex flex-col items-center"
          >
            <div className="w-full h-[400px] overflow-hidden rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center p-4">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImage}
                  src={activeImage}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="max-h-full max-w-full object-contain"
                  alt={product?.title}
                />
              </AnimatePresence>
            </div>
            {product?.images && product.images.length > 1 && (
              <div className="flex gap-3 mt-4 overflow-x-auto w-full py-2 justify-center">
                {product.images.map((image, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(image)}
                    className={`w-16 h-16 rounded-lg border overflow-hidden cursor-pointer transition-all duration-200 flex-shrink-0 flex items-center justify-center bg-gray-50 ${
                      activeImage === image ? 'border-active ring-2 ring-active/30' : 'border-gray-200 hover:border-active'
                    }`}
                  >
                    <img
                      src={image}
                      className="max-h-full max-w-full object-contain"
                      alt=""
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Details Area */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="w-full lg:w-7/12"
          >
            <span className="text-active font-extrabold uppercase text-sm tracking-wider bg-active/10 px-3 py-1 rounded-full">
              {product?.category?.name}
            </span>
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-950 mt-4 leading-tight">{product?.title}</h1>

            <div className="flex items-center gap-4 mt-4">
              <div className="flex items-center gap-1 font-bold text-gray-700 bg-amber-50 px-3 py-1 rounded-lg">
                <i className="fa-solid fa-star text-amber-500"></i>
                <span>{product?.ratingsAverage}</span>
              </div>
              <span className="text-gray-400">|</span>
              <span className="text-gray-500 font-medium">{product?.brand?.name || 'FreshBrand'}</span>
            </div>

            <p className="text-gray-500 leading-relaxed mt-6 text-base">{product?.description}</p>

            <div className="border-t border-gray-100 my-8"></div>

            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-gray-400 text-sm font-medium">Price</span>
                <div className="text-3xl font-black text-gray-900 mt-1">{product?.price} EGP</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => handleAddToCart(product?._id || product?.id)}
                className="flex-1 bg-active hover:bg-active/95 text-white py-4 rounded-2xl font-bold text-base shadow-lg shadow-active/20 hover:shadow-xl transition-all duration-250 flex items-center justify-center gap-2 cursor-pointer"
              >
                <i className="fa-solid fa-cart-shopping"></i> Add to Cart
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => handleWishlistToggle(product?._id || product?.id)}
                className={`px-6 py-4 rounded-2xl border font-bold text-base transition-all duration-250 flex items-center justify-center gap-2 cursor-pointer ${
                  isInWishlist
                    ? 'border-red-200 bg-red-50 text-red-500 hover:bg-red-100'
                    : 'border-gray-200 hover:bg-gray-50 text-gray-650 hover:text-gray-900'
                }`}
              >
                <i className={`fa-heart ${isInWishlist ? 'fa-solid text-red-500' : 'fa-regular'}`}></i>
                <span>{isInWishlist ? 'Wishlisted' : 'Add to Wishlist'}</span>
              </motion.button>
            </div>
          </motion.div>

        </div>
      </motion.div>
    </div>
  )
}
