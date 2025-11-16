import { createAsyncThunk } from "@reduxjs/toolkit";

export const getUser = createAsyncThunk(
  "user/getUser",
  async ({ token }, { rejectWithValue }) => {
    if (!token) {
      return rejectWithValue("No token found");
    }

    try {
      const res = await fetch("http://localhost:3001/api/v1/user/profile", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        return rejectWithValue(data.message || "An error occurred");
      }

      return data.body;
    } catch (error) {
      return rejectWithValue("Network error");
    }
  }
);

export const editUser = createAsyncThunk(
  "user/editUser",
  async ({ token, userName }, { rejectWithValue }) => {
    try {
      const res = await fetch("http://localhost:3001/api/v1/user/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userName }),
      });

      const data = await res.json();

      if (!res.ok) {
        return rejectWithValue(data.message || "An error occurred");
      }

      return data.body;
    } catch (error) {
      return rejectWithValue("Network error");
    }
  }
);
