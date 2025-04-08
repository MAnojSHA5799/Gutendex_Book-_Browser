import axios from 'axios';

const BASE_URL = 'https://skunkworks.ignitesol.com:8000';

export const fetchBooks = async ({
  topic,
  search = '',
  page = 1,
}) => {
  const params = {
    mime_type: 'image', // Books with covers
    topic,
    search,
    page,
  };

  const response = await axios.get(`${BASE_URL}/books`, { params });
  return response.data;
};
