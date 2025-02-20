const loadMoreBnt = document.querySelector('.js-load-more');

export function showLoadMore() {
  loadMoreBnt.classList.remove('hidden');
}

export function hideLoadMore() {
  loadMoreBnt.classList.add('hidden');
}
