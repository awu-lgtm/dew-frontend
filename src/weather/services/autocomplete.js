import axios from 'axios';

// api is here just for speed and to make it less complex
// probably not the greatest security idea

const searchGeonames = async (city) => {
  const response = await axios.get(`http://api.geonames.org/searchJSON?q=${city}&maxRows=5&fuzzy=0.8&username=dewweather`);
  return response.data.geonames;
};

export default { searchGeonames };
