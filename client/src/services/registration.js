import axios from 'axios';

function saveParams(email, password) {
  return axios.post('/api/registration', {
    email,
    password,
  });
}

export default saveParams
