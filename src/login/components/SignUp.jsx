import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import logo from '../../assets/temp_logo-removebg-preview.png';
import logo2 from '../../assets/dew-logo.svg';
import { newSignUp } from '../reducers/loginReducer';
import './SignUp.css';

function SignUp() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const dispatch = useDispatch();

  // dispatches newLogin on submit
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(newSignUp({ username, password }, navigate));
    setUsername('');
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="sign-in-form-container">
          <div id="sign-up" className="sign-in-form">
            <img src={logo2} alt="logo" id="sign-up-logo" className="sign-in-logo" />
            <h1 className="signup"> Sign up </h1>
            <input className="form-field username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
            <input id="password" className="form-field password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
            <input id="sign-up-confirm" className="form-field password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm password" />

            <button id="sign-up-button" className="form-button" type="submit"> Sign up </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
