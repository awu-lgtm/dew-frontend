import { createSlice } from '@reduxjs/toolkit';
import weatherService from '../services/weather';
import auto from '../services/autocomplete';

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
    // deletes a single weather ticker
    deleteWeather(state, action) {
      console.log('second');
      return state.filter((weather) => (
        weather.coord.lat !== action.payload.lat && weather.coord.lon !== action.payload.lon
      ));
    },
    // deletes all weather tickers
    deleteStoredWeather() {
      return [];
    },
  },
});

export const {
  setWeather, addWeather, deleteWeather, deleteStoredWeather,
} = weatherSlice.actions;

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
      const location = await auto.searchGeonames(city);
      const weather = await weatherService.postWeather(
        location[0].name,
        location[0].lat,
        location[0].lng,
      );
      console.log(weather);
      if (weather) {
        dispatch(addWeather({ ...weather, location }));
      }
    }
  }
);

export const addTheWeatherCoord = (city, lat, lon) => (
  async (dispatch) => {
    if (city && lat && lon) {
      const weather = await weatherService.postWeather(city, lat, lon);
      console.log(weather);
      if (weather) {
        dispatch(addWeather(weather));
      }
    }
  }
);

export const deleteTheWeather = (city, lat, lon) => (
  async (dispatch) => {
    if (city && lat && lon) {
      const deletedWeather = await weatherService.deleteWeather(city, lat, lon);
      console.log(deletedWeather);
      if (deletedWeather) {
        dispatch(deleteWeather({ lat, lon }));
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
