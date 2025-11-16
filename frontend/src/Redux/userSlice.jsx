import { createSlice } from "@reduxjs/toolkit";
import { getUser, editUser } from "./userAction";

// État initial
const initialState = {
  userName: "",
  firstName: "",
  lastName: "",
  isLoading: false,
  isEditing: false,
};

// Création du slice pour le profil utilisateur
const profileSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Reducer pour basculer le mode édition
    toggleIsEditing: (state) => {
      state.isEditing = !state.isEditing;
    },
    // Reducer pour mettre à jour le nom d'utilisateur
    updateUserName: (state, action) => {
      state.userName = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Gestion de l'état pendant la requête de récupération des données utilisateur
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
      })
      // Gestion de l'état lorsque la récupération des données utilisateur est réussie
      .addCase(getUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userName = action.payload.userName;
        state.firstName = action.payload.firstName;
        state.lastName = action.payload.lastName;
      })
      // Gestion de l'état lorsque la récupération des données utilisateur échoue
      .addCase(getUser.rejected, (state) => {
        state.isLoading = false;
      })
      // Gestion de l'état pendant la requête de mise à jour du nom d'utilisateur
      .addCase(editUser.pending, (state) => {
        state.isLoading = true;
      })
      // Gestion de l'état lorsque la mise à jour du nom d'utilisateur est réussie
      .addCase(editUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userName = action.payload.userName;
      })
      // Gestion de l'état lorsque la mise à jour du nom d'utilisateur échoue
      .addCase(editUser.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { toggleIsEditing, updateUserName } = profileSlice.actions;
export default profileSlice.reducer;
