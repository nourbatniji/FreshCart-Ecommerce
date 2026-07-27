import axios from 'axios'
import React, { createContext, useState, useEffect } from 'react'

export let CartContext = createContext()

export default function CartContextProvider({children}) {
    let [numOfCartItems, setNumOfCartItems] = useState(0)
    let [cartId, setCartId] = useState(null)

    const baseUrl = "https://ecommerce.routemisr.com/api/v1/cart"

    function getHeaders() {
        return {
            headers: {
                token: localStorage.getItem("token")
            }
        }
    }

    function getUserCart() {
        return axios.get(baseUrl, getHeaders())
            .then((res) => {
                if (res.data) {
                    setNumOfCartItems(res.data.numOfCartItems || 0)
                    setCartId(res.data.data?._id || null)
                }
                return res
            })
    }

    function addToCart(productId) {
        return axios.post(baseUrl, { productId }, getHeaders())
            .then((res) => {
                if (res.data) {
                    setNumOfCartItems(res.data.numOfCartItems || 0)
                }
                return res
            })
    }

    function removeCartItem(productId) {
        return axios.delete(`${baseUrl}/${productId}`, getHeaders())
            .then((res) => {
                if (res.data) {
                    setNumOfCartItems(res.data.numOfCartItems || 0)
                }
                return res
            })
    }

    function updateCartItemCount(productId, count) {
        return axios.put(`${baseUrl}/${productId}`, { count }, getHeaders())
            .then((res) => {
                if (res.data) {
                    setNumOfCartItems(res.data.numOfCartItems || 0)
                }
                return res
            })
    }

    function clearCart() {
        return axios.delete(baseUrl, getHeaders())
            .then((res) => {
                setNumOfCartItems(0)
                setCartId(null)
                return res
            })
    }

    // Load initial cart details if logged in
    useEffect(() => {
        if (localStorage.getItem("token")) {
            getUserCart().catch(() => {})
        }
    }, [])

    return (
        <CartContext.Provider value={{
            numOfCartItems,
            setNumOfCartItems,
            cartId,
            getUserCart,
            addToCart,
            removeCartItem,
            updateCartItemCount,
            clearCart
        }}>
            {children}
        </CartContext.Provider>
    )
}
