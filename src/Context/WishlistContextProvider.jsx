import axios from 'axios'
import React, { createContext, useState, useEffect } from 'react'

export let WishlistContext = createContext()

export default function WishlistContextProvider({ children }) {
    let [wishlistIds, setWishlistIds] = useState([])
    let [wishlistCount, setWishlistCount] = useState(0)

    const baseUrl = "https://ecommerce.routemisr.com/api/v1/wishlist"

    function getHeaders() {
        return {
            headers: {
                token: localStorage.getItem("token")
            }
        }
    }

    function getWishlist() {
        return axios.get(baseUrl, getHeaders())
            .then((res) => {
                if (res.data) {
                    const ids = res.data.data.map(item => item._id || item.id)
                    setWishlistIds(ids)
                    setWishlistCount(res.data.count || 0)
                }
                return res
            })
    }

    function addToWishlist(productId) {
        return axios.post(baseUrl, { productId }, getHeaders())
            .then((res) => {
                if (res.data) {
                    setWishlistIds(res.data.data || [])
                    setWishlistCount(res.data.data?.length || 0)
                }
                return res
            })
    }

    function removeFromWishlist(productId) {
        return axios.delete(`${baseUrl}/${productId}`, getHeaders())
            .then((res) => {
                if (res.data) {
                    setWishlistIds(res.data.data || [])
                    setWishlistCount(res.data.data?.length || 0)
                }
                return res
            })
    }

    // Load initial wishlist details if logged in
    useEffect(() => {
        if (localStorage.getItem("token")) {
            getWishlist().catch(() => {})
        }
    }, [])

    return (
        <WishlistContext.Provider value={{
            wishlistIds,
            wishlistCount,
            getWishlist,
            addToWishlist,
            removeFromWishlist
        }}>
            {children}
        </WishlistContext.Provider>
    )
}
