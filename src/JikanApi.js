import axios from 'axios';

const API_BASE_URL = 'https://api.jikan.moe/v4';

export const fetchAnime = async (query) => {
  if (!query) return [];
  try {
    const response = await axios.get(`${API_BASE_URL}/anime`, { params: { q: query } });
    return response.data.data;
  } catch (error) {
    console.error('Error fetching anime:', error);
    throw error;
  }
};
