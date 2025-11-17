import { createAsyncThunk, createAction } from "@reduxjs/toolkit";

// ============================================
// ACTION 1 : LOGOUT (action simple)
// ============================================
export const logoutAction = createAction("auth/logout");

// ============================================
// ACTION 2 : LOGIN (action async)
// ============================================
export const loginAction = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:3001/api/v1/user/login", {
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
    } catch (error) {
      return rejectWithValue("Network error");
    }
  }
);

// ============================================
// ACTION 3 : GET USER PROFILE (action async)
// ============================================
export const getUserProfileAction = createAsyncThunk(
  "auth/getUserProfile",
  async (token, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:3001/api/v1/user/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.message || "Failed to get profile");
      }

      return data.body;
    } catch (error) {
      return rejectWithValue("Network error");
    }
  }
);