import axios from 'axios';

const baseURL = '/api/weather';

// gets weather data while updating database with location
const postWeather = async (city, lat, lon) => {
  const user = window.localStorage.getItem('loggedInUser');
  let token = '';
  if (user !== 'undefined' && user !== null) {
    ({ token } = JSON.parse(user));
  }
  try {
    const response = await axios.post(baseURL, { city, lat, lon }, { headers: { authorization: `bearer ${token}` } });
    return response.data;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

// deletes one ticker from user database
const deleteWeather = async (city, lat, lon) => {
  const user = window.localStorage.getItem('loggedInUser');
  let token = '';
  if (user !== 'undefined' && user !== null) {
    ({ token } = JSON.parse(user));
  }

  const request = {
    headers: { authorization: `bearer ${token}` },
    data: { city, lat, lon },
  };

  try {
    const response = await axios.delete(baseURL, request);
    console.log('second');
    return response.data;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

// gets locations of current user
const getStoredWeather = async () => {
  const user = window.localStorage.getItem('loggedInUser');
  let token = '';
  if (user !== 'undefined' && user !== null) {
    ({ token } = JSON.parse(user));
  }
  try {
    const response = await axios.get(baseURL, { headers: { authorization: `bearer ${token}` } });
    return response.data;
  } catch {
    return undefined;
  }
};

// const getLocation = async (city, country) => {
//   if (city === '') {
//     return undefined;
//   }

//   let code = '';
//   const countryCode = isoCountries.getAlpha2Code(country, 'en');
//   if (countryCode) {
//     code = `,${countryCode}`;
//   }

//   try {
//     const response = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${city}${code}&appid=${process.env.REACT_APP_OPEN_WEATHER_KEY}`);
//     console.log(response.data);
//     return response.data[0];
//   } catch (e) {
//     console.log(e);
//   }

//   return undefined;
// };

// const getCurrentWeather = async (lat, lon) => {
//   if (lat === '' || lon === '') {
//     return undefined;
//   }
//   const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_OPEN_WEATHER_KEY}`);
//   return response.data;
// };

export default {
  postWeather, deleteWeather, getStoredWeather,
};
