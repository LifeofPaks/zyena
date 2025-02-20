import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BACKEND_URL =
  import.meta.env.MODE === "production"
    ? import.meta.env.VITE_BACKEND_URL_PRODUCTION
    : import.meta.env.VITE_BACKEND_URL_LOCAL;

const initialState = {
  isLoading: false,
  consultationList: [],
  error: null,
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

// Fetch all consultations
export const fetchAllConsultations = createAsyncThunk(
  "consultation/fetchAllConsultations",
  async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/consultation/get`);
      return response.data;
    } catch (error) {
      throw Error(error.response?.data || "Failed to fetch consultations");
    }
  }
);

// Delete a consultation
export const deleteConsultation = createAsyncThunk(
  "consultation/deleteConsultation",
  async (id) => {
    try {
      await axios.delete(`${BACKEND_URL}/api/consultation/delete/${id}`);
      return { id, ...response.data };
    } catch (error) {
      throw Error(error.response?.data || "Failed to delete consultation");
    }
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
      })
      .addCase(fetchAllConsultations.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllConsultations.fulfilled, (state, action) => {
        state.isLoading = false;
        state.consultationList = action.payload;
      })
      .addCase(fetchAllConsultations.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default consultationSlice.reducer;
