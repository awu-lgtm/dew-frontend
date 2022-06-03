import { createSlice } from '@reduxjs/toolkit';

import login from '../services/login';

const loginSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload;
    },
    signOut() {
      window.localStorage.setItem('loggedInUser', undefined);
      return null;
    },
  },
});

export const { setUser, signOut } = loginSlice.actions;
export default loginSlice.reducer;

// awaits confirmation of user from database
// sets the User store to newUser
export const newLogin = (user, navigate) => (
  async (dispatch) => {
    const newUser = await login(user);
    dispatch(setUser(newUser));

    // saves user in localStorage
    window.localStorage.setItem('loggedInUser', JSON.stringify(newUser));
    // redirects to weather tickers
    navigate('/tickers');
  }
);
