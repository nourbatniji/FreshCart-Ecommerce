import React from 'react'
import useApi from '../../Hooks/useApi'

export default function Brands() {
  let { data, isLoading, isError } = useApi("brands")
  
  return (
    <div className="mt-32 mb-20 px-4 md:px-0">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Our Brands</h1>
          <p className="text-gray-500 mt-2 text-lg font-medium">Shop authentic products from top-tier brands</p>
        </div>

        {isLoading || isError ? (
          <div className="flex h-[50vh] items-center justify-center">
            <span className="loader"></span>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {data?.data?.data?.map((brand) => (
              <div 
                key={brand._id} 
                className="group bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col items-center justify-center p-6 h-64"
              >
                {/* Brand Image */}
                <div className="h-40 w-full flex items-center justify-center bg-gray-50/50 rounded-xl p-4">
                  <img 
                    src={brand.image} 
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition duration-300" 
                    alt={brand.name} 
                  />
                </div>
                {/* Brand Title */}
                <h3 className="mt-4 text-lg font-bold text-gray-805 group-hover:text-active transition duration-200">
                  {brand.name}
                </h3>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
