import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteTestimonial,
  fetchAllTestimonials,
} from "../../store/testimonial-slice";
import TestimonialsTable from "../../components/admin/TestimonialsTable";
import { notifySuccess } from "../../hooks/toastify";

const TestimonialList = () => {
  const dispatch = useDispatch();
  const { testimonialList } = useSelector((state) => state.testimonials);

   function handleDelete(getCurrentTestimonialId) {
      dispatch(deleteTestimonial(getCurrentTestimonialId)).then((data) => {
        if (data?.payload?.success) {
          dispatch(fetchAllTestimonials());
          notifySuccess("Testimonial deleted successfully!");
        }
      });
    }

  useEffect(() => {
    dispatch(fetchAllTestimonials());
  }, [dispatch]);
  return (
    <div className="!p-4">
      <TestimonialsTable
        testimonials={testimonialList || []}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default TestimonialList;
