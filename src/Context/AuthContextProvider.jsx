import React, { createContext, useEffect, useState } from 'react'

export let AuthContext = createContext()
export default function AuthContextProvider({ children }) {
    let [token, setToken] = useState(null)

    useEffect(() => {
        if (localStorage.getItem("token")) {
            setToken(localStorage.getItem("token"))
        }
    }, [])

    return (
        <div>
            <AuthContext.Provider value={{ token, setToken }}>
                {children}
            </AuthContext.Provider>
        </div>
    )
}
