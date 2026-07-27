import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { WishlistContext } from '../../Context/WishlistContextProvider'
import { CartContext } from '../../Context/CartContextProvider'
import toast from 'react-hot-toast'
import { AnimatePresence, motion } from 'framer-motion'

export default function Wishlist() {
  const { getWishlist, removeFromWishlist } = useContext(WishlistContext)
  const { addToCart } = useContext(CartContext)

  const [wishlistProducts, setWishlistProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    getWishlist()
      .then((res) => {
        setWishlistProducts(res.data.data || [])
        setIsLoading(false)
      })
      .catch((err) => {
        console.error(err)
        setIsLoading(false)
      })
  }, [])

  const handleRemove = (productId) => {
    removeFromWishlist(productId)
      .then(() => {
        setWishlistProducts((prev) => prev.filter(item => (item._id || item.id) !== productId))
        toast.success("Removed from Wishlist", {
          icon: '🗑️',
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          }
        })
      })
      .catch(() => {
        toast.error("Failed to remove item")
      })
  }

  const handleAddToCart = (productId) => {
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

  if (isLoading) {
    return (
      <div className="mt-28 mb-20 px-4 md:px-0">
        <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 p-6 md:p-10 animate-pulse">
          <div className="h-8 w-48 rounded bg-gray-150 mb-8" />
          <div className="space-y-6">
            {new Array(3).fill('').map((_, i) => (
              <div key={i} className="flex items-center gap-6">
                <div className="w-24 h-24 rounded-xl bg-gray-150 shrink-0" />
                <div className="flex-1 space-y-3">
                  <div className="h-4 w-2/3 rounded bg-gray-150" />
                  <div className="h-4 w-1/3 rounded bg-gray-150" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="mt-28 mb-20 px-4 md:px-0">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100"
      >
        <div className="p-6 md:p-10">
          <div className="border-b border-gray-100 pb-6 mb-6">
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">My Wishlist</h1>
            <p className="text-gray-500 mt-1">Products you've saved for later</p>
          </div>

          {wishlistProducts.length > 0 ? (
            <div className="divide-y divide-gray-100">
              <AnimatePresence initial={false}>
                {wishlistProducts.map((product) => {
                  const id = product._id || product.id
                  return (
                    <motion.div
                      key={id}
                      layout
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="py-6 flex flex-col md:flex-row items-center justify-between gap-6 hover:bg-gray-50/50 transition duration-300 rounded-xl px-2">
                        <div className="flex items-center gap-6 w-full md:w-8/12">
                          <img
                            className="w-24 h-24 object-cover rounded-xl border border-gray-100 shadow-sm"
                            src={product.imageCover}
                            alt={product.title}
                          />
                          <div className="flex-1">
                            <Link to={`/productDetails/${id}`} className="hover:text-active transition duration-200">
                              <h3 className="text-lg font-bold text-gray-800 line-clamp-1">{product.title}</h3>
                            </Link>
                            <p className="text-gray-400 text-sm mt-0.5">{product.category?.name || product.brand?.name}</p>
                            <h4 className="text-active font-semibold text-lg mt-2">{product.price} EGP</h4>
                            <button
                              onClick={() => handleRemove(id)}
                              className="text-gray-450 hover:text-red-500 text-sm mt-3 flex items-center transition-colors duration-250 cursor-pointer"
                            >
                              <i className="fa-regular fa-trash-can me-1.5"></i> Remove
                            </button>
                          </div>
                        </div>

                        <div className="w-full md:w-auto">
                          <button
                            onClick={() => handleAddToCart(id)}
                            className="w-full md:w-auto bg-active text-white text-center font-bold px-6 py-3 rounded-xl shadow-md hover:bg-active/95 transition duration-200 cursor-pointer flex items-center justify-center gap-2 text-sm"
                          >
                            <i className="fa-solid fa-cart-shopping"></i> Add to Cart
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </AnimatePresence>
            </div>
          ) : (
            <div className="text-center py-16 px-6">
              <div className="w-20 h-20 bg-active/10 text-active rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="fa-regular fa-heart text-4xl"></i>
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Your Wishlist is Empty</h2>
              <p className="text-gray-500 mt-2 mb-8">Save your favorite items here to view them later.</p>
              <Link
                to="/"
                className="inline-block bg-active text-white font-bold px-8 py-3.5 rounded-xl shadow-md hover:bg-active/95 transition duration-200"
              >
                Go Explore Products
              </Link>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  )
}
