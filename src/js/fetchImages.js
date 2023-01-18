import axios from 'axios';

export async function fetchImages(value, page) {
  const BASE_URL = 'https://pixabay.com/api/';
  const API_KEY = '32913693-f7fa92b83cfd126c47697d95e';
  const options = `?key=${API_KEY}&q=${value}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`;
  return await axios
    .get(`${BASE_URL}${options}`)
    .then(response => response.data);
}
