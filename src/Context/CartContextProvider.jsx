import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { createContext } from 'react'

export let CartContext = createContext()

export default function CartContextProvider({children}) {

    let headerOptions = {
        headers:{
            token:localStorage.getItem("token")
        }
    }
    const baseUrl = "https://ecommerce.routemisr.com/api/v1/cart/"


    function getUserCart(){
        return axios.get(baseUrl, headerOptions)
    }

  return (
    <div>
        <CartContext.Provider value={{getUserCart}}>{children}</CartContext.Provider>
    </div>
  )
}
