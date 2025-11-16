import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutAction } from '../../redux/authAction';
import './Header.css';

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logoutAction());
    navigate("/");  // Redirection vers l'accueil
  };

  return (
    <nav className="header">
      <Link className="logo" to="/">
        <img src="/assets/argentBankLogo.png" alt="Argent Bank" />
      </Link>

      <div>
        {token && user ? (
          <>
            <Link className="signin" to="/user">
              <i className="fa fa-user-circle"></i>
              {user.firstName}
            </Link>
            <Link className="signin" to="/" onClick={handleLogout}>
              <i className="fa fa-sign-out"></i>
              Sign Out
            </Link>
          </>
        ) : (
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