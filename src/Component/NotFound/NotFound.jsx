import React from 'react'
import { Link } from 'react-router-dom'
import errorImg from '../../assets/images/error.svg'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-slate-50/50 px-6 py-24 text-center">
      <div className="max-w-md w-full">
        <img 
          src={errorImg} 
          className="w-80 max-w-full mx-auto object-contain mb-8 animate-pulse duration-[3000ms]" 
          alt="Page Not Found" 
        />
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Oops! Page not found.</h1>
        <p className="text-gray-500 mt-3 text-base leading-relaxed">
          We can't seem to find the page you are looking for. It might have been moved or deleted.
        </p>
        <div className="mt-8">
          <Link 
            to="/" 
            className="inline-block bg-active hover:bg-active/95 text-white font-bold px-8 py-3.5 rounded-2xl shadow-lg shadow-active/10 hover:shadow-xl active:scale-98 transition duration-200 text-sm"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
