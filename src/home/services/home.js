import axios from 'axios';

const baseUrl = '/api/home';

// makes call to get all weather (current and forecast)
const getAllWeather = async (city, lat, lon) => {
  console.log(city);
  const response = await axios.post(baseUrl, { city, lat, lon });
  return response.data;
};

export default { getAllWeather };
