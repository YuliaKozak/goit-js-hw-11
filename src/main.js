// main.js
import { getImagesByQuery } from './js/pixabay-api';
import { createGallery, clearGallery, showLoader, hideLoader } from './js/render-functions';

// Імпорт iziToast
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

// Селектори
const searchForm = document.querySelector('.form');
const galleryContainer = document.querySelector('.gallery');

// Обробка сабміту форми
searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const query = e.target.elements['search-text'].value.trim();

  if (!query) {
    iziToast.warning({
      title: 'Warning',
      message: 'Please enter a search query!',
    });
    return;
  }

  // Показати лоадер та очистити попередні результати
  showLoader();
  clearGallery();

  // Запит на бекенд
  getImagesByQuery(query)
    .then(data => {
      hideLoader();

      if (!data.hits.length) {
        iziToast.info({
          title: 'No results',
          message: 'Sorry, there are no images matching your search query. Please try again!',
        });
        return;
      }

      // Відображення галереї
      createGallery(data.hits);
    })
    .catch(error => {
      hideLoader();
      iziToast.error({
        title: 'Error',
        message: 'Failed to fetch images. Try again later.',
      });
      console.error(error);
    });
});