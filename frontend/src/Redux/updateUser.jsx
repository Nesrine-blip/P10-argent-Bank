import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editUser } from "../Redux/userAction";

const UpdateUsernameForm = ({ currentUsername, onClose }) => {
  // État local pour le nom d'utilisateur
  const [username, setUsername] = useState(currentUsername);
  const dispatch = useDispatch();
  // Sélection du token d'authentification depuis le state Redux
  const token = useSelector((state) => state.auth.token);

  // Fonction de gestion de la soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    // Envoi de l'action editUser avec le token et le nouveau nom d'utilisateur
    dispatch(editUser({ token, userName: username }));
    // Fermeture du formulaire
    onClose();
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="username">Nouveau nom d'utilisateur :</label>
      <input
        type="text"
        id="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button type="submit">Mettre à jour</button>
      <button type="button" onClick={onClose}>
        Annuler
      </button>
    </form>
  );
};

export default UpdateUsernameForm;
