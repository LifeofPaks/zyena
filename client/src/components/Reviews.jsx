import React, { useEffect, useState } from "react";
import { fetchAllTestimonials } from "../store/testimonial-slice";
import { useDispatch, useSelector } from "react-redux";
import { FaStar } from 'react-icons/fa';
import dayjs from 'dayjs';

const Reviews = () => {
  const dispatch = useDispatch();
  const { testimonialList } = useSelector((state) => state.testimonials);
  const [visibleTestimonials, setVisibleTestimonials] = useState(5);

  console.log("testimonialList, :", testimonialList);

  useEffect(() => {
    dispatch(fetchAllTestimonials());
  }, [dispatch]);

  const showMoreTestimonials = () => {
    setVisibleTestimonials((prev) => prev + 5);
  };

  const showLessTestimonials = () => {
    setVisibleTestimonials(5);
  };

  return (
    <div className="max-w-[800px] !mx-auto !px-8 !pt-4">
      <div className="w-full text-center !mb-12">
        <h1 className=" uppercase font-semibold tracking-wider text-[14px] pb-3">
          Testimonials
        </h1>
      </div>

      <div>
        {testimonialList?.slice(0, visibleTestimonials).map((testimonial) => (
          <div key={testimonial._id} className="!mb-4 border-b border-gray-300 !pb-4">
            <h3 className="font-semibold !text-[14px] !mb-1 !capitalize">{testimonial.title}</h3>
            <div className="flex items-center gap-2 mt-1">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} color={i < testimonial.rating ? '#d3a202' : '#ccc'} />
                ))}
              </div>
              <span className="italic text-[12px] text-gray-600">
                {dayjs(testimonial.createdAt).format('MMMM D, YYYY')}
              </span>
            </div>
            <p className="text-[14px] !mt-2 capitalize">{testimonial.message}</p>
            <p className="text-[13px] !mt-1 capitalize">- {testimonial.name}</p>
          </div>
        ))}
      </div>

      <div className="text-center mt-4">
        {visibleTestimonials < testimonialList?.length ? (
          <button 
            onClick={showMoreTestimonials} 
            className="!text-[13px] font-semibold">
            Show More...
          </button>
        ) : (
          <button 
            onClick={showLessTestimonials} 
            className="!text-[13px] font-semibold">
            Show Less...
          </button>
        )}
      </div>

    </div>
  );
};

export default Reviews;
