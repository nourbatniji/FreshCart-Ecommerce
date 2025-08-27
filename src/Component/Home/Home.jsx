import axios from 'axios'
import React, { useEffect, useState } from 'react'
import MainSlider from '../MainSlider/MainSlider'
import CategorySider from '../CategorySider/CategorySider'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import useApi from '../../Hooks/useApi'

export default function Home() {
  let [page, setPage] = useState(1)


  // let { data, isLoading, error, isError } = useQuery({
  //   queryKey: ["Products", page],
  //   queryFn: getAllProducts
  // })


  // function getAllProducts() {
  //   return axios.get(`https://ecommerce.routemisr.com/api/v1/products?limit=20&page=${page}`)
  // }


  let {data, isLoading, isError} = useApi(`products?limit=20&page=${page}`)


  function getPageNumber(e) {
    let page = e.target.getAttribute("page");
    setPage(page)
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

              return <div key={_id} className=" lg:w-2/12 md:w-3/12 sm:w-6/12 w-full px-3 mb-3">
                <Link to={`/productDetails/` + _id}>
                  <div className="item bg-white border border-notActive h-[450px] duration-400 hover:scale-110 p-2.5">
                    <img src={imageCover} className='w-full' alt="" />
                    <h6 className='mt-4 text-active  font-medium'>{category.name}</h6>
                    <h6 className=' font-medium'>{name}</h6>
                    <h6 className=' font-medium'>{title.split(" ").slice(0, 3).join(" ")} </h6>
                    <div className="flex mt-3 justify-between items-center">
                      <span className='font-semibold'>{price} EGP</span>
                      <span className='text-yellow-600'>{ratingsAverage}<i className='fa-solid fa-star'></i></span>
                    </div>
                    <div className="flex mt-6 justify-between items-center">
                      <span><i class="fa-solid fa-cart-shopping hover:text-active cursor-pointer duration-300"></i></span>
                      <span><i class="fa-regular fa-heart hover:text-active cursor-pointer duration-300"></i></span>
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
                return <li key={number} onClick={getPageNumber}>
                  <a page={i+1} href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">{i+1}</a>
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