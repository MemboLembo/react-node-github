import axios from 'axios';

function checkParams(email, password) {
  return axios.post('/api/authorization', {
    email,
    password,
  })
}

export default checkParams
