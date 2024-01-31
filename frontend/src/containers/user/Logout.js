import axios from 'axios';
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom'


const Logout = () => {
  useEffect(() => {
    axios.post('/auth/logout/')
      .then(() => {
        console.log('logged out');
        localStorage.removeItem('loggedIn');
        localStorage.removeItem('user');
        window.dispatchEvent(new Event('storage'));
      }).catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Navigate replace to="/" />
  )
}

export default Logout;