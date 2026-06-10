import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'

export default function ForgotPassword() {
  let [errorMessage, setErrorMessage] = useState(null)
  let [formDisplay, setFormDisplay] = useState(true)
  let navg = useNavigate()

  let initialValues = {
    email: ""
  }

  let validateYup = Yup.object({
    email: Yup.string().required("This field is required").email("Invalid email address"),
  })

  async function forgotPasswordAPI(data) {
    await axios.post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords", data)
      .then((req) => {
        if (req.data.statusMsg == 'success') {
          setFormDisplay(false)
        }
      })
      .catch((err) => {
        setErrorMessage(err.response.data.message);
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
    await axios.post("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode", data)
      .then((reqq) => {
        if (reqq.data.status == "Success") {
          navg("/updatePassword")
        }
      })
      .catch((err) => {
        setErrorMessage(err.response.data.message);
      })
  }
  let resetCodeForm = useFormik({
    initialValues: { resetCode: "" },
    onSubmit: resetCodeAPI,
    validationSchema: validateYup2
  })

  return (
    <>
      {formDisplay ? <form onSubmit={forgotPasswordForm.handleSubmit} className="max-w-sm mx-auto mt-40">
        <h1 className='text-4xl font-bold mt-7 mb-6'>Reset Password:</h1>

        {errorMessage ? <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 " role="alert">
          <span className="font-medium">{errorMessage}</span>
        </div> : ""}
        <div className="mb-5">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Your email</label>
          <input
            onChange={forgotPasswordForm.handleChange}
            onBlur={forgotPasswordForm.handleBlur}
            value={forgotPasswordForm.values.email}
            name='email'
            type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-active focus:border-active block w-full p-2.5 " />
          {forgotPasswordForm.errors.email && forgotPasswordForm.touched.email ? <p className='text-red-800'>{forgotPasswordForm.errors.email}</p> : ""}
        </div>
        <button
          disabled={!(forgotPasswordForm.isValid && forgotPasswordForm.dirty)}
          type="submit" className="text-white mt-3 bg-active hover:bg-active focus:ring-4 focus:outline-none focus:ring-active font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center disabled:bg-active disabled:opacity-35">Submit</button>
      </form> :
        <form onSubmit={resetCodeForm.handleSubmit} className="max-w-sm mx-auto mt-40">
          <h1 className='text-4xl font-bold mt-7 mb-6'>type your resetcode:</h1>

          {errorMessage ? <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 " role="alert">
            <span class="font-medium">{errorMessage}</span>
          </div> : ""}

          <div className="mb-5">
            <label htmlFor="resetCode" className="block mb-2 text-sm font-medium text-gray-900">Your resetCode</label>
            <input
              onChange={resetCodeForm.handleChange}
              onBlur={resetCodeForm.handleBlur}
              value={resetCodeForm.values.resetCode}
              name='resetCode'
              type="string" id="resetCode" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-active focus:border-active block w-full p-2.5 " />
            {resetCodeForm.errors.resetCode && resetCodeForm.touched.resetCode ? <p className='text-red-800'>{resetCodeForm.errors.resetCode}</p> : ""}
          </div>
          <button
            disabled={!(resetCodeForm.isValid && resetCodeForm.dirty)}
            type="submit" className="text-white mt-3 bg-active hover:bg-active focus:ring-4 focus:outline-none focus:ring-active font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center disabled:bg-active disabled:opacity-35">Submit</button>
        </form>
      }


    </>)
}
