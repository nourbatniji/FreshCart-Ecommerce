import React from 'react'
import img1 from '../../assets/images/amazon-pay.png'
import img2 from '../../assets/images/american-express.png'
import img3 from '../../assets/images/masterCard2.png'
import img4 from '../../assets/images/paypal.png'
import img5 from '../../assets/images/App-Store.png'
import img6 from '../../assets/images/googlePlay.png'
import { motion } from 'framer-motion'
import { fadeUp } from '../../utils/motion'

export default function Footer() {
  return (
    <motion.footer
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={fadeUp}
      className="bg-slate-50 border-t border-slate-100 py-16 mt-16 transition duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">

        {/* App promotion section */}
        <div className="mb-10">
          <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">Get the FreshCart app</h2>
          <p className="text-gray-500 mt-2 text-sm md:text-base">We will send you a link, open it on your phone to download the app.</p>

          <div className="flex flex-col sm:flex-row gap-4 mt-6 max-w-3xl">
            <input
              className="flex-1 bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-active/20 focus:border-active transition shadow-sm"
              type="email"
              placeholder="Enter your email address"
            />
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="bg-active hover:bg-active/95 text-white font-bold px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition duration-200 text-sm cursor-pointer"
            >
              Share App Link
            </motion.button>
          </div>
        </div>

        {/* Partners & Stores Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 py-8 border-y border-slate-200/60 my-10">

          {/* Payment Partners */}
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-sm font-semibold text-gray-700">Payment Partners</span>
            <div className="flex items-center gap-3">
              <img src={img1} className="h-6 object-contain" alt="Amazon Pay" />
              <img src={img2} className="h-6 object-contain" alt="American Express" />
              <img src={img3} className="h-5 object-contain" alt="MasterCard" />
              <img src={img4} className="h-6 object-contain" alt="PayPal" />
            </div>
          </div>

          {/* Download Stores */}
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-sm font-semibold text-gray-700">Get deliveries with FreshCart</span>
            <div className="flex items-center gap-3">
              <img src={img5} className="h-9 object-contain cursor-pointer hover:opacity-90 transition" alt="App Store" />
              <img src={img6} className="h-9 object-contain cursor-pointer hover:opacity-90 transition" alt="Google Play" />
            </div>
          </div>

        </div>

        {/* Copyright */}
        <div className="text-center lg:text-left text-xs text-gray-400">
          <p>© {new Date().getFullYear()} FreshCart E-Commerce. All rights reserved.</p>
        </div>

      </div>
    </motion.footer>
  )
}
