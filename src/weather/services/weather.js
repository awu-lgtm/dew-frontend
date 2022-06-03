import axios from 'axios';
import isoCountries from 'i18n-iso-countries';

const baseURL = '/api/weather';

// gets weather data while updating database with location
const postWeather = async (city, lat, lon) => {
  const user = window.localStorage.getItem('loggedInUser');
  let token = '';
  if (user) {
    ({ token } = JSON.parse(user));
  }
  try {
    const response = await axios.post(baseURL, { city, lat, lon }, { headers: { authorization: `bearer ${token}` } });
    console.log(response);
    return response.data;
  } catch {
    console.log('weather api failed');
    return undefined;
  }
};

// gets locations of current user
const getStoredWeather = async () => {
  const user = window.localStorage.getItem('loggedInUser');
  let token = '';
  if (user) {
    ({ token } = JSON.parse(user));
  }
  try {
    const response = await axios.get(baseURL, { headers: { authorization: `bearer ${token}` } });
    return response.data;
  } catch {
    return undefined;
  }
};

const getLocation = async (city, country) => {
  if (city === '') {
    return undefined;
  }

  let code = '';
  const countryCode = isoCountries.getAlpha2Code(country, 'en');
  if (countryCode) {
    code = `,${countryCode}`;
  }

  try {
    const response = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${city}${code}&appid=${process.env.REACT_APP_OPEN_WEATHER_KEY}`);
    console.log(response.data);
    return response.data[0];
  } catch (e) {
    console.log(e);
  }

  return undefined;
};

// const getCurrentWeather = async (lat, lon) => {
//   if (lat === '' || lon === '') {
//     return undefined;
//   }
//   const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_OPEN_WEATHER_KEY}`);
//   return response.data;
// };

export default { getLocation, postWeather, getStoredWeather };
