import React from 'react'
import useApi from '../../Hooks/useApi'

export default function Categories() {
  let { data, isLoading, isError, error } = useApi("categories")


  return (
    <div>
      {isLoading || isError ? <div className='flex h-screen items-center justify-center bg-gray-100'><span className="loader"></span> </div> :
        <>
          <div className="mt-[100px] flex w-10/12 m-auto flex-wrap gap-y-6">
            {data?.data?.data.map((category) => {
              return (
                <div className="lg:w-4/12 md:w-6/12 w-full px-3 mb-3">
                  <div className="item h-96 bg-gray-200">
                    <img src={category.image} className='object-cover w-full  h-80 m-auto object-top' alt="" />
                    <h5 className='text-center'>{category.name}</h5>
                  </div>
                </div>
              )
            })}
          </div>
        </>
      }</div>
  )
}