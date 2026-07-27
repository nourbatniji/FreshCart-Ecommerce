import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../../Context/CartContextProvider'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { AnimatePresence, motion } from 'framer-motion'

export default function Cart() {
  let { getUserCart, removeCartItem, updateCartItemCount, clearCart } = useContext(CartContext)
  let [cartData, setCartData] = useState(null)
  let [isLoading, setIsLoading] = useState(true)

  function getLoggedUserCart() {
    setIsLoading(true)
    getUserCart()
      .then((req) => {
        setCartData(req.data.data)
        setIsLoading(false)
      })
      .catch((err) => {
        console.error(err)
        setIsLoading(false)
      })
  }

  function deleteItem(productId) {
    removeCartItem(productId)
      .then((res) => {
        setCartData(res.data.data)
        toast.success("Item removed from cart", {
          icon: '🗑️',
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          }
        })
      })
      .catch((err) => {
        toast.error("Failed to remove item")
      })
  }

  function updateCount(productId, count) {
    if (count < 1) {
      deleteItem(productId)
      return
    }
    updateCartItemCount(productId, count)
      .then((res) => {
        setCartData(res.data.data)
        toast.success("Quantity updated", {
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          }
        })
      })
      .catch((err) => {
        toast.error("Failed to update quantity")
      })
  }

  function clearAll() {
    const clearPromise = clearCart()
      .then(() => {
        setCartData(null)
      })

    toast.promise(clearPromise, {
      loading: 'Clearing your cart...',
      success: 'Cart cleared successfully!',
      error: 'Could not clear cart.'
    }, {
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      }
    })
  }

  useEffect(() => {
    getLoggedUserCart()
  }, [])

  if (isLoading) {
    return (
      <div className="mt-28 mb-20 px-4 md:px-0">
        <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 p-6 md:p-10 animate-pulse">
          <div className="h-8 w-56 rounded bg-gray-150 mb-8" />
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
      {cartData && cartData.products.length > 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100"
        >
          <div className="p-6 md:p-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-gray-100 pb-6">
              <div>
                <h1 className="text-3xl font-extrabold text-gray-850 tracking-tight">Shopping Cart</h1>
                <p className="text-gray-500 mt-1">Manage your selected items</p>
              </div>
              <button
                onClick={clearAll}
                className="mt-4 md:mt-0 text-red-500 hover:text-red-750 font-semibold flex items-center transition-colors duration-250 cursor-pointer"
              >
                <i className="fa-regular fa-trash-can me-2"></i> Clear Cart
              </button>
            </div>

            <div className="divide-y divide-gray-100">
              <AnimatePresence initial={false}>
                {cartData.products.map((element) => {
                  const product = element.product
                  const pid = product._id || product.id
                  return (
                    <motion.div
                      key={pid}
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
                            <h3 className="text-lg font-bold text-gray-800 line-clamp-1">{product.title}</h3>
                            <p className="text-gray-400 text-sm mt-0.5">{product.brand?.name || product.category?.name}</p>
                            <h4 className="text-active font-semibold text-lg mt-2">{element.price} EGP</h4>
                            <button
                              onClick={() => deleteItem(pid)}
                              className="text-gray-400 hover:text-red-500 text-sm mt-3 flex items-center transition-colors duration-250 cursor-pointer"
                            >
                              <i className="fa-regular fa-trash-can me-1.5"></i> Remove
                            </button>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 bg-gray-50 border border-gray-100 rounded-lg p-1">
                          <button
                            onClick={() => updateCount(pid, element.count - 1)}
                            className="w-8 h-8 rounded-md bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-100 active:scale-95 transition cursor-pointer"
                          >
                            <i className="fa-solid fa-minus text-gray-650 text-xs"></i>
                          </button>
                          <AnimatePresence mode="popLayout" initial={false}>
                            <motion.span
                              key={element.count}
                              initial={{ y: -8, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              exit={{ y: 8, opacity: 0 }}
                              transition={{ duration: 0.15 }}
                              className="w-8 text-center font-bold text-gray-800 inline-block"
                            >
                              {element.count}
                            </motion.span>
                          </AnimatePresence>
                          <button
                            onClick={() => updateCount(pid, element.count + 1)}
                            className="w-8 h-8 rounded-md bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-100 active:scale-95 transition cursor-pointer"
                          >
                            <i className="fa-solid fa-plus text-gray-650 text-xs"></i>
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </AnimatePresence>
            </div>

            <div className="mt-10 border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div>
                <h3 className="text-gray-500 font-medium text-lg">Total Price</h3>
                <h2 className="text-3xl font-black text-gray-900 mt-1">{cartData.totalCartPrice} EGP</h2>
              </div>
              <Link
                to="/checkout"
                className="w-full md:w-auto bg-active text-white text-center font-bold px-10 py-4 rounded-xl shadow-lg shadow-active/20 hover:bg-active/90 active:scale-98 transition duration-250 cursor-pointer"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-md mx-auto text-center py-20 bg-white rounded-2xl shadow-xl border border-gray-150 px-6"
        >
          <div className="w-24 h-24 bg-active/10 text-active rounded-full flex items-center justify-center mx-auto mb-6">
            <i className="fa-solid fa-cart-shopping text-4xl"></i>
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Your Cart is Empty</h2>
          <p className="text-gray-500 mt-2 mb-8">Add items to your cart to start shopping!</p>
          <Link
            to="/"
            className="inline-block bg-active text-white font-bold px-8 py-3.5 rounded-xl shadow-md hover:bg-active/95 transition duration-200"
          >
            Start Shopping
          </Link>
        </motion.div>
      )}
    </div>
  )
}
