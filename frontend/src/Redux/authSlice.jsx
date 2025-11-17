import { createSlice } from "@reduxjs/toolkit";
import { logoutAction, loginAction, getUserProfileAction } from "./authAction";

// ============================================
// ÉTAT INITIAL
// ============================================
const initialState = {
  token: localStorage.getItem("token") || null,
  user: null,
  isLoading: false,
  errorMessage: null,
};

// ============================================
// SLICE
// ============================================
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ============================================
      // LOGIN
      // ============================================
      .addCase(loginAction.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = null;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload;
      })
      .addCase(loginAction.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.payload;
      })

      // ============================================
      // GET PROFILE
      // ============================================
      .addCase(getUserProfileAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserProfileAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(getUserProfileAction.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.payload;
      })

      // ============================================
      // LOGOUT
      // ============================================
      .addCase(logoutAction, (state) => {
        state.token = null;
        state.user = null;
        state.errorMessage = null;
        localStorage.removeItem("token");
      });
  },
});

export default authSlice.reducer;