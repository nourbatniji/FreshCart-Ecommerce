import React, { useContext, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { CartContext } from '../../Context/CartContextProvider'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'

export default function Checkout() {
  const { cartId, setNumOfCartItems } = useContext(CartContext)
  const [paymentMethod, setPaymentMethod] = useState('stripe') // 'stripe' or 'cash'
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()

  const validationSchema = Yup.object({
    details: Yup.string().required('Shipping details are required').min(5, 'Too short'),
    phone: Yup.string().required('Phone number is required').matches(/^01[0125][0-9]{8}$/, 'Enter a valid Egyptian phone number (e.g. 01012345678)'),
    city: Yup.string().required('City is required').min(3, 'Too short')
  })

  const formik = useFormik({
    initialValues: {
      details: '',
      phone: '',
      city: ''
    },
    validationSchema,
    onSubmit: (values) => {
      if (!cartId) {
        toast.error('Your cart seems to be empty!')
        return
      }

      setIsSubmitting(true)
      const token = localStorage.getItem('token')
      const headers = { token }

      if (paymentMethod === 'stripe') {
        // Stripe payment API
        axios.post(
          `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${window.location.origin}`,
          { shippingAddress: values },
          { headers }
        )
        .then((res) => {
          if (res.data.status === 'success') {
            toast.success('Redirecting to secure Stripe payment...', { icon: '💳' })
            window.location.href = res.data.session.url
          }
        })
        .catch((err) => {
          console.error(err)
          toast.error('Payment initialization failed.')
          setIsSubmitting(false)
        })
      } else {
        // Cash payment API
        axios.post(
          `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
          { shippingAddress: values },
          { headers }
        )
        .then((res) => {
          if (res.data.status === 'success' || res.status === 201) {
            setNumOfCartItems(0) // Reset cart count
            toast.success('Order placed successfully! Cash on delivery. 🎉', {
              duration: 5000,
              style: {
                borderRadius: '10px',
                background: '#333',
                color: '#fff',
              }
            })
            navigate('/')
          }
        })
        .catch((err) => {
          console.error(err)
          toast.error('Failed to place order.')
          setIsSubmitting(false)
        })
      }
    }
  })

  return (
    <div className="mt-32 mb-20 px-4 md:px-0">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 p-6 md:p-10">
        
        <div className="border-b border-gray-100 pb-6 mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Checkout</h1>
          <p className="text-gray-500 mt-1">Please enter your shipping and payment information</p>
        </div>

        <form onSubmit={formik.handleSubmit} className="space-y-6">
          {/* Shipping Address Details */}
          <div>
            <label htmlFor="details" className="block text-sm font-semibold text-gray-750 mb-2">Shipping Address Details</label>
            <input
              id="details"
              name="details"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.details}
              placeholder="e.g. 12 Street Name, Apartment 4B"
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:bg-white focus:ring-2 focus:ring-active/20 focus:border-active transition outline-none"
            />
            {formik.touched.details && formik.errors.details ? (
              <p className="text-red-500 text-sm mt-1">{formik.errors.details}</p>
            ) : null}
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block text-sm font-semibold text-gray-750 mb-2">Contact Phone Number</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phone}
              placeholder="e.g. 01012345678"
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:bg-white focus:ring-2 focus:ring-active/20 focus:border-active transition outline-none"
            />
            {formik.touched.phone && formik.errors.phone ? (
              <p className="text-red-500 text-sm mt-1">{formik.errors.phone}</p>
            ) : null}
          </div>

          {/* City */}
          <div>
            <label htmlFor="city" className="block text-sm font-semibold text-gray-750 mb-2">City</label>
            <input
              id="city"
              name="city"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.city}
              placeholder="e.g. Cairo"
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:bg-white focus:ring-2 focus:ring-active/20 focus:border-active transition outline-none"
            />
            {formik.touched.city && formik.errors.city ? (
              <p className="text-red-500 text-sm mt-1">{formik.errors.city}</p>
            ) : null}
          </div>

          {/* Payment Method Selector */}
          <div className="pt-4 border-t border-gray-150">
            <span className="block text-sm font-bold text-gray-800 mb-4">Select Payment Method</span>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Online Payment Option */}
              <label 
                className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition ${
                  paymentMethod === 'stripe' 
                    ? 'border-active bg-active/5 text-active' 
                    : 'border-gray-200 bg-white text-gray-650 hover:bg-gray-50'
                }`}
                onClick={() => setPaymentMethod('stripe')}
              >
                <div className="flex items-center gap-3">
                  <i className="fa-solid fa-credit-card text-lg"></i>
                  <span className="font-semibold text-sm">Pay Online (Card)</span>
                </div>
                <input 
                  type="radio" 
                  name="paymentMethod" 
                  checked={paymentMethod === 'stripe'} 
                  readOnly 
                  className="accent-active w-4 h-4" 
                />
              </label>

              {/* Cash on Delivery Option */}
              <label 
                className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition ${
                  paymentMethod === 'cash' 
                    ? 'border-active bg-active/5 text-active' 
                    : 'border-gray-200 bg-white text-gray-655 hover:bg-gray-50'
                }`}
                onClick={() => setPaymentMethod('cash')}
              >
                <div className="flex items-center gap-3">
                  <i className="fa-solid fa-money-bill-wave text-lg"></i>
                  <span className="font-semibold text-sm">Cash on Delivery</span>
                </div>
                <input 
                  type="radio" 
                  name="paymentMethod" 
                  checked={paymentMethod === 'cash'} 
                  readOnly 
                  className="accent-active w-4 h-4" 
                />
              </label>
            </div>
          </div>

          {/* Action Button */}
          <button
            type="submit"
            disabled={!(formik.isValid && formik.dirty) || isSubmitting}
            className="w-full bg-active hover:bg-active/95 text-white font-bold py-4 rounded-xl shadow-lg shadow-active/20 hover:shadow-xl active:scale-98 transition duration-250 disabled:bg-active/40 disabled:shadow-none flex items-center justify-center gap-2 cursor-pointer mt-8"
          >
            {isSubmitting ? (
              <>
                <span className="animate-pulse">Processing Order...</span>
              </>
            ) : paymentMethod === 'stripe' ? (
              <>
                <i className="fa-solid fa-lock"></i> Pay with Stripe
              </>
            ) : (
              <>
                <i className="fa-solid fa-circle-check"></i> Place Cash Order
              </>
            )}
          </button>
        </form>

      </motion.div>
    </div>
  )
}
