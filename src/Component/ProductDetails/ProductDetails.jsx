import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { CartContext } from '../../Context/CartContextProvider'
import { WishlistContext } from '../../Context/WishlistContextProvider'
import toast from 'react-hot-toast'

export default function ProductDetails() {
  const { id } = useParams()
  const { addToCart } = useContext(CartContext)
  const { wishlistIds, addToWishlist, removeFromWishlist } = useContext(WishlistContext)

  const { data, isLoading, isError } = useQuery({
    queryKey: ['ProductDetails', id],
    queryFn: function () {
      return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    }
  })

  function getImgSrc(e) {
    let imgSrc = e.target.getAttribute("src")
    document.getElementById("myImage").setAttribute("src", imgSrc)
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

  const handleWishlistToggle = (productId) => {
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
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <span className="loader"></span>
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

  const product = data?.data?.data
  const isInWishlist = wishlistIds.includes(product?._id || product?.id)

  return (
    <div className="mt-36 mb-20 px-4 md:px-0">
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 p-6 md:p-12">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          
          {/* Gallery Area */}
          <div className="w-full lg:w-5/12 flex flex-col items-center">
            <div className="w-full h-[400px] overflow-hidden rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center p-4">
              <img 
                src={product?.imageCover} 
                id="myImage" 
                className="max-h-full max-w-full object-contain transition-all duration-300" 
                alt={product?.title} 
              />
            </div>
            {product?.images && product.images.length > 1 && (
              <div className="flex gap-3 mt-4 overflow-x-auto w-full py-2 justify-center">
                {product.images.map((image, i) => (
                  <div 
                    key={i} 
                    className="w-16 h-16 rounded-lg border border-gray-200 overflow-hidden cursor-pointer hover:border-active transition duration-200 flex-shrink-0 flex items-center justify-center bg-gray-50"
                  >
                    <img 
                      src={image} 
                      onClick={getImgSrc} 
                      className="max-h-full max-w-full object-contain" 
                      alt="" 
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Details Area */}
          <div className="w-full lg:w-7/12">
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
              <button
                onClick={() => handleAddToCart(product?._id || product?.id)}
                className="flex-1 bg-active hover:bg-active/95 text-white py-4 rounded-2xl font-bold text-base shadow-lg shadow-active/20 hover:shadow-xl transition-all duration-250 flex items-center justify-center gap-2 active:scale-98 cursor-pointer"
              >
                <i className="fa-solid fa-cart-shopping"></i> Add to Cart
              </button>

              <button
                onClick={() => handleWishlistToggle(product?._id || product?.id)}
                className={`px-6 py-4 rounded-2xl border font-bold text-base transition-all duration-250 flex items-center justify-center gap-2 active:scale-95 cursor-pointer ${
                  isInWishlist 
                    ? 'border-red-200 bg-red-50 text-red-500 hover:bg-red-100' 
                    : 'border-gray-200 hover:bg-gray-50 text-gray-650 hover:text-gray-900'
                }`}
              >
                <i className={`fa-heart ${isInWishlist ? 'fa-solid text-red-500' : 'fa-regular'}`}></i>
                <span>{isInWishlist ? 'Wishlisted' : 'Add to Wishlist'}</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
