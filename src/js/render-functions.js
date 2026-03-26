// render-functions.js

// Імпорт стилів SimpleLightbox
import 'simplelightbox/dist/simple-lightbox.min.css';

// Імпорт JS SimpleLightbox
import SimpleLightbox from 'simplelightbox';

let lightbox;

// Створення галереї
export function createGallery(images) {
  const galleryContainer = document.querySelector('.gallery');

  // Додаємо усі зображення за одну операцію
  galleryContainer.innerHTML = images
    .map(
      ({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) =>
        `<li class="gallery-item">
          <a href="${largeImageURL}">
            <img src="${webformatURL}" alt="${tags}" loading="lazy" />
          </a>
          <div class="info">
            <p><strong>Likes:</strong> ${likes}</p>
            <p><strong>Views:</strong> ${views}</p>
            <p><strong>Comments:</strong> ${comments}</p>
            <p><strong>Downloads:</strong> ${downloads}</p>
          </div>
        </li>`
    )
    .join('');

  // Ініціалізація або оновлення SimpleLightbox
  if (lightbox) {
    lightbox.refresh();
  } else {
    lightbox = new SimpleLightbox('.gallery a', {
      captions: true,
      captionsData: 'alt',
      captionDelay: 250,
    });
  }
}

// Очистка галереї
export function clearGallery() {
  const galleryContainer = document.querySelector('.gallery');
  galleryContainer.innerHTML = '';
}

// Показати лоадер
export function showLoader() {
  const loader = document.querySelector('.loader');
  if (loader) loader.style.display = 'block';
}

// Сховати лоадер
export function hideLoader() {
  const loader = document.querySelector('.loader');
  if (loader) loader.style.display = 'none';
}