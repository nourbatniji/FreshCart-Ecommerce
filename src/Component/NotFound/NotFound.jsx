import React from 'react'
import image from "../../assets/images/error.svg"

export default function NotFound() {
  return (
    <div className='flex justify-center items-center h-screen mt-0'>
      <img src={image} className='w-1/2' alt="" />
    </div>
  )
}
