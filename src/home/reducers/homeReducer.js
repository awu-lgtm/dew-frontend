import { createSlice } from '@reduxjs/toolkit';
import homeService from '../services/home';
import autoService from '../../weather/services/autocomplete';

const homeSlice = createSlice({
  name: 'home',
  initialState: {},
  reducers: {
    setWeather(state, action) {
      return action.payload;
    },
  },
});

export const { setWeather } = homeSlice.actions;
export default homeSlice.reducer;

export const addHomeWeather = (city, navigate) => (
  async (dispatch) => {
    if (city) {
      const location = await autoService.searchGeonames(city);
      const weather = await homeService.getAllWeather(
        location[0].name,
        location[0].lat,
        location[0].lng,
      );
      dispatch(setWeather(weather));
      navigate('/weather');
    }
  }
);

export const addHomeWeatherCoord = (city, lat, lon, navigate) => (
  async (dispatch) => {
    if (city && lat && lon) {
      const weather = await homeService.getAllWeather(city, lat, lon);
      dispatch(setWeather(weather));
      navigate('/weather');
    }
  }
);
