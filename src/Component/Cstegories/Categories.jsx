import React from 'react'
import useApi from '../../Hooks/useApi'

export default function Categories() {
  let { data, isLoading, isError } = useApi("categories")

  return (
    <div className="mt-32 mb-20 px-4 md:px-0">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Browse Categories</h1>
          <p className="text-gray-500 mt-2 text-lg font-medium">Explore products by their categories</p>
        </div>

        {isLoading || isError ? (
          <div className="flex h-[50vh] items-center justify-center">
            <span className="loader"></span>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {data?.data?.data.map((category) => (
              <div 
                key={category._id} 
                className="group bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-[380px]"
              >
                {/* Image Container */}
                <div className="overflow-hidden h-72 w-full bg-gray-55 flex items-center justify-center">
                  <img 
                    src={category.image} 
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition duration-550" 
                    alt={category.name} 
                  />
                </div>
                {/* Label */}
                <div className="p-5 flex-1 flex items-center justify-center border-t border-gray-50">
                  <h3 className="text-xl font-bold text-gray-800 group-hover:text-active transition duration-200">
                    {category.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}