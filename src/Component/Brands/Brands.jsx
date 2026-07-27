import React from 'react'
import useApi from '../../Hooks/useApi'
import { motion } from 'framer-motion'
import { fadeUp, staggerContainer } from '../../utils/motion'

export default function Brands() {
  let { data, isLoading, isError } = useApi("brands")

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
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Our Brands</h1>
          <p className="text-gray-500 mt-2 text-lg font-medium">Shop authentic products from top-tier brands</p>
        </motion.div>

        {isError ? (
          <div className="text-center py-16 text-red-500 font-semibold">Failed to load brands. Please try again.</div>
        ) : isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {new Array(8).fill('').map((_, i) => (
              <div key={i} className="rounded-2xl border border-gray-100 h-64 p-6 flex flex-col items-center justify-center gap-4">
                <div className="h-40 w-full rounded-xl bg-gray-150 animate-pulse" />
                <div className="h-4 w-24 rounded bg-gray-150 animate-pulse" />
              </div>
            ))}
          </div>
        ) : (
          <motion.div
            variants={staggerContainer(0.05)}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          >
            {data?.data?.data?.map((brand) => (
              <motion.div
                key={brand._id}
                variants={fadeUp}
                whileHover={{ y: -4 }}
                className="group bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 flex flex-col items-center justify-center p-6 h-64"
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
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  )
}
