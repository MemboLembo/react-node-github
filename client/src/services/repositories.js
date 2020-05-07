import axios from 'axios';

const BASE_URL = '/api/repositories';

export function addRepoToDB(user, repository, userId) {
  return axios.post(BASE_URL, {
    user,
    repository,
    userId,
  });
}

export function getRepoFromDB(userId) {
  return axios.get(BASE_URL, {
    params: {
      userId
    }
  });
};

export function updateRepo(user, repository, userId) {
  return axios.post(BASE_URL + '/refresh', {
    user,
    repository,
    userId,
  });
}

export function deleteRepo(user, repository, userId) {
  return axios.delete(BASE_URL, {
    params: {
      user,
      repository,
      userId,
    },
  });
}
