import { createSlice } from "@reduxjs/toolkit";
import { logoutAction, loginAction } from "../Redux/authAction";

// Création du slice pour l'authentification
const authSlice = createSlice({
  name: "authSlice",
  initialState: {
    token: localStorage.getItem("token") || null,
    errorMessage: null,
    isLoading: false,
  },
  reducers: {
    // Reducer pour la connexion
    login: (state, action) => {
      state.token = action.payload.token;
    },
    // Reducer pour la déconnexion
    logout: (state) => {
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Gestion de l'état pendant la requête de connexion
      .addCase(loginAction.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = null;
      })
      // Gestion de l'état lorsque la connexion est réussie
      .addCase(loginAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload;
        localStorage.setItem("token", action.payload);
      })
      // Gestion de l'état lorsque la connexion échoue
      .addCase(loginAction.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage =
          action.payload || "Incorrect username or password.";
      });
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
