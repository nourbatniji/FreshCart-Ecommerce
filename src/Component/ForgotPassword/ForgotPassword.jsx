import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'

export default function ForgotPassword() {
  let [errorMessage, setErrorMessage] = useState(null)
  let [formDisplay, setFormDisplay] = useState(true)
  let [isLoading, setIsLoading] = useState(false)
  let navg = useNavigate()

  let initialValues = {
    email: ""
  }

  let validateYup = Yup.object({
    email: Yup.string().required("This field is required").email("Invalid email address"),
  })

  async function forgotPasswordAPI(data) {
    setIsLoading(true)
    setErrorMessage(null)
    await axios.post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords", data)
      .then((req) => {
        if (req.data.statusMsg === 'success') {
          setFormDisplay(false)
        }
      })
      .catch((err) => {
        setErrorMessage(err.response?.data?.message || "Verification request failed.")
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  let forgotPasswordForm = useFormik({
    initialValues,
    onSubmit: forgotPasswordAPI,
    validationSchema: validateYup
  })

  let validateYup2 = Yup.object({
    resetCode: Yup.string().required("This field is required")
  })

  async function resetCodeAPI(data) {
    setIsLoading(true)
    setErrorMessage(null)
    await axios.post("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode", data)
      .then((reqq) => {
        if (reqq.data.status === "Success") {
          navg("/updatePassword")
        }
      })
      .catch((err) => {
        setErrorMessage(err.response?.data?.message || "Invalid reset code.")
      })
      .finally(() => {
        setIsLoading(false)
      })
  }
  let resetCodeForm = useFormik({
    initialValues: { resetCode: "" },
    onSubmit: resetCodeAPI,
    validationSchema: validateYup2
  })

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50/50 px-4 pt-28 pb-16">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-gray-150/40 p-8 md:p-10 transition duration-300">
        
        {formDisplay ? (
          <div>
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Forgot Password</h1>
              <p className="text-gray-500 mt-2 text-sm">Enter your email and we'll send you a verification code</p>
            </div>

            {errorMessage && (
              <div className="p-4 mb-6 text-sm text-red-800 rounded-2xl bg-red-50 border border-red-100 flex items-center gap-2" role="alert">
                <i className="fa-solid fa-circle-exclamation text-base"></i>
                <span className="font-semibold">{errorMessage}</span>
              </div>
            )}

            <form onSubmit={forgotPasswordForm.handleSubmit} className="space-y-6">
              {/* Email field */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center ps-4 text-gray-400">
                    <i className="fa-regular fa-envelope"></i>
                  </span>
                  <input
                    onChange={forgotPasswordForm.handleChange}
                    onBlur={forgotPasswordForm.handleBlur}
                    value={forgotPasswordForm.values.email}
                    name="email"
                    type="email"
                    id="email"
                    placeholder="name@example.com"
                    className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-3.5 ps-11 pe-4 text-gray-800 placeholder-gray-400 focus:bg-white focus:ring-2 focus:ring-active/20 focus:border-active transition outline-none shadow-sm"
                  />
                </div>
                {forgotPasswordForm.errors.email && forgotPasswordForm.touched.email ? (
                  <p className="text-red-655 text-xs mt-1.5 font-medium flex items-center gap-1">
                    <i className="fa-solid fa-circle-info"></i> {forgotPasswordForm.errors.email}
                  </p>
                ) : null}
              </div>

              {/* Submit Button */}
              <button
                disabled={!(forgotPasswordForm.isValid && forgotPasswordForm.dirty) || isLoading}
                type="submit"
                className="w-full bg-active hover:bg-active/95 text-white font-bold py-3.5 rounded-2xl shadow-md hover:shadow-lg active:scale-98 transition duration-200 disabled:bg-active/40 disabled:shadow-none flex items-center justify-center gap-2 cursor-pointer"
              >
                {isLoading ? (
                  <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                ) : (
                  "Send Code"
                )}
              </button>
            </form>
          </div>
        ) : (
          <div>
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Enter Reset Code</h1>
              <p className="text-gray-500 mt-2 text-sm">Please check your email inbox and enter the reset code below</p>
            </div>

            {errorMessage && (
              <div className="p-4 mb-6 text-sm text-red-800 rounded-2xl bg-red-50 border border-red-100 flex items-center gap-2" role="alert">
                <i className="fa-solid fa-circle-exclamation text-base"></i>
                <span className="font-semibold">{errorMessage}</span>
              </div>
            )}

            <form onSubmit={resetCodeForm.handleSubmit} className="space-y-6">
              {/* Reset Code Field */}
              <div>
                <label htmlFor="resetCode" className="block text-sm font-semibold text-gray-700 mb-2">Reset Code</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center ps-4 text-gray-400">
                    <i className="fa-solid fa-key text-sm"></i>
                  </span>
                  <input
                    onChange={resetCodeForm.handleChange}
                    onBlur={resetCodeForm.handleBlur}
                    value={resetCodeForm.values.resetCode}
                    name="resetCode"
                    type="text"
                    id="resetCode"
                    placeholder="Enter reset code"
                    className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-3.5 ps-11 pe-4 text-gray-800 placeholder-gray-450 focus:bg-white focus:ring-2 focus:ring-active/20 focus:border-active transition outline-none shadow-sm"
                  />
                </div>
                {resetCodeForm.errors.resetCode && resetCodeForm.touched.resetCode ? (
                  <p className="text-red-655 text-xs mt-1.5 font-medium flex items-center gap-1">
                    <i className="fa-solid fa-circle-info"></i> {resetCodeForm.errors.resetCode}
                  </p>
                ) : null}
              </div>

              {/* Submit Button */}
              <button
                disabled={!(resetCodeForm.isValid && resetCodeForm.dirty) || isLoading}
                type="submit"
                className="w-full bg-active hover:bg-active/95 text-white font-bold py-3.5 rounded-2xl shadow-md hover:shadow-lg active:scale-98 transition duration-200 disabled:bg-active/40 disabled:shadow-none flex items-center justify-center gap-2 cursor-pointer"
              >
                {isLoading ? (
                  <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                ) : (
                  "Verify Code"
                )}
              </button>
            </form>
          </div>
        )}

        {/* Back Link */}
        <div className="mt-8 pt-6 border-t border-gray-100 text-center">
          <Link to="/login">
            <span className="font-bold text-active hover:underline text-sm flex items-center justify-center gap-1.5">
              <i className="fa-solid fa-arrow-left text-xs"></i> Back to Login
            </span>
          </Link>
        </div>

      </div>
    </div>
  )
}
