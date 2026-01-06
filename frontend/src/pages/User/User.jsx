import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUserProfile, updateUsername } from '../../Redux/authSlice';
import Account from '../../components/Account/Account';
import './User.css';

function User() {
  const [isEditing, setIsEditing] = useState(false);
  const [newUserName, setNewUserName] = useState('');
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Get user data from Redux store
  const { user, token } = useSelector((state) => state.auth);
  const firstName = user?.firstName || '';
  const lastName = user?.lastName || '';
  const userName = user?.userName || '';

  // Redirect to sign-in if not authenticated
  useEffect(() => {
    if (!token) {
      navigate('/sign-in');
    } else if (token && !user) {
      dispatch(getUserProfile(token));
    }
  }, [token, user, navigate, dispatch]);

  // Update local userName when user data changes
  useEffect(() => {
    if (userName) {
      setNewUserName(userName);
    }
  }, [userName]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setNewUserName(userName);
  };

  // Save updated username
  const handleSave = async (e) => {
    e.preventDefault();
    
    if (newUserName.trim() && newUserName !== userName) {
      await dispatch(updateUsername({ token, userName: newUserName }));
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

  // Bank accounts data
  const accounts = [
    {
      id: 1,
      title: 'Argent Bank Checking (x8349)',
      amount: '$2,082.79',
      description: 'Available Balance'
    },
    {
      id: 2,
      title: 'Argent Bank Savings (x6712)',
      amount: '$10,928.42',
      description: 'Available Balance'
    },
    {
      id: 3,
      title: 'Argent Bank Credit Card (x8349)',
      amount: '$184.30',
      description: 'Current Balance'
    }
  ];

  return (
    <main className="user-page">
      <div className="user-header">
        <h1>Welcome back</h1>
        
        {!isEditing ? (
          <>
            <h2 className="user-name">
              {userName}!
            </h2>
            <button className="edit-button" onClick={handleEditClick}>
              Edit Name
            </button>
          </>
        ) : (
          <div className="edit-name-section">
            <h2>Edit user info</h2>
            <form className="edit-name-form" onSubmit={handleSave}>
              <div className="form-group">
                <label htmlFor="userName">User name:</label>
                <input
                  type="text"
                  id="userName"
                  value={newUserName}
                  onChange={(e) => setNewUserName(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="firstName">First name:</label>
                <input
                  type="text"
                  id="firstName"
                  value={firstName}
                  disabled
                />
              </div>

              <div className="form-group">
                <label htmlFor="lastName">Last name:</label>
                <input
                  type="text"
                  id="lastName"
                  value={lastName}
                  disabled
                />
              </div>

              <div className="form-buttons">
                <button type="submit" className="save-button">
                  Save
                </button>
                <button type="button" className="cancel-button" onClick={handleCancelEdit}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      <section className="accounts">
        <h2 className="sr-only">Accounts</h2>
        
        {/* Render account components dynamically */}
        {accounts.map((account) => (
          <Account
            key={account.id}
            title={account.title}
            amount={account.amount}
            description={account.description}
          />
        ))}
      </section>
    </main>
  );
}

export default User;