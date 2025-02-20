import axios from 'axios';

export class FetchImages {
  constructor() {
    this.baseURL = 'https://pixabay.com/api/';
    this.API_KEY = '29142435-196ab0ea47673651fa34d9a29';
    this.page = 1;
    this.perPage = 36;
    this.query = '';
  }

  setQuery(newQuery) {
    this.query = newQuery;
    this.page = 1;
  }

  setNextPage() {
    this.page += 1;
  }

  async getData() {
    const params = {
      key: this.API_KEY,
      q: this.query,
      per_page: this.perPage,
      page: this.page,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
    };

    const res = await axios.get(this.baseURL, { params });
    const data = await res.data;
    return data;
  }
}
