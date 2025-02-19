import SimpleLightbox from 'simplelightbox';
import iziToast from 'izitoast';

import 'simplelightbox/dist/simple-lightbox.min.css';
import 'izitoast/dist/css/iziToast.min.css';

import { getPhotos } from './js/pixabey-api';
import { createGallery } from './js/render-functions';
import { hideLoader, showLoader } from './js/helpers/loader';

const refs = {
  form: document.querySelector('.js-form'),
  galleryList: document.querySelector('.js-gallery'),
};

refs.form.addEventListener('submit', onSearchFormSubmit);

const options = {
  captionSelector: 'img',
  captionsData: 'alt',
  captionDelay: 250,
};
const gallery = new SimpleLightbox('.gallery a', options);

function onSearchFormSubmit(e) {
  e.preventDefault();

  const query = e.target.elements.query.value.trim();
  const isQueryEmpty = !query;
  if (isQueryEmpty)
    return iziToast.warning({
      position: 'center',
      message: 'Your query is empty',
    });

  refs.galleryList.innerHTML = '';
  showLoader();

  getPhotos(query)
    .then(({ data }) => {
      if (data.hits.length === 0) {
        throw new Error(
          'Sorry, there are no images matching your search query. Please try again!'
        );
      }

      return data.hits;
    })
    .then(items => {
      refs.galleryList.innerHTML = createGallery(items);
      gallery.refresh();
    })
    .catch(({ message }) => {
      iziToast.error({
        position: 'center',
        messageColor: 'red',
        message: message,
      });
    })
    .finally(() => hideLoader());

  e.target.reset();
}
