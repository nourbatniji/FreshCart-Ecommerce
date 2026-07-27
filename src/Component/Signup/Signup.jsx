import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'

export default function Signup() {
  let [errorMessage, setErrorMessage] = useState(null)
  let [isLoading, setIsLoading] = useState(false)
  let navg = useNavigate()

  let initialValues = {
    name: "",
    email: "",
    password: "",
    rePassword: "",
    phone: ""
  }
  
  let validYup = Yup.object({
    name: Yup.string().required("This field is required").min(3, "Min char is 3").max(20, "Max char is 20"),
    email: Yup.string().required("This field is required").email("Invalid email address"),
    password: Yup.string().required("This field is required").matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/, "Password must be 6-16 characters and contain at least one number and one special character"),
    rePassword: Yup.string().required("This field is required").oneOf([Yup.ref("password")], "Passwords do not match"),
    phone: Yup.string().required("This field is required").matches(/^01[0125][0-9]{8}$/, 'Enter a valid Egyptian phone number')
  })

  async function signupAPI(data) {
    setIsLoading(true)
    setErrorMessage(null)
    await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup", data)
      .then((req) => { 
        if (req.data.message === 'success') { 
          navg("/login") 
        } 
      })
      .catch((err) => { 
        setErrorMessage(err.response?.data?.message || "An error occurred during registration.") 
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  let signupForm = useFormik({
    initialValues,
    onSubmit: signupAPI,
    validationSchema: validYup
  })

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50/50 px-4 pt-28 pb-16">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-gray-150/40 p-8 md:p-10 transition duration-300">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Create Account</h1>
          <p className="text-gray-500 mt-2 text-sm">Join Fresh Cart to get started with your shopping</p>
        </div>

        {errorMessage && (
          <div className="p-4 mb-6 text-sm text-red-800 rounded-2xl bg-red-50 border border-red-100 flex items-center gap-2" role="alert">
            <i className="fa-solid fa-circle-exclamation text-base"></i>
            <span className="font-semibold">{errorMessage}</span>
          </div>
        )}

        <form onSubmit={signupForm.handleSubmit} className="space-y-5">
          
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-1.5">Full Name</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center ps-4 text-gray-400">
                <i className="fa-regular fa-user"></i>
              </span>
              <input
                onChange={signupForm.handleChange}
                onBlur={signupForm.handleBlur}
                value={signupForm.values.name}
                name="name"
                type="text"
                id="name"
                placeholder="John Doe"
                className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-3 ps-11 pe-4 text-gray-800 placeholder-gray-400 focus:bg-white focus:ring-2 focus:ring-active/20 focus:border-active transition outline-none shadow-sm text-sm"
              />
            </div>
            {signupForm.touched.name && signupForm.errors.name ? (
              <p className="text-red-650 text-xs mt-1 font-medium">{signupForm.errors.name}</p>
            ) : null}
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1.5">Email Address</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center ps-4 text-gray-400">
                <i className="fa-regular fa-envelope"></i>
              </span>
              <input
                onChange={signupForm.handleChange}
                onBlur={signupForm.handleBlur}
                value={signupForm.values.email}
                name="email"
                type="email"
                id="email"
                placeholder="name@example.com"
                className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-3 ps-11 pe-4 text-gray-800 placeholder-gray-400 focus:bg-white focus:ring-2 focus:ring-active/20 focus:border-active transition outline-none shadow-sm text-sm"
              />
            </div>
            {signupForm.touched.email && signupForm.errors.email ? (
              <p className="text-red-650 text-xs mt-1 font-medium">{signupForm.errors.email}</p>
            ) : null}
          </div>

          {/* Phone Field */}
          <div>
            <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-1.5">Phone Number</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center ps-4 text-gray-400">
                <i className="fa-solid fa-mobile-screen-button"></i>
              </span>
              <input
                onChange={signupForm.handleChange}
                onBlur={signupForm.handleBlur}
                value={signupForm.values.phone}
                name="phone"
                type="tel"
                id="phone"
                placeholder="01012345678"
                className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-3 ps-11 pe-4 text-gray-800 placeholder-gray-400 focus:bg-white focus:ring-2 focus:ring-active/20 focus:border-active transition outline-none shadow-sm text-sm"
              />
            </div>
            {signupForm.touched.phone && signupForm.errors.phone ? (
              <p className="text-red-650 text-xs mt-1 font-medium">{signupForm.errors.phone}</p>
            ) : null}
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-1.5">Password</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center ps-4 text-gray-400">
                <i className="fa-solid fa-lock"></i>
              </span>
              <input
                onChange={signupForm.handleChange}
                onBlur={signupForm.handleBlur}
                value={signupForm.values.password}
                name="password"
                type="password"
                id="password"
                placeholder="••••••••"
                className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-3 ps-11 pe-4 text-gray-800 placeholder-gray-400 focus:bg-white focus:ring-2 focus:ring-active/20 focus:border-active transition outline-none shadow-sm text-sm"
              />
            </div>
            {signupForm.touched.password && signupForm.errors.password ? (
              <p className="text-red-650 text-xs mt-1 font-medium leading-tight">{signupForm.errors.password}</p>
            ) : null}
          </div>

          {/* Re-password Field */}
          <div>
            <label htmlFor="rePassword" className="block text-sm font-semibold text-gray-700 mb-1.5">Confirm Password</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center ps-4 text-gray-400">
                <i className="fa-solid fa-lock-open"></i>
              </span>
              <input
                onChange={signupForm.handleChange}
                onBlur={signupForm.handleBlur}
                value={signupForm.values.rePassword}
                name="rePassword"
                type="password"
                id="rePassword"
                placeholder="••••••••"
                className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-3 ps-11 pe-4 text-gray-800 placeholder-gray-400 focus:bg-white focus:ring-2 focus:ring-active/20 focus:border-active transition outline-none shadow-sm text-sm"
              />
            </div>
            {signupForm.touched.rePassword && signupForm.errors.rePassword ? (
              <p className="text-red-650 text-xs mt-1 font-medium">{signupForm.errors.rePassword}</p>
            ) : null}
          </div>

          {/* Submit Button */}
          <button
            disabled={!(signupForm.isValid && signupForm.dirty) || isLoading}
            type="submit"
            className="w-full bg-active hover:bg-active/95 text-white font-bold py-3.5 rounded-2xl shadow-md hover:shadow-lg active:scale-98 transition duration-200 disabled:bg-active/40 disabled:shadow-none flex items-center justify-center gap-2 cursor-pointer mt-6"
          >
            {isLoading ? (
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>

        {/* Footer Link */}
        <div className="mt-8 pt-6 border-t border-gray-100 text-center">
          <p className="text-sm text-gray-550">
            Already have an account?{" "}
            <Link to="/login">
              <span className="font-bold text-active hover:underline">Sign in</span>
            </Link>
          </p>
        </div>

      </div>
    </div>
  )
}
