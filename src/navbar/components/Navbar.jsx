import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signOut } from '../../login/reducers/loginReducer';
import logo from '../../assets/temp_logo-removebg-preview.png';

function Navbar() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  return (
    <div className="navbar-asdf">
      <img className="logo" src={logo} alt="logo" />
      {/* sets internal routing links */}
      <nav>
        <ul className="nav-links">
          <li className="asdf"><Link to="/" className="links"> Home </Link></li>
          <li className="asdf"><Link to="/tickers" className="links"> Weather Tickers </Link></li>
          <li className="asdf"><Link to="/map" className="links"> Map </Link></li>
        </ul>
      </nav>
      {user === null
        ? (
          <Link to="/login">
            <button type="button" id="login-button">
              <span id="login">
                Sign in
              </span>
            </button>
          </Link>
        )
        : (
          <button type="button" id="login-button" onClick={() => dispatch(signOut())}>
            <span id="login">
              Sign out
            </span>
          </button>
        )}
    </div>
  );
}

export default Navbar;
