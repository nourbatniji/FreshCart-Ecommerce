import axios from 'axios'
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { AuthContext } from '../../Context/AuthContextProvider'

export default function Login() {
  let { setToken } = useContext(AuthContext)
  let [errorMessage, setErrorMessage] = useState(null)
  let navg = useNavigate()

  let initialValues = {
    email: "",
    password: ""
  }

  let validateYup = Yup.object({
    email: Yup.string().required("This field is required").email("Invalid email address"),
    password: Yup.string().required("This field is required").matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/, "Password should be at least 6 characters")
  })

  async function loginAPI(data) {
    await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin", data)
      .then((req) => {
        if (req.data.message == 'success') {
          setToken(req.data.token);
          localStorage.setItem("token", req.data.token)
          navg("/")
        }
      })
      .catch((err) => { setErrorMessage(err.response.data.message) })
  }

  let loginForm = useFormik({
    initialValues,
    onSubmit: loginAPI,
    validationSchema: validateYup
  })

  return (
    <>
      <form onSubmit={loginForm.handleSubmit} className="max-w-sm mx-auto mt-40">
        <h1 className='text-4xl font-bold mt-7 mb-6'>Login now:</h1>

        {errorMessage ? <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 " role="alert">
          <span class="font-medium">{errorMessage}</span>
        </div> : ""}

        <div className="mb-5">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Your email</label>
          <input
            onChange={loginForm.handleChange}
            onBlur={loginForm.handleBlur}
            value={loginForm.values.email}
            name='email'
            type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-active focus:border-active block w-full p-2.5 " />
          {loginForm.errors.email && loginForm.touched.email ? <p className='text-red-800'>{loginForm.errors.email}</p> : ""}
        </div>
        <div className="mb-5">
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Your password</label>
          <input
            onChange={loginForm.handleChange}
            onBlur={loginForm.handleBlur}
            value={loginForm.values.password}
            name='password'
            type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-active focus:border-active block w-full p-2.5 " />
          {loginForm.errors.password && loginForm.touched.password ? <p className='text-red-800'>{loginForm.errors.password}</p> : ""}
        </div>
        <Link to="/forgotPassword"><span className='text-blue-500 underline'>Forgot Password?</span></Link>
        <br />
        <button
          disabled={!(loginForm.isValid && loginForm.dirty)}
          type="submit" className="text-white mt-3 bg-active hover:bg-active focus:ring-4 focus:outline-none focus:ring-active font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center disabled:bg-active disabled:opacity-35">Submit</button>
      </form>

    </>)
}
