import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Set the backend URL based on the environment
const BACKEND_URL =
  import.meta.env.MODE === "production"
    ? import.meta.env.VITE_BACKEND_URL_PRODUCTION
    : import.meta.env.VITE_BACKEND_URL_LOCAL;


// Initial state for the authentication slice
const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
  token: localStorage.getItem("token") || null, // Load token from localStorage
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
      localStorage.setItem("token", response.data.token); // Store token in localStorage
    }
    return response.data;
  }
);

// Async thunk for logging out a user
export const logoutUser = createAsyncThunk(
  "/auth/logout",
  async () => {
    localStorage.removeItem("token"); // Remove token from localStorage
    const response = await axios.post(
      `${BACKEND_URL}/api/auth/logout`,
      {},
      { withCredentials: true }
    );
    return response.data;
  }
);

// Async thunk to check authentication status
export const checkAuth = createAsyncThunk(
  "/auth/checkauth",
  async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${BACKEND_URL}/api/auth/check-auth`, {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true,
    });
    return response.data;
  }
);

// Async thunk to fetch all users
export const fetchAllUsers = createAsyncThunk(
  "auth/fetchAllUsers",
  async () => {
    const token = localStorage.getItem("token");

    // If no token exists, throw an error
    if (!token) {
      throw new Error("No token found, please log in.");
    }

    try {
      const response = await axios.get(`${BACKEND_URL}/api/auth/users`, {
        headers: {
          Authorization: `Bearer ${token}`, // Ensure the token is included
        },
        withCredentials: true, // If you're using cookies for authentication, include this
      });

      return response.data;
    } catch (error) {
      // Log the error response to debug
      console.error("Error fetching users:", error.response || error);
      throw error;
    }
  }
);


const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
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
        state.isAuthenticated = action.payload.success;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = action.error.message;
      })
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.success ? action.payload.user : null;
        state.isAuthenticated = action.payload.success;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
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

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
