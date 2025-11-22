import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUserProfile, updateUsername } from '../../Redux/authSlice';
import './User.css';

function User() {
  const [isEditing, setIsEditing] = useState(false);
  const [newUserName, setNewUserName] = useState('');
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { user, token, isLoading, error } = useSelector((state) => state.auth);
  const firstName = user?.firstName || '';
  const lastName = user?.lastName || '';
  const userName = user?.userName || '';

  useEffect(() => {
    if (!token) {
      navigate('/sign-in');
    } else if (token && !user) {
      dispatch(getUserProfile(token));
    }
  }, [token, user, navigate, dispatch]);

  useEffect(() => {
    if (userName) {
      setNewUserName(userName);
    }
  }, [userName]);

  const handleEditClick = () => {
    setIsEditing(true);
    setNewUserName(userName);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setNewUserName(userName);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    
    if (newUserName.trim() && newUserName !== userName) {
      const result = await dispatch(updateUsername({ token, userName: newUserName }));
      
      // ✅ Fermer le formulaire uniquement si la mise à jour a réussi
      if (updateUsername.fulfilled.match(result)) {
        setIsEditing(false);
      }
    } else {
      setIsEditing(false);
    }
  };

  if (!user) {
    return (
      <main className="user-page">
        <h1>Loading...</h1>
      </main>
    );
  }

  return (
    <main className="user-page">
      <div className="user-header">
        <h1>Welcome back</h1>
        
        {!isEditing ? (
          <>
            <h2 className="user-name">
              {firstName} {lastName}!
            </h2>
            <button className="edit-button" onClick={handleEditClick}>
              Edit Name
            </button>
          </>
        ) : (
          <div className="edit-name-form">
            <h2>Edit user name</h2>
            
            <form onSubmit={handleSave}>
              <div className="input-group">
                <label htmlFor="userName">User name:</label>
                <input
                  type="text"
                  id="userName"
                  value={newUserName}
                  onChange={(e) => setNewUserName(e.target.value)}
                  placeholder="Enter new username"
                  required
                  autoFocus
                />
              </div>

              {error && (
                <p className="error-message">{error}</p>
              )}

              <div className="form-buttons">
                <button 
                  type="submit" 
                  className="save-button"
                  disabled={isLoading}
                >
                  {isLoading ? 'Saving...' : 'Save'}
                </button>
                <button 
                  type="button" 
                  className="cancel-button" 
                  onClick={handleCancelEdit}
                  disabled={isLoading}
                >
                  Cancel
                </button>
              </div>
            </form>

            <div className="user-info-display">
              <p><strong>First name:</strong> {firstName}</p>
              <p><strong>Last name:</strong> {lastName}</p>
            </div>
          </div>
        )}
      </div>

      <section className="accounts">
        <h2 className="sr-only">Accounts</h2>
        
        <div className="account">
          <div className="account-content">
            <h3 className="account-title">Argent Bank Checking (x8349)</h3>
            <p className="account-amount">$2,082.79</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
          <div className="account-actions">
            <button className="transaction-button">View transactions</button>
          </div>
        </div>

        <div className="account">
          <div className="account-content">
            <h3 className="account-title">Argent Bank Savings (x6712)</h3>
            <p className="account-amount">$10,928.42</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
          <div className="account-actions">
            <button className="transaction-button">View transactions</button>
          </div>
        </div>

        <div className="account">
          <div className="account-content">
            <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
            <p className="account-amount">$184.30</p>
            <p className="account-amount-description">Current Balance</p>
          </div>
          <div className="account-actions">
            <button className="transaction-button">View transactions</button>
          </div>
        </div>
      </section>
    </main>
  );
}

export default User;