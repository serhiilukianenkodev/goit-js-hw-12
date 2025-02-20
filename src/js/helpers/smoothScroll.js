export function smoothScroll(elem) {
  const { height: cardHeight } = elem.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
