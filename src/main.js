import SimpleLightbox from 'simplelightbox';
import iziToast from 'izitoast';
import icon from './img/toast-icon.svg';

import 'simplelightbox/dist/simple-lightbox.min.css';
import 'izitoast/dist/css/iziToast.min.css';

import { FetchImages } from './js/pixabey-api';
import { createGallery } from './js/render-functions';
import { hideLoader, showLoader } from './js/helpers/loader';
import { hideLoadMore, showLoadMore } from './js/helpers/loadMore';
import { smoothScroll } from './js/helpers/smoothScroll';

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

function onSearchFormSubmit(e) {
  e.preventDefault();

  const query = e.target.elements.query.value.trim();

  refs.galleryList.innerHTML = '';

  const isQueryEmpty = !query;
  if (isQueryEmpty) {
    hideLoadMore();
    return iziToast.warning({
      position: 'center',
      message: 'Your query is empty',
    });
  }

  fetchImages.setQuery(query);
  refs.galleryList.innerHTML = '';

  loadData();

  e.target.reset();
}

function onLoadMoreClick() {
  fetchImages.setNextPage();

  loadData();
}

async function loadData() {
  showLoader();
  hideLoadMore();

  try {
    const data = await fetchImages.getData();
    if (data.hits.length === 0) {
      throw new Error(
        'Sorry, there are no images matching your search query. Please try again!'
      );
    }

    const items = await data.hits;
    refs.galleryList.insertAdjacentHTML('beforeend', createGallery(items));
    gallery.refresh();

    if (fetchImages.page !== 1) {
      smoothScroll(refs.galleryList.lastElementChild);
    }

    const canLoadMore = fetchImages.page * fetchImages.perPage < data.totalHits;

    if (canLoadMore) {
      showLoadMore();
    } else {
      iziToast.info({
        position: 'center',
        message: "We're sorry, but you've reached the end of search results.",
      });
    }
  } catch ({ message }) {
    iziToast.error({
      position: 'center',
      messageColor: 'red',
      message: message,
      iconUrl: icon,
    });
  }

  hideLoader();
}
