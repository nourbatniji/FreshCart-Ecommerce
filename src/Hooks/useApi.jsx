import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { useState } from 'react'

export default function useApi(endPoint) {

    let req = useQuery({
        queryKey:[endPoint],
        queryFn: function(){
            return axios.get(`https://ecommerce.routemisr.com/api/v1/${endPoint}`)
        }
    })
  return req
}

//let hamada = useApi() //بكدة حمادة هيستلم اللي راجع من اليوز اي بي اي

// useApi("products")
// useApi("cart")