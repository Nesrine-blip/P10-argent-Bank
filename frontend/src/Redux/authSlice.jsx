import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = "http://localhost:3001/api/v1/user";

// LOGIN - Authenticate user with email and password
export const login = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.message || "Login failed");
      }

      const token = data.body.token;
      localStorage.setItem("token", token);
      
      return token;
    } catch {
      return rejectWithValue("Network error");
    }
  }
);

// GET USER PROFILE - Fetch user data with token
export const getUserProfile = createAsyncThunk(
  "auth/getUserProfile",
  async (token, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/profile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.message || "Failed to get profile");
      }

      return data.body;
    } catch {
      return rejectWithValue("Network error");
    }
  }
);

// UPDATE USERNAME - Modify user's display name
export const updateUsername = createAsyncThunk(
  "auth/updateUsername",
  async ({ token, userName }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userName }),
      });

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.message || "Update failed");
      }

      return data.body;
    } catch {
      return rejectWithValue("Network error");
    }
  }
);

// Initial state - Restore token from localStorage if exists
const initialState = {
  token: localStorage.getItem("token") || null,
  user: null,
  isLoading: false,
  error: null,
};

// Auth slice - Manages authentication state
const authSlice = createSlice({
  name: "auth",
  initialState,
  
  reducers: {
    // Logout - Clear user data and token
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.error = null;
      localStorage.removeItem("token");
    },
  },
  
  // Handle async actions (pending, fulfilled, rejected)
  extraReducers: (builder) => {
    builder
      // Login cases
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      // Get profile cases
      .addCase(getUserProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      // Update username cases
      .addCase(updateUsername.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUsername.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        // Update userName in store
        if (state.user) {
          state.user.userName = action.payload.userName;
        }
      })
      .addCase(updateUsername.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;