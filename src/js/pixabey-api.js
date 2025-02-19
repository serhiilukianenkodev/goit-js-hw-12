import axios from 'axios';

const API_KEY = '29142435-196ab0ea47673651fa34d9a29';
const baseURL = 'https://pixabay.com/api/';

// 'https://pixabay.com/api/?key=29142435-196ab0ea47673651fa34d9a29&q=yellow+flowers&image_type=photo&pretty=true';

export function getPhotos(query) {
  const params = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  };

  return axios.get(baseURL, { params });
}
