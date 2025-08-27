import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'

export default function UpdatePassword() {
    let [errorMessage, setErrorMessage] = useState(null)
    let navg = useNavigate()
    let initialValues = {
        email: "",
        newPassword: ""
    }
    let validYup = Yup.object({
        email: Yup.string().required("This field is required").email("Invalid email address"),
        newPassword: Yup.string().required("This field is required").matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/, "Password should be at least 6 characters")
    })
    async function resetPasswordAPI(data) {
        await axios.put("https://ecommerce.routemisr.com/api/v1/auth/resetPassword", data)
            .then((req) => {
                if (req.data.token) {
                    navg("/login")
                }
            }).catch((err) => {
                setErrorMessage(err.response.data.message)
            })
    }
    let resetPasswordForm = useFormik({
        initialValues,
        onSubmit: resetPasswordAPI,
        validationSchema: validYup
    })

    return (
        <>
            <form onSubmit={resetPasswordForm.handleSubmit} className="max-w-sm mx-auto mt-40">
                <h1 className='text-4xl font-bold mt-7 mb-6'>Update Password:</h1>
                {errorMessage ? <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 " role="alert">
                    <span className="font-medium">{errorMessage}</span>
                </div> : ""}
                <div className="mb-5">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Your email</label>
                    <input
                        onChange={resetPasswordForm.handleChange}
                        onBlur={resetPasswordForm.handleBlur}
                        value={resetPasswordForm.values.email}
                        name='email' type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-active focus:border-active block w-full p-2.5" />
                    {resetPasswordForm.errors.email && resetPasswordForm.touched.email ? <p className='text-red-800'>{resetPasswordForm.errors.email}</p> : ""}
                </div>
                <div className="mb-5">
                    <label htmlFor="newPassword" className="block mb-2 text-sm font-medium text-gray-900">Your newPassword</label>
                    <input
                        onChange={resetPasswordForm.handleChange}
                        onBlur={resetPasswordForm.handleBlur}
                        value={resetPasswordForm.values.newPassword}
                        name='newPassword' type="password" id="newPassword" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-active focus:border-active block w-full p-2.5" />
                    {resetPasswordForm.errors.newPassword && resetPasswordForm.touched.newPassword ? <p className='text-red-800'>{resetPasswordForm.errors.newPassword}</p> : ""}
                </div>
                <button
                    disabled={!(resetPasswordForm.isValid && resetPasswordForm.dirty)}
                    type="submit" className="text-white mt-3 bg-active hover:bg-active focus:ring-4 focus:outline-none focus:ring-active font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center disabled:bg-active disabled:opacity-35">Submit</button>
            </form>
        </>)
}
