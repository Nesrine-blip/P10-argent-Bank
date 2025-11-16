import { createSlice } from "@reduxjs/toolkit";
import { logoutAction, loginAction, getUserProfileAction } from "./authAction";

const initialState = {
  token: localStorage.getItem("token") || null,
  user: null,
  isLoading: false,
  errorMessage: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // LOGIN - Pendant
      .addCase(loginAction.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = null;
      })
      // LOGIN - Succès
      .addCase(loginAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload;
      })
      // LOGIN - Erreur
      .addCase(loginAction.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.payload;
      })
      
      // GET PROFILE - Pendant
      .addCase(getUserProfileAction.pending, (state) => {
        state.isLoading = true;
      })
      // GET PROFILE - Succès
      .addCase(getUserProfileAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      // GET PROFILE - Erreur
      .addCase(getUserProfileAction.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.payload;
      })
      
      // LOGOUT
      .addCase(logoutAction, (state) => {
        state.token = null;
        state.user = null;
        state.errorMessage = null;
        localStorage.removeItem("token");
      });
  },
});

export default authSlice.reducer;