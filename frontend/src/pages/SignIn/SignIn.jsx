import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginAction, getUserProfileAction } from '../../Redux/authAction';
import './SignIn.css';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, errorMessage } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // 1. LOGIN - On récupère le token
      const loginResult = await dispatch(loginAction({ email, password }));
      
      // 2. Vérifier si le login a réussi
      if (loginAction.fulfilled.match(loginResult)) {
        const token = loginResult.payload;
        
        // 3. RÉCUPÉRER LE PROFIL avec le token
        const profileResult = await dispatch(getUserProfileAction(token));
        
        // 4. Vérifier si le profil a été récupéré
        if (getUserProfileAction.fulfilled.match(profileResult)) {
          // 5. REDIRECTION vers /user
          navigate('/user');
        }
      }
    } catch (error) {
      console.error('Erreur lors de la connexion:', error);
    }
  };

  return (
    <main className="signin-page">
      <section className="signin-content">
        <i className="fa fa-user-circle signin-icon"></i>
        <h1>Sign In</h1>

        <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="input-remember">
            <input
              type="checkbox"
              id="remember-me"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label htmlFor="remember-me">Remember me</label>
          </div>

          {errorMessage && (
            <p style={{ color: 'red', textAlign: 'center' }}>{errorMessage}</p>
          )}

          <button type="submit" className="signin-button" disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Sign In'}
          </button>
        </form>
      </section>
    </main>
  );
}

export default SignIn;