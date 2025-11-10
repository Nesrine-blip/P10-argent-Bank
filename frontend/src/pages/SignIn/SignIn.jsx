import { useState } from 'react';
import './SignIn.css';

/**
 * Page SignIn - Page de connexion
 * 
 * Contient :
 * - Un formulaire avec username et password
 * - Un bouton de connexion
 */
function SignIn() {
  // États pour stocker les valeurs des champs
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  // Fonction appelée quand on soumet le formulaire
  const handleSubmit = (e) => {
    e.preventDefault(); // Empêche le rechargement de la page
    console.log('Username:', username);
    console.log('Password:', password);
    console.log('Remember me:', rememberMe);
    // Ici on ajoutera la logique de connexion plus tard
  };

  return (
    <main className="signin-page">
      <section className="signin-content">
        {/* Icône utilisateur */}
        <i className="fa fa-user-circle signin-icon"></i>
        
        {/* Titre */}
        <h1>Sign In</h1>

        {/* Formulaire */}
        <form onSubmit={handleSubmit}>
          {/* Champ Username */}
          <div className="input-wrapper">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          {/* Champ Password */}
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Checkbox Remember me */}
          <div className="input-remember">
            <input
              type="checkbox"
              id="remember-me"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label htmlFor="remember-me">Remember me</label>
          </div>

          
          <button type="submit" className="signin-button">
            Sign In
          </button>
        </form>
      </section>
    </main>
  );
}

export default SignIn;