import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BACKEND_URL =
  import.meta.env.MODE === "production"
    ? import.meta.env.VITE_BACKEND_URL_PRODUCTION
    : import.meta.env.VITE_BACKEND_URL_LOCAL;

const initialState = {
  isLoading: false,
  contactList: [],
  error: null
};


export const newContact = createAsyncThunk(
    "/contact/newContact",
    async (formData) => {
      const response = await axios.post(
        `${BACKEND_URL}/api/contact/add`,
        formData
      );
      return response.data;
    }
  );

  const contactSlice = createSlice({
    name: "contact",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(newContact.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(newContact.fulfilled, (state, action) => {
          state.isLoading = false;
          state.contactList.push(action.payload.contact);
        })
        .addCase(newContact.rejected, (state) => {
          state.isLoading = false;
        });
    },
  });
  
  export default contactSlice.reducer;
  