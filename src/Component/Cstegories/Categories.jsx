import React from 'react'
import useApi from '../../Hooks/useApi'
import { motion } from 'framer-motion'
import { fadeUp, staggerContainer } from '../../utils/motion'

export default function Categories() {
  let { data, isLoading, isError } = useApi("categories")

  return (
    <div className="mt-32 mb-20 px-4 md:px-0">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Browse Categories</h1>
          <p className="text-gray-500 mt-2 text-lg font-medium">Explore products by their categories</p>
        </motion.div>

        {isError ? (
          <div className="text-center py-16 text-red-500 font-semibold">Failed to load categories. Please try again.</div>
        ) : isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {new Array(6).fill('').map((_, i) => (
              <div key={i} className="rounded-2xl border border-gray-100 overflow-hidden h-[380px] flex flex-col">
                <div className="h-72 bg-gray-150 animate-pulse" />
                <div className="p-5 flex-1 flex items-center justify-center">
                  <div className="h-5 w-32 rounded bg-gray-150 animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <motion.div
            variants={staggerContainer(0.06)}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
          >
            {data?.data?.data.map((category) => (
              <motion.div
                key={category._id}
                variants={fadeUp}
                whileHover={{ y: -4 }}
                className="group bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 flex flex-col h-[380px]"
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
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  )
}
