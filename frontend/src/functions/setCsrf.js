import axios from "axios";

const setCSRFToken = async () => {
  try {
    const response = await axios.get('/auth/initialize/', {
      method: 'GET',
      credentials: 'include',
    });
    if (response.status !== 200) {
      console.error('Failed to set CSRF token');
    }
  } catch (error) {
    console.error('Error setting CSRF token:', error);
  }
};

export default setCSRFToken;
