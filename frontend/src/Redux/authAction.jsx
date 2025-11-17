import { createAsyncThunk, createAction } from "@reduxjs/toolkit";

// ============================================
// ACTION 1 : LOGOUT
// ============================================
export const logoutAction = createAction("auth/logout");

// ============================================
// ACTION 2 : LOGIN
// ============================================
export const loginAction = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      console.log("🔄 Envoi de la requête de login...");
      
      const response = await fetch("http://localhost:3001/api/v1/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();
      console.log("📥 Réponse du serveur (login):", data);

      if (!response.ok) {
        return rejectWithValue(data.message || "Login failed");
      }

      const token = data.body.token;
      localStorage.setItem("token", token);
      
      console.log("✅ Token sauvegardé:", token);
      return token;
    } catch (error) {
      console.error("❌ Erreur login:", error);
      return rejectWithValue("Network error");
    }
  }
);

// ============================================
// ACTION 3 : GET USER PROFILE
// ============================================
export const getUserProfileAction = createAsyncThunk(
  "auth/getUserProfile",
  async (token, { rejectWithValue }) => {
    try {
      console.log("🔄 Récupération du profil avec token:", token);
      
      const response = await fetch("http://localhost:3001/api/v1/user/profile", {
        method: "POST", // ✅ POST (pas GET)
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      const data = await response.json();
      console.log("📥 Réponse du serveur (profile):", data);

      if (!response.ok) {
        return rejectWithValue(data.message || "Failed to get profile");
      }

      return data.body;
    } catch (error) {
      console.error("❌ Erreur profile:", error);
      return rejectWithValue("Network error");
    }
  }
);