import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Set the backend URL based on the environment
const BACKEND_URL =
  import.meta.env.MODE === "production"
    ? import.meta.env.VITE_BACKEND_URL_PRODUCTION
    : import.meta.env.VITE_BACKEND_URL_LOCAL;

// Helper functions for localStorage
const saveToStorage = (token, user) => {
  localStorage.setItem("token-zyena", token);
  localStorage.setItem("user-zyena", JSON.stringify(user));
};

const clearStorage = () => {
  localStorage.removeItem("token-zyena");
  localStorage.removeItem("user-zyena");
};

// Initial state for the authentication slice
const initialState = {
  isAuthenticated: false,
  isLoading: false,
  user: JSON.parse(localStorage.getItem("user-zyena")) || null,
  token: localStorage.getItem("token-zyena") || null,
  error: null,
  users: [],
};

// Async thunk for registering a new user
export const registerUser = createAsyncThunk(
  "/auth/register",
  async (formData) => {
    const response = await axios.post(
      `${BACKEND_URL}/api/auth/register`,
      formData,
      { withCredentials: true }
    );
    return response.data;
  }
);

// Async thunk for logging in a user
export const loginUser = createAsyncThunk(
  "/auth/login",
  async (formData) => {
    const response = await axios.post(
      `${BACKEND_URL}/api/auth/login`,
      formData,
      { withCredentials: true }
    );
    if (response.data.success) {
      const { token, user } = response.data;
      saveToStorage(token, user);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    return response.data;
  }
);

// Async thunk for logging out a user
export const logoutUser = createAsyncThunk(
  "/auth/logout",
  async () => {
    const response = await axios.post(
      `${BACKEND_URL}/api/auth/logout`,
      {},
      { withCredentials: true }
    );
    clearStorage();
    delete axios.defaults.headers.common['Authorization'];
    return response.data;
  }
);

// Async thunk to fetch all users
export const fetchAllUsers = createAsyncThunk(
  "auth/fetchAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/auth/users`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching users:", error.response || error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Add hydrate reducer to restore auth state on app load
    hydrate: (state) => {
      const token = localStorage.getItem("token-zyena");
      const user = JSON.parse(localStorage.getItem("user-zyena"));
      if (token && user) {
        state.isAuthenticated = true;
        state.token = token;
        state.user = user;
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(registerUser.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.success ? action.payload.user : null;
        state.token = action.payload.success ? action.payload.token : null;
        state.isAuthenticated = action.payload.success;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.error = action.error.message;
        clearStorage();
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
      })
      .addCase(fetchAllUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload.success ? action.payload.users : [];
      })
      .addCase(fetchAllUsers.rejected, (state) => {
        state.isLoading = false;
        state.users = [];
      });
  },
});

export const { hydrate } = authSlice.actions;
export default authSlice.reducer;