// pixabay-api.js
import axios from 'axios';

const API_KEY = '55187145-d3b914f8bfc13386f944f455c';
const BASE_URL = 'https://pixabay.com/api/';

// Основна функція запиту
export async function fetchImages(query, page = 1, perPage = 12) {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: page,
        per_page: perPage,
      },
    });

    return response.data; // повертає об’єкт { hits: [...], totalHits: N, ... }
  } catch (error) {
    console.error('Error fetching images:', error);
    throw error;
  }
}

// Функція, що використовується у main.js
export function getImagesByQuery(query, page = 1, perPage = 12) {
  return fetchImages(query, page, perPage);
}