import { configureStore } from '@reduxjs/toolkit';
import weatherReducer from './weather/reducers/weatherReducer';
import navbarReducer from './navbar/reducers/navbarReducer';
import loginReducer from './login/reducers/loginReducer';
import homeReducer from './home/reducers/homeReducer';

const store = configureStore({
  reducer: {
    weather: weatherReducer,
    navbar: navbarReducer,
    user: loginReducer,
    home: homeReducer,
  },
});

export default store;
