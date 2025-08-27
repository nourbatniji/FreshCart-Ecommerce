import React from "react";
import Slider from "react-slick";
import image1 from "../../assets/images/slider-image-1.jpeg"
import image2 from "../../assets/images/slider-image-2.jpeg"
import image3 from "../../assets/images/slider-image-3.jpeg"

export default function MainSlider() {
    var settings = {
        dots: false,
        infinite: true,
        autoplay: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false
    };
    return (
        <div className="w-full flex mt-24 mb-10">
            <div className="w-9/12">
                <Slider {...settings}>
                    <div>
                        <h3><img src={image1} alt="" className="w-full h-96 object-cover" /></h3>
                    </div>
                    <div>
                        <h3><img src={image2} alt="" className="w-full h-96 object-cover" /></h3>
                    </div>
                    <div>
                        <h3><img src={image3} alt="" className="w-full h-96 object-cover" /></h3>
                    </div>
                </Slider>
            </div>
            <div className="w-3/12">
                <img src={image1} className="w-full h-48" alt="" />
                <img src={image2} className="w-full h-48" alt="" />
            </div>
        </div>
    );
}