import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../Redux/authSlice';  
import './Header.css';

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Get token and user from Redux store
  const { token, user } = useSelector((state) => state.auth);

  // Handle user logout
  const handleLogout = () => {
    dispatch(logout());  // Clear token and user data
    navigate("/");       // Redirect to home
  };

  return (
    <nav className="header">
      <Link className="logo" to="/">
        <img src="/assets/argentBankLogo.webp" alt="Argent Bank" />
      </Link>

      <div>
        {/* Display user menu if logged in */}
        {token && user ? (
          <>
            <Link className="signin" to="/user">
              <i className="fa fa-user-circle"></i>
              {user.userName}
            </Link>
            
            <Link className="signin" to="/" onClick={handleLogout}>
              <i className="fa fa-sign-out"></i>
              Sign Out
            </Link>
          </>
        ) : (
          // Display sign in button if not logged in
          <Link className="signin" to="/sign-in">
            <i className="fa fa-user-circle"></i>
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Header;