import { createAsyncThunk, createAction, createSlice } from "@reduxjs/toolkit";

// Action pour la déconnexion
export const logoutAction = createAction("auth/logout");

// Action asynchrone pour la connexion
export const loginAction = createAsyncThunk(
  "auth/login",
  async (entryPayload, { rejectWithValue }) => {
    try {
      // Envoi de la requête POST à l'API de connexion
      const res = await fetch("http://localhost:3001/api/v1/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(entryPayload),
      });

      // Convertie de la réponse en JSON
      const data = await res.json();

      // Gestion des erreurs de la réponse
      if (!res.ok) {
        return rejectWithValue(
          data.body?.message || "Incorrect username or password"
        );
      }

      // Stockage du token dans localStorage
      localStorage.setItem("token", data.body?.token || "");
      return data.body?.token || "";
    } catch (error) {
      // Gestion des erreurs
      return rejectWithValue("An unexpected error occurred");
    }
  }
);

// État initial
const initialState = {
  token: localStorage.getItem("token") || null,
  isLoading: false,
  errorMessage: "",
};

// Slice pour l'authentification
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Gestion de l'état pendant la requête de connexion
      .addCase(loginAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload;
      })
      .addCase(loginAction.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.payload;
      })
      // Gestion de l'état pour la déconnexion
      .addCase(logoutAction, (state) => {
        state.token = null;
        localStorage.removeItem("token");
      });
  },
});

export default authSlice.reducer;
