import PropTypes from 'prop-types';
import './Account.css';

function Account({ title, amount, description }) {
  return (
    <div className="account">
      <div className="account-content">
        <h3 className="account-title">{title}</h3>
        <p className="account-amount">{amount}</p>
        <p className="account-amount-description">{description}</p>
      </div>
      <div className="account-actions">
        <button className="transaction-button">View transactions</button>
      </div>
    </div>
  );
}

Account.propTypes = {
  title: PropTypes.string.isRequired,
  amount: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default Account;