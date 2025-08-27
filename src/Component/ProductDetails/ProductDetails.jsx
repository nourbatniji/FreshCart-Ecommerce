import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Slider from 'react-slick';

export default function ProductDetails() {
    let { id } = useParams()


    let { data, isLoading, isError, error } = useQuery({
        queryKey: ['ProductDetails', id],
        queryFn: function () {
            return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
        }
    })

    



    function getImgSrc(e) {
        let imgSrc = e.target.getAttribute("src");
        document.getElementById("myImage").setAttribute("src", imgSrc)
    }


    let product = data?.data?.data

    return (
        <>
          {isLoading?  <div className='flex h-screen items-center justify-center bg-gray-100'><span className="loader"></span> </div>:
            <div className='mt-36 w-10/12 mx-auto'>
                <div className="flex items-center justify-center">
                    <div className="w-3/12">
                        <img src={product?.imageCover} id='myImage' alt="" />
                        <div className="flex mt-4">
                            {product?.images.map((image, i) => {
                                return <div key={i} >
                                    <img src={image} onClick={getImgSrc} alt="" />
                                </div>
                            })}
                        </div>
                        {/* <Slider dots>
                        {product?.images.map((image, i) => {
                            return <div key={i}>
                                <img src={image} className='w-full' alt="" />
                            </div>
                        })}
                    </Slider> */}


                    </div>
                    <div className="w-9/12 px-12">
                        <h3 className='text-2xl font-medium'>{product?.title}</h3>
                        <p className='text-gray-500 py-4 px-3'>{product?.description}</p>
                        <p className='font-semibold mb-1.5 text-active'>{product?.category.name}</p>
                        <div className="flex justify-between items-center">
                            <span>Price: {product?.price}EGP</span>
                            <span className='text-yellow-600'>
                                {product?.ratingsAverage}
                                <i className='fa-solid fa-star'></i></span>
                        </div>
                        <button className='w-full mt-14 cursor-pointer bg-active rounded text-white py-2'>Add to cart</button>
                    </div>
                </div>
            </div>}
        </>
    )
}


//    let [product, setProduct] = useState(null)

// function getProductDetails(id) {
//     axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
//         .then((req) => {
//             setProduct(req.data.data);
//             console.log(product);

//         }).catch((err) => {
//             console.log(err);
//         })
// }
// useEffect(() => { getProductDetails(id) }, [id])
