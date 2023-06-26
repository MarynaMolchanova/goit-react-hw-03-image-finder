import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api';

export const fetchSearchImage = async (searchQuery, page) => {
  const response = await axios.get('/', {
    params: {
      key: '34983881-8eebfecbf2b0cd36b89881ac8',
      q: searchQuery,
      image_type: 'photo',
      orientation: 'horizontal',
      per_page: 12,
      page: page,
    },
  });
  return response.data;
};
