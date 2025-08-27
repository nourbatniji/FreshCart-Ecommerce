import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'

export default function Signup() {
  let [errorMessage, setErrorMessage] = useState(null)
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
    password: Yup.string().required("This field is required").matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/, "Password should be at least 6 characters"),
    rePassword: Yup.string().required("This field is required").oneOf([Yup.ref("password")], "Passwords do not match"),
    phone: Yup.string().required("This field is required")
  })
  async function signupAPI(data) {
    await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup", data)
      .then((req) => { if (req.data.message == 'success') { navg("/login") } })
      .catch((err) => { setErrorMessage(err.response.data.message) })
  }
  let signupForm = useFormik({
    initialValues,
    onSubmit: signupAPI,
    validationSchema: validYup
  })


  return (
    <>
      <form className="max-w-sm mx-auto mt-40" onSubmit={signupForm.handleSubmit}>
        <h1 className='text-4xl font-bold mt-7 mb-6'>Register now:</h1>
        {errorMessage ? <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
          <span class="font-medium">{errorMessage}</span>
        </div> : ""}
        <div className="mb-5">
          <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 ">Your name</label>
          <input
            onChange={signupForm.handleChange}
            onBlur={signupForm.handleBlur}
            value={signupForm.values.name}
            name='name'
            type="text"
            id="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-active focus:border-active block w-full p-2.5 " />
          {signupForm.touched.name && signupForm.errors.name ? <p className='text-red-800'>{signupForm.errors.name}</p> : ""}
        </div>

        <div className="mb-5">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">Your email</label>
          <input
            onChange={signupForm.handleChange}
            onBlur={signupForm.handleBlur}
            value={signupForm.values.email}
            name='email'
            type="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-active focus:border-active block w-full p-2.5 " />
          {signupForm.touched.email && signupForm.errors.email ? <p className='text-red-800'>{signupForm.errors.email}</p> : ""}
        </div>

        <div className="mb-5">
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">Your password</label>
          <input
            onChange={signupForm.handleChange}
            onBlur={signupForm.handleBlur}
            value={signupForm.values.password}
            name='password'
            type="password"
            id="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-active focus:border-active block w-full p-2.5 " />
          {signupForm.touched.password && signupForm.errors.password ? <p className='text-red-800'>{signupForm.errors.password}</p> : ""}
        </div>

        <div className="mb-5">
          <label htmlFor="rePassword" className="block mb-2 text-sm font-medium text-gray-900 ">Your rePassword</label>
          <input
            onChange={signupForm.handleChange}
            onBlur={signupForm.handleBlur}
            value={signupForm.values.rePassword}
            name='rePassword'
            type="password"
            id="rePassword"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-active focus:border-active block w-full p-2.5 " />
          {signupForm.touched.rePassword && signupForm.errors.rePassword ? <p className='text-red-800'>{signupForm.errors.rePassword}</p> : ""}
        </div>

        <div className="mb-5">
          <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 ">Your phone</label>
          <input
            onChange={signupForm.handleChange}
            onBlur={signupForm.handleBlur}
            value={signupForm.values.phone}
            name='phone'
            type="text"
            id="phone"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-active focus:border-active block w-full p-2.5 " />
          {signupForm.touched.phone && signupForm.errors.phone ? <p className='text-red-800'>{signupForm.errors.phone}</p> : ""}
        </div>

        <button
          disabled={!(signupForm.isValid && signupForm.dirty)}
          type="submit" className="text-white bg-active hover:bg-active focus:ring-4 focus:outline-none focus:ring-active font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center disabled:bg-active disabled:opacity-35">Submit</button>
      </form>


    </>
  )
}
