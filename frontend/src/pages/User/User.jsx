import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function User() {
  const { user, token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  // Redirection si pas de token
  useEffect(() => {
    if (!token) {
      navigate('/sign-in');
    }
  }, [token, navigate]);

  // Affichage pendant le chargement
  if (!user) {
    return (
      <main style={{ 
        padding: '2rem', 
        textAlign: 'center',
        minHeight: '80vh',
        backgroundColor: '#12002b',
        color: 'white'
      }}>
        <h1>Loading user information...</h1>
      </main>
    );
  }

  // ✅ Affichage avec toutes les infos utilisateur
  return (
    <main style={{ 
      padding: '2rem', 
      textAlign: 'center',
      minHeight: '80vh',
      backgroundColor: '#12002b',
      color: 'white'
    }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>
        Welcome back
      </h1>
      
      <div style={{
        background: 'white',
        color: '#222',
        padding: '2rem',
        maxWidth: '600px',
        margin: '0 auto',
        borderRadius: '8px'
      }}>
        <h2 style={{ marginBottom: '1.5rem' }}>User Profile</h2>
        
        <div style={{ textAlign: 'left', fontSize: '1.1rem' }}>
          <p><strong>First Name:</strong> {user.firstName}</p>
          <p><strong>Last Name:</strong> {user.lastName}</p>
          <p><strong>Email:</strong> {user.email}</p>
          
          {/* Affiche aussi userName si disponible */}
          {user.userName && (
            <p><strong>Username:</strong> {user.userName}</p>
          )}
        </div>
        
        <p style={{ marginTop: '2rem', color: '#00bc77', fontWeight: 'bold' }}>
          ✅ Successfully logged in!
        </p>
      </div>
    </main>
  );
}

export default User;