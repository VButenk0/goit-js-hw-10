import axios from 'axios';
import Notiflix from 'notiflix';

axios.defaults.headers.common['x-api-key'] =
  'live_Ev9ikRJKWdpo8gOATNRZ9jrWKuqdEbkLHNDuIxea4n70lKNzEsbRcqjuXxY9MIVk';

export function fetchBreeds() {
  const BASE_URL = 'https://api.thedogapi.com';
  const END_POINT = '/v1/breeds';
  const url = BASE_URL + END_POINT;

  return axios
    .get(url)
    .then(res => {
      return res.data;
    })
    .catch(err => {
      return Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
    });
}

export function fetchdogByBreed(breedId) {
  const BASE_URL = 'https://api.thedogapi.com';
  const END_POINT = '/v1/images/search';
  const PARAMS = `?breed_ids=${breedId}`;
  const url = BASE_URL + END_POINT + PARAMS;

  return axios
    .get(url)
    .then(res => {
      return res.data;
    })
    .catch(err => {
      return Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
    });
}
