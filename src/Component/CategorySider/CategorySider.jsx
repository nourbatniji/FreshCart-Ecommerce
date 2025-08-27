import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Slider from 'react-slick'
import useApi from '../../Hooks/useApi'

export default function CategorySider() {

    // let [categoriesList, setCategoriesList] = useState(null)

    // function getAllCategories() {
    //     axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
    //         .then((req) => {
    //             console.log(req.data)
    //             setCategoriesList(req.data.data)
    //         })
    // }
    // useEffect(() => { getAllCategories() }, [])


let {data, isLoading}=   useApi("categories") 
    return (
        <>
         <Slider slidesToShow={6} autoplay speed={500} infinite slidesToScroll={6} className='my-12 bg-gray-100'>
            {data?.data?.data?.map((category)=>{
                return <div key={category._id}>
                    <img src={category.image} className='h-48 w-full object-cover object-top' alt="" />
                    <h5 className='text-center'>{category.name}</h5>
                </div>
            })}
         </Slider>
        </>
    )
}
