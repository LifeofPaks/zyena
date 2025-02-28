import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BACKEND_URL =
  import.meta.env.MODE === "production"
    ? import.meta.env.VITE_BACKEND_URL_PRODUCTION
    : import.meta.env.VITE_BACKEND_URL_LOCAL;

const initialState = {
  isLoading: false,
  testimonialList: [],
  error: null,
};

export const createTestimonial = createAsyncThunk(
  "/testimonial/createTestimonial",
  async (formData) => {
    const response = await axios.post(
      `${BACKEND_URL}/api/testimonial/add`,
      formData
    );
    return response.data;
  }
);

export const fetchAllTestimonials = createAsyncThunk(
  "/testimonial/fetchAllTestimonials",
  async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/testimonial/get`);
      return response.data;
    } catch (error) {
      throw Error(error.response?.data?.message || "Failed to fetch testimonials");
    }
  }
);

export const deleteTestimonial = createAsyncThunk(
  "/testimonial/deleteTestimonial",
  async (id) => {
    try {
      const response = await axios.delete(
        `${BACKEND_URL}/api/testimonial/delete/${id}`
      );
      return { id, ...response.data };
    } catch (error) {
      throw Error(error.response?.data?.message || "Failed to delete testimonial");
    }
  }
);

const testimonialSlice = createSlice({
  name: "testimonial",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createTestimonial.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTestimonial.fulfilled, (state, action) => {
        state.isLoading = false;
        state.testimonialList.push(action.payload.testimonial);
      })
      .addCase(createTestimonial.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchAllTestimonials.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllTestimonials.fulfilled, (state, action) => {
        state.isLoading = false;
        state.testimonialList = action.payload;
      })
      .addCase(fetchAllTestimonials.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default testimonialSlice.reducer;
