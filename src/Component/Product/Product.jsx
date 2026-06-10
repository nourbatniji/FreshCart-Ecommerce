import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import useApi from '../../Hooks/useApi'
import { CartContext } from '../../Context/CartContextProvider'
import { WishlistContext } from '../../Context/WishlistContextProvider'
import toast from 'react-hot-toast'

export default function Product() {
  const { addToCart } = useContext(CartContext)
  const { wishlistIds, addToWishlist, removeFromWishlist } = useContext(WishlistContext)
  
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  // Fetch all products (limit=50 for local search/filtering across a larger subset)
  const { data: productsData, isLoading: productsLoading, isError: productsError } = useApi('products?limit=50')
  // Fetch all categories
  const { data: categoriesData, isLoading: categoriesLoading } = useApi('categories')

  const handleAddToCart = (e, productId) => {
    e.preventDefault()
    e.stopPropagation()
    
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

    if (wishlistIds.includes(productId)) {
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

  if (productsLoading || categoriesLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <span className="loader"></span>
      </div>
    )
  }

  if (productsError) {
    return (
      <div className="flex h-screen items-center justify-center text-red-500 font-bold">
        Failed to load products. Please try again.
      </div>
    )
  }

  const products = productsData?.data?.data || []
  const categories = categoriesData?.data?.data || []

  // Filter products by category and search term
  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'All' || product.category?.name === selectedCategory
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="mt-28 mb-20 px-4 md:px-0">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Explore Products</h1>
          <p className="text-gray-500 mt-2 text-lg">Find the best products tailored to your daily needs</p>
        </div>

        {/* Search & Filters Controls */}
        <div className="flex flex-col md:flex-row gap-6 items-center justify-between mb-12">
          {/* Search Input */}
          <div className="relative w-full md:w-96">
            <span className="absolute inset-y-0 left-0 flex items-center ps-3.5 pointer-events-none text-gray-400">
              <i className="fa-solid fa-magnifying-glass"></i>
            </span>
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-2xl py-3.5 ps-10 pe-4 text-gray-800 placeholder-gray-450 focus:ring-2 focus:ring-active/20 focus:border-active transition outline-none shadow-sm"
            />
          </div>

          {/* Category Quick Filter Chips */}
          <div className="flex flex-wrap gap-2 justify-center w-full md:w-auto">
            <button
              onClick={() => setSelectedCategory('All')}
              className={`px-5 py-2.5 rounded-full font-semibold text-sm transition-all duration-200 cursor-pointer ${
                selectedCategory === 'All'
                  ? 'bg-active text-white shadow-md shadow-active/10'
                  : 'bg-white text-gray-650 hover:bg-gray-100 border border-gray-150'
              }`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat._id}
                onClick={() => setSelectedCategory(cat.name)}
                className={`px-5 py-2.5 rounded-full font-semibold text-sm transition-all duration-200 cursor-pointer ${
                  selectedCategory === cat.name
                    ? 'bg-active text-white shadow-md shadow-active/10'
                    : 'bg-white text-gray-650 hover:bg-gray-100 border border-gray-150'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filteredProducts.map((product) => {
              const { imageCover, _id, title, price, ratingsAverage, category } = product
              const isInWishlist = wishlistIds.includes(_id)

              return (
                <Link key={_id} to={`/productDetails/${_id}`} className="group">
                  <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 h-[430px] flex flex-col justify-between p-4 relative group">
                    
                    {/* Wishlist Toggle Button */}
                    <button
                      onClick={(e) => handleWishlistToggle(e, _id)}
                      className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm shadow-sm flex items-center justify-center hover:bg-white active:scale-90 transition-all duration-200 cursor-pointer"
                    >
                      <i className={`fa-heart text-lg transition duration-200 ${
                        isInWishlist ? 'fa-solid text-red-500 scale-110' : 'fa-regular text-gray-400 group-hover:text-active'
                      }`}></i>
                    </button>

                    {/* Image Area */}
                    <div className="overflow-hidden rounded-xl h-52 flex items-center justify-center bg-gray-50 mb-4">
                      <img 
                        src={imageCover} 
                        className="max-h-full object-contain group-hover:scale-105 transition duration-300" 
                        alt={title} 
                      />
                    </div>

                    {/* Content Area */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <span className="text-active text-xs font-bold uppercase tracking-wider">{category?.name}</span>
                        <h3 className="text-gray-800 font-bold text-sm mt-1 line-clamp-2 min-h-10 leading-snug group-hover:text-active transition duration-200">
                          {title}
                        </h3>
                      </div>

                      {/* Pricing & Rating */}
                      <div className="flex items-center justify-between mt-3">
                        <span className="font-extrabold text-gray-900 text-base">{price} EGP</span>
                        <span className="flex items-center gap-1 text-sm font-semibold text-gray-700 bg-amber-50 px-2 py-0.5 rounded-lg">
                          <i className="fa-solid fa-star text-amber-500 text-xs"></i>
                          {ratingsAverage}
                        </span>
                      </div>

                      {/* Add to Cart Button */}
                      <button
                        onClick={(e) => handleAddToCart(e, _id)}
                        className="w-full mt-4 bg-active hover:bg-active/95 text-white py-2.5 rounded-xl font-bold text-xs shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center gap-1.5 active:scale-98 cursor-pointer"
                      >
                        <i className="fa-solid fa-cart-shopping"></i> Add to Cart
                      </button>
                    </div>

                  </div>
                </Link>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-150 max-w-md mx-auto px-6">
            <div className="w-20 h-20 bg-gray-50 text-gray-400 rounded-full flex items-center justify-center mx-auto mb-5">
              <i className="fa-solid fa-magnifying-glass text-3xl"></i>
            </div>
            <h3 className="text-xl font-bold text-gray-800">No Products Found</h3>
            <p className="text-gray-500 mt-2">Try checking for spelling errors or clearing your filters.</p>
          </div>
        )}
      </div>
    </div>
  )
}
