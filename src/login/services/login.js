import axios from 'axios';

const baseUrl = '/api/login';

// post request to verify login information
const login = async (user) => {
  const response = await axios.post(baseUrl, user);
  return response.data;
};

export default login;
