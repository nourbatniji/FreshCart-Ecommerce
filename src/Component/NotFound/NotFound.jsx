import React from 'react'
import { Link } from 'react-router-dom'
import errorImg from '../../assets/images/error.svg'
import { motion } from 'framer-motion'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-slate-50/50 px-6 py-24 text-center overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-md w-full"
      >
        <motion.img
          src={errorImg}
          animate={{ y: [0, -14, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="w-80 max-w-full mx-auto object-contain mb-8"
          alt="Page Not Found"
        />
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.4 }}
          className="text-3xl font-extrabold text-gray-900 tracking-tight"
        >
          Oops! Page not found.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.4 }}
          className="text-gray-500 mt-3 text-base leading-relaxed"
        >
          We can't seem to find the page you are looking for. It might have been moved or deleted.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.4 }}
          className="mt-8"
        >
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="inline-block">
            <Link
              to="/"
              className="inline-block bg-active hover:bg-active/95 text-white font-bold px-8 py-3.5 rounded-2xl shadow-lg shadow-active/10 hover:shadow-xl transition duration-200 text-sm"
            >
              Back to Home
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  )
}
