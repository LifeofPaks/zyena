import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { reviewData } from '../../data/reviewData';

const Testimonials = () => {

    var settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 0,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              dots: true,
            },
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 2,
              infinite: true,
              dots: true,
            },
          },
          {
            breakpoint: 475,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              infinite: true,
              dots: true,
            },
          },
          
        ],
    
      };

  return (
    <div className="container !mx-auto !pt-4 !pb-12">
    <div className="lg:!px-0 !px-6">
      <div className="flex !items-center gap-2 !mb-[1rem] w-full justify-center ">
        <div className="w-[80px] lg:w-[100px] h-[1px] bg-[#999898]"></div>
        <h1 className="lg:!text-[24px] !text-[18px] uppercase playfair font-[500] ">
          TESTIMONIALS
        </h1>
        <div className="w-[80px] lg:w-[100px] h-[1px] bg-[#999898]"></div>
      </div>

   <div className='reviewCarousel !mt-12'>
        <Slider {...settings}>
          {reviewData.map((data) => (
            <span className=' shadow-lg !p-4 rounded-2xl lg:h-[220px] h-[200px]' key={data.id}>
              <span className=''>
                <span className='flex items-center gap-2'>
                  <img src={data.avatar} alt="av" className='lg:w-[70px] lg:h-[70px] w-[50px] h-[50px]  object-cover rounded-full' />
                  <span className=''>
                    <h2 className='!text-[13px] lg:!text-[15px]'>{data.name}</h2>
                    <span>
                        <span></span>
                        <p className='!text-[11px] lg:!text-[13px] text-gray-500'>February 6, 2025</p>
                    </span>

                  </span>
                </span>

              </span>
              <p className='desc !text-[12px] lg:!text-[14px] !mt-1 text-gray-800'>{data.desc}</p>
            </span>
          ))}
           </Slider>
        </div>
    </div>
  </div>
  )
}

export default Testimonials