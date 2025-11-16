import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginAction, getUserProfileAction } from '../../redux/authAction';
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
    
    // 1. Se connecter
    const loginResult = await dispatch(loginAction({ email, password }));
    
    // 2. Si succès, récupérer le profil
    if (loginResult.payload) {
      const profileResult = await dispatch(getUserProfileAction(loginResult.payload));
      
      // 3. Si profil récupéré, rediriger vers /user
      if (profileResult.payload) {
        navigate('/user');
      }
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