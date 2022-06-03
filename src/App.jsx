import React, { useEffect } from 'react';
import './App.css';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CreateWeather from './weather/components/CreateWeather';
import Weather from './weather/Weather';
import Login from './login/components/Login';
import { setUser } from './login/reducers/loginReducer';
import { setStoredWeather } from './weather/reducers/weatherReducer';
import Navbar from './navbar/components/Navbar';

function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  // checks to see if user is already logged in
  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedInUser');
    if (loggedUser !== 'undefined') {
      dispatch(setUser(JSON.parse(loggedUser)));
      dispatch(setStoredWeather());
    }
  }, []);

  return (
    <div className="App">
      {/* hides navbar on login page */}
      {location.pathname === '/login' ? null : <Navbar />}
      {/* sets navbar routes */}
      <Routes>
        <Route path="/" element={<CreateWeather />} />
        {/* redirects to login page if user clicks on weather tickers and is not logged in */}
        <Route path="/tickers" element={user ? <Weather /> : <Navigate replace to="/login" />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
