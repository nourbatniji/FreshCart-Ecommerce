import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { motion } from 'framer-motion'

export default function UpdatePassword() {
  let [errorMessage, setErrorMessage] = useState(null)
  let [isLoading, setIsLoading] = useState(false)
  let navg = useNavigate()
  
  let initialValues = {
    email: "",
    newPassword: ""
  }
  
  let validYup = Yup.object({
    email: Yup.string().required("This field is required").email("Invalid email address"),
    newPassword: Yup.string().required("This field is required").matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/, "Password must be 6-16 characters and contain at least one number and one special character")
  })

  async function resetPasswordAPI(data) {
    setIsLoading(true)
    setErrorMessage(null)
    await axios.put("https://ecommerce.routemisr.com/api/v1/auth/resetPassword", data)
      .then((req) => {
        if (req.data.token) {
          navg("/login")
        }
      }).catch((err) => {
        setErrorMessage(err.response?.data?.message || "Password update failed.")
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  let resetPasswordForm = useFormik({
    initialValues,
    onSubmit: resetPasswordAPI,
    validationSchema: validYup
  })

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50/50 px-4 pt-28 pb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-gray-150/40 p-8 md:p-10 transition duration-300">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">New Password</h1>
          <p className="text-gray-500 mt-2 text-sm">Please set your new password below</p>
        </div>

        {errorMessage && (
          <div className="p-4 mb-6 text-sm text-red-800 rounded-2xl bg-red-50 border border-red-100 flex items-center gap-2" role="alert">
            <i className="fa-solid fa-circle-exclamation text-base"></i>
            <span className="font-semibold">{errorMessage}</span>
          </div>
        )}

        <form onSubmit={resetPasswordForm.handleSubmit} className="space-y-6">
          {/* Email field */}
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center ps-4 text-gray-400">
                <i className="fa-regular fa-envelope"></i>
              </span>
              <input
                onChange={resetPasswordForm.handleChange}
                onBlur={resetPasswordForm.handleBlur}
                value={resetPasswordForm.values.email}
                name="email"
                type="email"
                id="email"
                placeholder="name@example.com"
                className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-3.5 ps-11 pe-4 text-gray-800 placeholder-gray-400 focus:bg-white focus:ring-2 focus:ring-active/20 focus:border-active transition outline-none shadow-sm"
              />
            </div>
            {resetPasswordForm.errors.email && resetPasswordForm.touched.email ? (
              <p className="text-red-655 text-xs mt-1.5 font-medium flex items-center gap-1">
                <i className="fa-solid fa-circle-info"></i> {resetPasswordForm.errors.email}
              </p>
            ) : null}
          </div>

          {/* New Password field */}
          <div>
            <label htmlFor="newPassword" className="block text-sm font-semibold text-gray-700 mb-2">New Password</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center ps-4 text-gray-400">
                <i className="fa-solid fa-lock"></i>
              </span>
              <input
                onChange={resetPasswordForm.handleChange}
                onBlur={resetPasswordForm.handleBlur}
                value={resetPasswordForm.values.newPassword}
                name="newPassword"
                type="password"
                id="newPassword"
                placeholder="••••••••"
                className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-3.5 ps-11 pe-4 text-gray-800 placeholder-gray-450 focus:bg-white focus:ring-2 focus:ring-active/20 focus:border-active transition outline-none shadow-sm"
              />
            </div>
            {resetPasswordForm.errors.newPassword && resetPasswordForm.touched.newPassword ? (
              <p className="text-red-655 text-xs mt-1.5 font-medium flex items-center gap-1">
                <i className="fa-solid fa-circle-info"></i> {resetPasswordForm.errors.newPassword}
              </p>
            ) : null}
          </div>

          {/* Submit Button */}
          <button
            disabled={!(resetPasswordForm.isValid && resetPasswordForm.dirty) || isLoading}
            type="submit"
            className="w-full bg-active hover:bg-active/95 text-white font-bold py-3.5 rounded-2xl shadow-md hover:shadow-lg active:scale-98 transition duration-200 disabled:bg-active/40 disabled:shadow-none flex items-center justify-center gap-2 cursor-pointer"
          >
            {isLoading ? (
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            ) : (
              "Update Password"
            )}
          </button>
        </form>

        {/* Back Link */}
        <div className="mt-8 pt-6 border-t border-gray-100 text-center">
          <Link to="/login">
            <span className="font-bold text-active hover:underline text-sm flex items-center justify-center gap-1.5">
              <i className="fa-solid fa-arrow-left text-xs"></i> Back to Login
            </span>
          </Link>
        </div>

      </motion.div>
    </div>
  )
}
