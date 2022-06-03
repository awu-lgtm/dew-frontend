import { configureStore } from '@reduxjs/toolkit';
import weatherReducer from './weather/reducers/weatherReducer';
import navbarReducer from './navbar/reducers/navbarReducer';
import loginReducer from './login/reducers/loginReducer';

const store = configureStore({
  reducer: {
    weather: weatherReducer,
    navbar: navbarReducer,
    user: loginReducer,
  },
});

export default store;
