import React, { useMemo } from 'react';
import './App.css';
import {
  Routes, Route, Navigate, useLocation,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Home from './home/components/Home';
import HomeWeather from './home/components/HomeWeather';
import Weather from './weather/Weather';
import Login from './login/components/Login';
import SignUp from './login/components/SignUp';
import { setUser } from './login/reducers/loginReducer';
import { setStoredWeather } from './weather/reducers/weatherReducer';
import Navbar from './navbar/components/Navbar';

function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const homeWeather = useSelector((state) => state.home);

  // checks to see if user is already logged in
  // use useEffect if useMemo breaks because it shouldn't be used for side effects
  useMemo(() => {
    const loggedUser = window.localStorage.getItem('loggedInUser');
    if (loggedUser !== 'undefined' && loggedUser !== null) {
      dispatch(setUser(JSON.parse(loggedUser)));
      dispatch(setStoredWeather());
    }
  }, []);

  // hides navbar on login and signup page
  const navbarShow = () => {
    if (location.pathname !== '/login' && location.pathname !== '/signup') {
      return (
        <Navbar />
      );
    }
    return null;
  };

  return (
    <div className="App">
      {/* hides navbar on login page */}
      {navbarShow()}
      {/* sets navbar routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        {/* redirects to home page if user tries to go to /weather without filling in the search */}
        <Route path="/weather" element={Object.keys(homeWeather).length !== 0 ? <HomeWeather /> : <Navigate replace to="/" />} />
        {/* redirects to login page if user clicks on weather tickers and is not logged in */}
        <Route path="/tickers" element={user ? <Weather /> : <Navigate replace to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
