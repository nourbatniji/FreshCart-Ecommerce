import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../../Context/CartContextProvider';

export default function Cart() {
  let { getUserCart } = useContext(CartContext)
  let [cartData, setCartData] = useState(null)
  let [isLoading, setIsLoading] = useState(true)


  function getLoggedUserCart() {
    setIsLoading(true)
    getUserCart().then((req) => {
      console.log(req.data.data);
      setIsLoading(false)

      setCartData(req.data.data)
    }).catch((err) => { 
      console.log(err)
      setIsLoading(true)
    })
  }

  useEffect(() => {
    getLoggedUserCart()
  }, [])

  if(isLoading){
    return  <div className='flex h-screen items-center justify-center bg-gray-100'><span className="loader"></span> </div> 
  }

  return (
    <>
    {
      cartData?.products.length > 0 ? (<div className='mt-[100px]'>
        <div className='w-10/12 mx-auto p-11 bg-gray-200'>
          <h1 className='text-3xl font-semibold'>Shopping cart:</h1>
          <h3 className='text-active text-lg py-2'>Total cart price:{cartData?.totalCartPrice}  EGP</h3>

          <div className="divide-y-2 divide-gray-200">
            {cartData?.products?.map((element) => {
              return <div key={element._id} className="flex mx-auto  bg-gray-300 mt-6 ">

                <div className="w-10/12 flex">
                  <img className='w-2/12' src={element.product.imageCover} alt="" />
                  <div className='w-10/12 p-3'>
                    <h3>woman shawl</h3>
                    <h3 className='text-active'>Price: {element.price} EGP</h3>
                    <button >
                      <i class="fa-regular fa-trash-can text-active"></i>
                      <span className='ms-2'>Remove</span>
                    </button>
                  </div>
                </div>
                <div className="w-2/12 flex items-center justify-center">
                  <i class="fa-solid fa-plus border border-active p-1.5 rounded cursor-pointer"></i>
                  <span className='ms-2'>{element.count}</span>
                  <i class="fa-solid fa-minus border border-active p-1.5 rounded ms-2 cursor-pointer"></i>
                </div>
              </div>
            })}
          </div>

        </div>
      </div>) :
        (<div className='mt-96'>
          <h1>NoData</h1></div>)
    }
    </>
  )
}
