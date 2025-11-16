import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function User() {
  const { user, token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  // Si pas de token, rediriger vers sign-in
  useEffect(() => {
    if (!token) {
      navigate('/sign-in');
    }
  }, [token, navigate]);

  // Afficher "Loading..." si pas encore d'infos utilisateur
  if (!user) {
    return (
      <main style={{ 
        padding: '2rem', 
        textAlign: 'center',
        minHeight: '80vh',
        backgroundColor: 'white'
      }}>
        <h1>Loading user information...</h1>
      </main>
    );
  }

  return (
    <main style={{ 
      padding: '2rem', 
      textAlign: 'center',
      minHeight: '80vh',
      backgroundColor: 'white'
    }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>
        Welcome {user.firstName} {user.lastName}!
      </h1>
      <p style={{ fontSize: '1.2rem' }}>Email: {user.email}</p>
      <p style={{ marginTop: '2rem', color: '#666' }}>
        🎉 Connexion réussie ! Redux fonctionne !
      </p>
    </main>
  );
}

export default User;