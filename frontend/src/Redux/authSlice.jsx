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
      // ============================================
      // LOGIN
      // ============================================
      .addCase(loginAction.pending, (state) => {
        console.log("⏳ Login en cours...");
        state.isLoading = true;
        state.errorMessage = null;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        console.log("✅ Login réussi, token:", action.payload);
        state.isLoading = false;
        state.token = action.payload;
      })
      .addCase(loginAction.rejected, (state, action) => {
        console.error("❌ Login échoué:", action.payload);
        state.isLoading = false;
        state.errorMessage = action.payload;
      })

      // ============================================
      // GET PROFILE
      // ============================================
      .addCase(getUserProfileAction.pending, (state) => {
        console.log("⏳ Récupération du profil...");
        state.isLoading = true;
      })
      .addCase(getUserProfileAction.fulfilled, (state, action) => {
        console.log("✅ Profil récupéré:", action.payload);
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(getUserProfileAction.rejected, (state, action) => {
        console.error("❌ Erreur profil:", action.payload);
        state.isLoading = false;
        state.errorMessage = action.payload;
      })

      // ============================================
      // LOGOUT
      // ============================================
      .addCase(logoutAction, (state) => {
        console.log("👋 Déconnexion");
        state.token = null;
        state.user = null;
        state.errorMessage = null;
        localStorage.removeItem("token");
      });
  },
});

export default authSlice.reducer;