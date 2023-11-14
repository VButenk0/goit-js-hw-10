import axios from 'axios';
import { fetchBreeds } from './dog-api';
import { fetchdogByBreed } from './dog-api';

axios.defaults.headers.common['x-api-key'] =
  'live_Ev9ikRJKWdpo8gOATNRZ9jrWKuqdEbkLHNDuIxea4n70lKNzEsbRcqjuXxY9MIVk';

const refs = {
  breedSelectorEl: document.querySelector('.breed-select'),
  loaderEl: document.querySelector('.loader'),
  errorEl: document.querySelector('.error'),
  dogInfoEl: document.querySelector('.dog-info'),
};

window.addEventListener('DOMContentLoaded', onContentLoaded);
refs.breedSelectorEl.addEventListener('change', onSelectorChange);

function breedTemplate({ id, name }) {
  return `<option value = ${id}>${name}</option>`;
}

function breedTemplates(arr) {
  return arr.map(breedTemplate).join('');
}

function onContentLoaded() {
  refs.breedSelectorEl.classList.add('is-hidden');
  refs.loaderEl.classList.remove('is-hidden');
  fetchBreeds()
    .then(res => {
      refs.breedSelectorEl.classList.remove('is-hidden');
      refs.loaderEl.classList.add('is-hidden');

      refs.breedSelectorEl.innerHTML = breedTemplates(res);
    })
    .catch(err => console.log(refs.errorEl));
}

function dogInfoTemplate(data) {
  console.log(data);
  return `
      <img class="dog-image" src="${data[0].url}">
      <h2>${data[0].breeds[0].name}</h2>
      <p class="dog-descr">
        Breed suitable for ${data[0].breeds[0].bred_for}<br><br>
        <span class="accent">Height: </span>${data[0].breeds[0].height.metric}cm<br>
        <span class="accent">Weight: </span>${data[0].breeds[0].weight.metric}kg</p>
      <p><span class="accent">Temperament: </span>${data[0].breeds[0].temperament}</p>
      `;
}

function onSelectorChange(e) {
  const breedId = e.target.value;

  refs.dogInfoEl.classList.add('is-hidden');
  refs.loaderEl.classList.remove('is-hidden');

  fetchdogByBreed(breedId)
    .then(data => {
      refs.dogInfoEl.classList.remove('is-hidden');
      refs.loaderEl.classList.add('is-hidden');

      refs.dogInfoEl.innerHTML = dogInfoTemplate(data);
    })
    .catch(err => console.log(err));
}
