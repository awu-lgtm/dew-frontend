import { createSlice } from '@reduxjs/toolkit';
import weatherService from '../services/weather';

const weatherSlice = createSlice({
  name: 'weather',
  initialState: [],
  reducers: {
    setWeather(state, action) {
      return action.payload;
    },
    addWeather(state, action) {
      state.push(action.payload);
    },
  },
});

export const { setWeather, addWeather } = weatherSlice.actions;
export default weatherSlice.reducer;

// export const addTheWeather = (city) => (
//   async (dispatch) => {
//     const location = await weatherService.getLocation(city);
//     console.log('location', location);
//     if (location) {
//       const weather = await weatherService.getCurrentWeather(location.lat, location.lon);
//       console.log('weather', weather);
//       dispatch(addWeather({ ...weather, location }));
//     }
//   }
// );

// finds weather from a given city using api calls
export const addTheWeather = (city) => (
  async (dispatch) => {
    if (city) {
      const location = await weatherService.getLocation(city);
      const weather = await weatherService.postWeather(city, location.lat, location.lon);
      console.log(weather);
      if (weather) {
        dispatch(addWeather({ ...weather, location }));
      }
    }
  }
);

// gets user locations based on data in database
export const setStoredWeather = () => (
  async (dispatch) => {
    const weather = await weatherService.getStoredWeather();
    dispatch(setWeather(weather));
  }
);
