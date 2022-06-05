import { createSlice } from '@reduxjs/toolkit';
import { setStoredWeather, deleteStoredWeather } from '../../weather/reducers/weatherReducer';

import login from '../services/login';
import signUp from '../services/signUp';

const loginSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload;
    },
    deleteUser() {
      return null;
    },
  },
});

export const { setUser, deleteUser } = loginSlice.actions;
export default loginSlice.reducer;

// handles new logins
// awaits confirmation of user from database
// sets the User store to newUser
export const newLogin = (user, navigate) => (
  async (dispatch) => {
    const newUser = await login(user);
    window.localStorage.setItem('loggedInUser', JSON.stringify(newUser));
    dispatch(setUser(newUser));
    dispatch(setStoredWeather());

    // saves user in localStorage
    // redirects to weather tickers
    navigate('/tickers');
  }
);

// handles new sign ups
export const newSignUp = (user, navigate) => (
  async (dispatch) => {
    const newUser = await signUp(user);

    // saves user in localStorage
    // redirects to weather tickers
    window.localStorage.setItem('loggedInUser', JSON.stringify(newUser));
    dispatch(setUser(newUser));
    navigate('/tickers');
  }
);

// handles sign outs
export const signOut = () => (
  async (dispatch) => {
    // clears local storage and saved user/weather info
    window.localStorage.setItem('loggedInUser', undefined);
    dispatch(deleteUser());
    dispatch(deleteStoredWeather());
  }
);
