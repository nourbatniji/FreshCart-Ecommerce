import React, { Suspense } from 'react'
import Navbar from '../Navbar/Navbar'
import { Outlet, useLocation } from 'react-router-dom'
import Footer from '../Footer/Footer'
import { AnimatePresence, motion } from 'framer-motion'
import ScrollToTop, { RouteScrollReset } from '../ScrollToTop/ScrollToTop'
import { pageTransition } from '../../utils/motion'

function RouteFallback() {
  return (
    <div className="flex h-screen items-center justify-center">
      <span className="loader"></span>
    </div>
  )
}

export default function Layout() {
  const location = useLocation()

  return (
    <div>
      <Navbar />
      <RouteScrollReset />
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={pageTransition}
        >
          <Suspense fallback={<RouteFallback />}>
            <Outlet />
          </Suspense>
        </motion.div>
      </AnimatePresence>
      <Footer />
      <ScrollToTop />
    </div>
  )
}
