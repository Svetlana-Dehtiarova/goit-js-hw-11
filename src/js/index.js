import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { fetchImages } from './fetchImages';
import { markupImages } from './markupImages';

const formEl = document.querySelector('.search-form');
const galleryEl = document.querySelector('.gallery');
const loadMoreButton = document.querySelector('.load-more');

let searchInput = '';
let currentPage = 1;
let currentHits = 0;

formEl.addEventListener('submit', onFormSubmit);
async function onFormSubmit(event) {
  event.preventDefault();
  searchInput = event.target.searchQuery.value;
  currentPage = 1;
  if (searchInput.trim === '') {
    alertNoImagesFound();
    return;
  }
  const response = await fetchImages(searchInput, currentPage);
  let currentHits = response.hits.length;
  console.log(response);
  if (response.totalHits > 40) {
    loadMoreButton.classList.remove('is-hidden');
  } else {
    loadMoreButton.classList.add('is-hidden');
  }
  try {
    if (response.totalHits > 0) {
      Notiflix.Notify.success(`Hooray! We found ${response.totalHits} images.`);
      galleryEl.innerHTML = '';
      createMarkupImages(response.hits);
      simpLightbox.refresh();

      const { height: cardHeight } = document
        .querySelector('.gallery')
        .firstElementChild.getBoundingClientRect();

      window.scrollBy({
        top: cardHeight * -100,
        behavior: 'smooth',
      });
    }

    if (response.totalHits === 0) {
      galleryEl.innerHTML = '';
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      loadMoreButton.classList.add('is-hidden');
    }
  } catch (error) {
    console.log(error);
  }
}

loadMoreButton.addEventListener('click', onLoadMoreButtonClick);

async function onLoadMoreButtonClick() {
  currentPage += 1;
  const response = await fetchImages(searchInput, currentPage);
  createMarkupImages(response.hits);
  simpLightbox.refresh();
  currentHits += response.hits.length;

  if (currentHits === response.totalHits) {
    loadMoreButton.classList.add('is-hidden');
  }
}

function createMarkupImages(array) {
  galleryEl.insertAdjacentHTML('beforeend', markupImages(array));
}

function alertNoImagesFound() {
  Notiflix.Notify.failure(
    'Sorry, there are no images matching your search query. Please try again.'
  );
}

let simpLightbox = new SimpleLightbox('.photo-card a', {
  captions: true,
  captionsData: 'alt',
  captionDelay: 250,
});
