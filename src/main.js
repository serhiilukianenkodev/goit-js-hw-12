import SimpleLightbox from 'simplelightbox';
import iziToast from 'izitoast';

import 'simplelightbox/dist/simple-lightbox.min.css';
import 'izitoast/dist/css/iziToast.min.css';

import { FetchImages } from './js/pixabey-api';
import { createGallery } from './js/render-functions';
import { hideLoader, showLoader } from './js/helpers/loader';

const refs = {
  form: document.querySelector('.js-form'),
  galleryList: document.querySelector('.js-gallery'),
  loadMoreBtn: document.querySelector('.js-load-more'),
};

refs.form.addEventListener('submit', onSearchFormSubmit);
refs.loadMoreBtn.addEventListener('click', onLoadMoreClick);

const options = {
  captionSelector: 'img',
  captionsData: 'alt',
  captionDelay: 250,
};

const fetchImages = new FetchImages();
const gallery = new SimpleLightbox('.gallery a', options);

async function onSearchFormSubmit(e) {
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
  //

  try {
    fetchImages.setQuery(query);
    const data = await fetchImages.getData();
    // const canLoadMore = data

    console.log(data);

    if (data.hits.length === 0) {
      throw new Error(
        'Sorry, there are no images matching your search query. Please try again!'
      );
    }

    const items = await data.hits;
    refs.galleryList.innerHTML = createGallery(items);
    gallery.refresh();
  } catch ({ message }) {
    iziToast.error({
      position: 'center',
      messageColor: 'red',
      message: message,
      iconUrl: 'img/toast-icon.svg',
    });
  }

  hideLoader();

  //

  // getPhotos(query)
  //   .then(({ data }) => {
  //     if (data.hits.length === 0) {
  //       throw new Error(
  //         'Sorry, there are no images matching your search query. Please try again!'
  //       );
  //     }

  //     return data.hits;
  //   })
  //   .then(items => {
  //     refs.galleryList.innerHTML = createGallery(items);
  //     gallery.refresh();
  //   })
  //   .catch(({ message }) => {
  //     iziToast.error({
  //       position: 'center',
  //       messageColor: 'red',
  //       message: message,
  //     });
  //   })
  //   .finally(() => hideLoader());

  e.target.reset();
}

async function onLoadMoreClick() {
  fetchImages.setNextPage();

  showLoader();
  // hide btn

  try {
    const data = await fetchImages.getData();
    // const canLoadMore = data

    console.log(data);

    // if (data.hits.length === 0) {
    //   throw new Error(
    //     'Sorry, there are no images matching your search query. Please try again!'
    //   );
    // }

    const items = await data.hits;
    refs.galleryList.insertAdjacentHTML('beforeend', createGallery(items));
    gallery.refresh();
  } catch ({ message }) {
    iziToast.error({
      position: 'center',
      messageColor: 'red',
      message: message,
      iconUrl: '/img/toast-icon.svg',
    });
  }

  hideLoader();
}
