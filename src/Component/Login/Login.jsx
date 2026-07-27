import axios from 'axios'
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { AuthContext } from '../../Context/AuthContextProvider'

export default function Login() {
  let { setToken } = useContext(AuthContext)
  let [errorMessage, setErrorMessage] = useState(null)
  let [isLoading, setIsLoading] = useState(false)
  let navg = useNavigate()

  let initialValues = {
    email: "",
    password: ""
  }

  let validateYup = Yup.object({
    email: Yup.string().required("This field is required").email("Invalid email address"),
    password: Yup.string().required("This field is required").min(6, "Password must be at least 6 characters")
  })

  async function loginAPI(data) {
    setIsLoading(true)
    setErrorMessage(null)
    await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin", data)
      .then((req) => {
        if (req.data.message === 'success') {
          setToken(req.data.token)
          localStorage.setItem("token", req.data.token)
          navg("/")
        }
      })
      .catch((err) => {
        setErrorMessage(err.response?.data?.message || "An error occurred. Please try again.")
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  let loginForm = useFormik({
    initialValues,
    onSubmit: loginAPI,
    validationSchema: validateYup
  })

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50/50 px-4 pt-28 pb-16">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-gray-150/40 p-8 md:p-10 transition duration-300">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Welcome Back</h1>
          <p className="text-gray-500 mt-2 text-sm">Sign in to continue to your Fresh Cart account</p>
        </div>

        {errorMessage && (
          <div className="p-4 mb-6 text-sm text-red-800 rounded-2xl bg-red-50 border border-red-100 flex items-center gap-2" role="alert">
            <i className="fa-solid fa-circle-exclamation text-base"></i>
            <span className="font-semibold">{errorMessage}</span>
          </div>
        )}

        <form onSubmit={loginForm.handleSubmit} className="space-y-6">
          {/* Email field */}
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center ps-4 text-gray-400">
                <i className="fa-regular fa-envelope"></i>
              </span>
              <input
                onChange={loginForm.handleChange}
                onBlur={loginForm.handleBlur}
                value={loginForm.values.email}
                name="email"
                type="email"
                id="email"
                placeholder="name@example.com"
                className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-3.5 ps-11 pe-4 text-gray-800 placeholder-gray-400 focus:bg-white focus:ring-2 focus:ring-active/20 focus:border-active transition outline-none shadow-sm"
              />
            </div>
            {loginForm.errors.email && loginForm.touched.email ? (
              <p className="text-red-600 text-xs mt-1.5 font-medium flex items-center gap-1">
                <i className="fa-solid fa-circle-info"></i> {loginForm.errors.email}
              </p>
            ) : null}
          </div>

          {/* Password field */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700">Password</label>
              <Link to="/forgotPassword">
                <span className="text-xs font-semibold text-active hover:underline">Forgot Password?</span>
              </Link>
            </div>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center ps-4 text-gray-400">
                <i className="fa-solid fa-lock"></i>
              </span>
              <input
                onChange={loginForm.handleChange}
                onBlur={loginForm.handleBlur}
                value={loginForm.values.password}
                name="password"
                type="password"
                id="password"
                placeholder="••••••••"
                className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-3.5 ps-11 pe-4 text-gray-800 placeholder-gray-400 focus:bg-white focus:ring-2 focus:ring-active/20 focus:border-active transition outline-none shadow-sm"
              />
            </div>
            {loginForm.errors.password && loginForm.touched.password ? (
              <p className="text-red-600 text-xs mt-1.5 font-medium flex items-center gap-1">
                <i className="fa-solid fa-circle-info"></i> {loginForm.errors.password}
              </p>
            ) : null}
          </div>

          {/* Submit Button */}
          <button
            disabled={!(loginForm.isValid && loginForm.dirty) || isLoading}
            type="submit"
            className="w-full bg-active hover:bg-active/95 text-white font-bold py-3.5 rounded-2xl shadow-md hover:shadow-lg active:scale-98 transition duration-200 disabled:bg-active/40 disabled:shadow-none flex items-center justify-center gap-2 cursor-pointer"
          >
            {isLoading ? (
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        {/* Footer Link */}
        <div className="mt-8 pt-6 border-t border-gray-100 text-center">
          <p className="text-sm text-gray-550">
            Don't have an account?{" "}
            <Link to="/signup">
              <span className="font-bold text-active hover:underline">Sign up now</span>
            </Link>
          </p>
        </div>

      </div>
    </div>
  )
}
