export function createGallery(list) {
  return list.map(item => createCard(item)).join('');
}

function createCard(item) {
  const {
    webformatURL,
    largeImageURL,
    tags,
    likes,
    views,
    comments,
    downloads,
  } = item;
  return `        
        <li class = "gallery-card">
          <a href="${largeImageURL}">
            <img src="${webformatURL}" alt="${tags}" width="360" height="200" class = "card-img" />
            <ul class = "card-stats">
              <li class = "card-stat">
                <p>Likes</p>
                <span>${likes}</span>
              </li>
              <li class = "card-stat">
                <p>Views</p>
                <span>${views}</span>
                </li>
              <li class = "card-stat">
                <p>Comments</p>
                <span>${comments}</span>
              </li>
              <li class = "card-stat">
                <p>Downloads</p>
                <span>${downloads}</span>
              </li>
            </ul>
          </a>
        </li>`;
}
