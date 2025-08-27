import React from 'react'
import img1 from '../../assets/images/amazon-pay.png'
import img2 from '../../assets/images/american-express.png'
import img3 from '../../assets/images/masterCard2.png'
import img4 from '../../assets/images/paypal.png'
import img5 from '../../assets/images/App-Store.png'
import img6 from '../../assets/images/googlePlay.png'

export default function Footer() {
  return (
    <div className=" bg-gray-100 py-12 mt-12">
      <div className="w-10/12 mx-auto">
        <h1 className='text-2xl'>Get the FreshCart app</h1>
        <p className='text-gray-500 my-2'>We will send you a link, open it on your phone to download the app.</p>
        <div className='flex w-[97%] mx-auto my-4'>
          <input className='w-10/12 bg-white  border border-gray-300 rounded ps-3' type="email" placeholder='Email ..' />
          <button className='bg-active text-white py-1.5 ms-5 rounded w-2/12 cursor-pointer'>Share App Link</button>
        </div>
        <div className='flex justify-between items-center w-[97%] mx-auto my-8  border-t border-b border-gray-300'>
          <div className='w-4/12 flex items-center'>
            <h1>Payment Partners</h1>
            <img src={img1} className='w-16 ms-4 pt-2' alt="" />
            <img src={img2} className='w-12 ms-4 pt-2' alt="" />
            <img src={img3} className='w-10 ms-4 pt-2' alt="" />
            <img src={img4} className='w-16 ms-4 pt-2' alt="" />
          </div>
          <div className='w-4/12  flex items-center'>
            <h1>Get deliveries with FreshCart</h1>
            <img src={img5} className='w-[107px]' alt="" />
            <img src={img6} className='w-24' alt="" />


          </div>
        </div>


      </div>
    </div>
  )
}
