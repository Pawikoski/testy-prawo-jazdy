import axios from "axios"

const fetchUserInfo = () => {
  axios.get('/user/').then((response) => {
    if (response.status === 200) {
      localStorage.setItem('user', JSON.stringify(response.data));
      localStorage.setItem('loggedIn', true);
      window.dispatchEvent(new Event('storage'));
    }
  }).catch((error) => {
    console.log(error);
  })
}

export default fetchUserInfo;