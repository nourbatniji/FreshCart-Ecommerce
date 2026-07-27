import React, { useRef } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import useApi from '../../Hooks/useApi'
import { fadeUp, staggerContainer } from '../../utils/motion'

export default function CategorySider() {
  let { data, isLoading } = useApi("categories")
  const scrollerRef = useRef(null)

  function scrollByAmount(amount) {
    scrollerRef.current?.scrollBy({ left: amount, behavior: 'smooth' })
  }

  const categories = data?.data?.data || []

  return (
    <div>
      <div className="flex items-end justify-between mb-5">
        <div>
          <h2 className="text-xl font-extrabold text-gray-900 tracking-tight">Shop by Category</h2>
          <p className="text-gray-500 text-sm mt-0.5">Browse our most popular departments</p>
        </div>
        <div className="hidden sm:flex items-center gap-2">
          <button
            onClick={() => scrollByAmount(-280)}
            className="w-9 h-9 rounded-full border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 hover:text-active flex items-center justify-center transition cursor-pointer"
            aria-label="Scroll left"
          >
            <i className="fa-solid fa-chevron-left text-xs"></i>
          </button>
          <button
            onClick={() => scrollByAmount(280)}
            className="w-9 h-9 rounded-full border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 hover:text-active flex items-center justify-center transition cursor-pointer"
            aria-label="Scroll right"
          >
            <i className="fa-solid fa-chevron-right text-xs"></i>
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex gap-4 overflow-hidden">
          {new Array(8).fill('').map((_, i) => (
            <div key={i} className="shrink-0 w-28 sm:w-32 flex flex-col items-center gap-3">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gray-150 animate-pulse" />
              <div className="h-3 w-16 rounded bg-gray-150 animate-pulse" />
            </div>
          ))}
        </div>
      ) : (
        <motion.div
          ref={scrollerRef}
          variants={staggerContainer(0.06)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="flex gap-4 sm:gap-5 overflow-x-auto pb-2 snap-x snap-mandatory scroll-smooth [&::-webkit-scrollbar]:hidden"
        >
          {categories.map((category) => (
            <motion.div key={category._id} variants={fadeUp} className="shrink-0 snap-start">
              <Link to="/categories" className="flex flex-col items-center gap-3 group w-28 sm:w-32">
                <motion.div
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.96 }}
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden ring-1 ring-gray-150 group-hover:ring-2 group-hover:ring-active shadow-sm bg-gray-50 transition-all duration-200"
                >
                  <img
                    src={category.image}
                    className="w-full h-full object-cover"
                    alt={category.name}
                  />
                </motion.div>
                <h5 className="text-center text-sm font-semibold text-gray-700 group-hover:text-active transition duration-200 line-clamp-1 w-full">
                  {category.name}
                </h5>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  )
}
