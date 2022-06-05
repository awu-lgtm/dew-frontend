import axios from 'axios';

const baseUrl = '/api/users';

// post request to verify login information
const signUp = async (user) => {
  try {
    const response = await axios.post(baseUrl, user);
    return response.data;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

export default signUp;
