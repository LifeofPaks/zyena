import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BACKEND_URL =
  import.meta.env.MODE === "production"
    ? import.meta.env.VITE_BACKEND_URL_PRODUCTION
    : import.meta.env.VITE_BACKEND_URL_LOCAL;

const initialState = {
  isLoading: false,
  consultationList: [],
};

export const newConsultation = createAsyncThunk(
  "/consultations/newConsultation",
  async (formData) => {
    const response = await axios.post(
      `${BACKEND_URL}/api/consultation/add`,
      formData
    );
    return response.data;
  }
);

const consultationSlice = createSlice({
  name: "consultation",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(newConsultation.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(newConsultation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.consultationList.push(action.payload.consultation);
      })
      .addCase(newConsultation.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default consultationSlice.reducer;
