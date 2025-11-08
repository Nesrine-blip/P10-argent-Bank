import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <nav className="header">
      <Link className="logo" to="/">
        <img src="/assets/argentBankLogo.png" alt="Argent Bank" />
      </Link>

      <Link className="signin" to="/sign-in">
        <i className="fa fa-user-circle"></i>
        Sign In
      </Link>
    </nav>
  );
}

export default Header;