import axios from 'axios'
import React, { useEffect, useState, useContext } from 'react'
import MainSlider from '../MainSlider/MainSlider'
import CategorySider from '../CategorySider/CategorySider'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import useApi from '../../Hooks/useApi'
import { CartContext } from '../../Context/CartContextProvider'
import { WishlistContext } from '../../Context/WishlistContextProvider'
import toast from 'react-hot-toast'

export default function Home() {
  let [page, setPage] = useState(1)
  const { addToCart } = useContext(CartContext)
  const { wishlistIds, addToWishlist, removeFromWishlist } = useContext(WishlistContext)

  let {data, isLoading, isError} = useApi(`products?limit=20&page=${page}`)

  function getPageNumber(e) {
    let page = e.target.getAttribute("page");
    setPage(page)
  }

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
    <>
      {isLoading || isError ? <div className='flex h-screen items-center justify-center bg-gray-100'><span className="loader"></span> </div> :
        <div className="w-10/12 mx-auto mt-[81px]">
          <MainSlider />
          <CategorySider />
          <div className="flex flex-wrap  gap-y-6">

            {data?.data?.data?.map((product) => {
              let { imageCover, _id, title, name, price, ratingsAverage, description, category } = product
              const isInWishlist = wishlistIds.includes(_id)

              return <div key={_id} className=" lg:w-2/12 md:w-3/12 sm:w-6/12 w-full px-3 mb-3">
                <Link to={`/productDetails/` + _id}>
                  <div className="item bg-white border border-notActive h-[450px] duration-400 hover:scale-105 p-2.5 rounded-xl shadow-sm hover:shadow-md transition flex flex-col justify-between">
                    <div>
                      <img src={imageCover} className='w-full h-44 object-contain rounded-lg' alt="" />
                      <h6 className='mt-4 text-active  font-medium'>{category.name}</h6>
                      <h6 className=' font-medium'>{name}</h6>
                      <h6 className=' font-medium text-gray-800 line-clamp-2 mt-1'>{title.split(" ").slice(0, 3).join(" ")} </h6>
                    </div>
                    <div>
                      <div className="flex mt-3 justify-between items-center">
                        <span className='font-semibold text-gray-950'>{price} EGP</span>
                        <span className='text-yellow-605 text-sm font-semibold flex items-center gap-1 bg-amber-50 px-1.5 py-0.5 rounded'>
                          <i className='fa-solid fa-star text-amber-500 text-xs'></i>
                          {ratingsAverage}
                        </span>
                      </div>
                      <div className="flex mt-6 justify-between items-center pt-2 border-t border-gray-100">
                        <button onClick={(e) => handleAddToCart(e, _id)} className="p-1 cursor-pointer">
                          <i className="fa-solid fa-cart-shopping hover:text-active text-gray-400 duration-300 text-lg"></i>
                        </button>
                        <button onClick={(e) => handleWishlistToggle(e, _id)} className="p-1 cursor-pointer">
                          <i className={`fa-heart hover:text-active duration-300 text-lg ${
                            isInWishlist ? 'fa-solid text-red-500 scale-110' : 'fa-regular text-gray-400'
                          }`}></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            })}
          </div>
          <nav aria-label="Page navigation example" className='my-12'>
            <ul className="flex justify-center items-center -space-x-px h-8 text-sm">
              <li>
                <a href="#" className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700">
                  <span className="sr-only">Previous</span>
                  <svg className="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 1 1 5l4 4" />
                  </svg>
                </a>
              </li>
              {new Array(data?.data?.metadata?.numberOfPages)
              .fill("")
              .map((number, i) => {
                return <li key={i} onClick={getPageNumber}>
                  <a page={i+1} href="#" className={`flex items-center justify-center px-3 h-8 leading-tight border hover:bg-gray-100 hover:text-gray-700 ${
                    page == i + 1 ? 'bg-active/10 text-active border-active/30 font-bold' : 'bg-white text-gray-500 border-gray-300'
                  }`}>{i+1}</a>
                </li>
              })}
              <li>
                <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700">
                  <span className="sr-only">Next</span>
                  <svg className="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m1 9 4-4-4-4" />
                  </svg>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      }
    </>
  )
}


// let [productList, setProductList] = useState(null)
// let [isLoading, setIsLoading] = useState(false)



// async function getAllProducts(page = 1) {
//   await axios.get(`https://ecommerce.routemisr.com/api/v1/products?limit=20&page=${page}`)
//     .then((req) => {
//       setIsLoading(false)
//       setProductList(req.data.data)
//       console.log(req.data.metadata);
//       let nums = []
//       for (let i = 1; i <= req.data.metadata.numberOfPages; i++) {
//         nums.push(i)
//       }
//       setNumberOfPagesList(nums)
//     })
//     .catch((err) => {
//       setIsLoading(true)
//       console.log(err)
//     })
// }
// useEffect(() => {
//   getAllProducts()
// }, [])