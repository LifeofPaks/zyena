import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BACKEND_URL =
  import.meta.env.MODE === "production"
    ? import.meta.env.VITE_BACKEND_URL_PRODUCTION
    : import.meta.env.VITE_BACKEND_URL_LOCAL;

const initialState = {
  isLoading: false,
  contactList: [],
  error: null,
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

// Fetch all contacts
export const fetchAllContacts = createAsyncThunk(
  "/contact/fetchAllContacts",
  async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/contact/get`);
      return response.data;
    } catch (error) {
      throw Error(error.response?.data?.message || "Failed to fetch contacts");
    }
  }
);

export const deleteContact = createAsyncThunk(
  "/contact/deleteContact",
  async (id) => {
    try {
      const response = await axios.delete(
        `${BACKEND_URL}/api/contact/delete/${id}`
      );
      return { id, ...response.data };
    } catch (error) {
      throw Error(error.response?.data?.message || "Failed to delete contact");
    }
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
      })
      .addCase(fetchAllContacts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.contactList = action.payload;
      })
      .addCase(fetchAllContacts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default contactSlice.reducer;
