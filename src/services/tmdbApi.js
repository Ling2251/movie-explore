const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1Mjk1NmE5MGQ4MDZhMWYxODk0MWZhYTI3ZDk4ZjJiMyIsIm5iZiI6MTc1OTk2NTkxNi43NzQwMDAyLCJzdWIiOiI2OGU2ZjJkYzdmOWNkNjQxMzE0MWRhMjMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.TH4dvhrh9BumE2pNTyUXgMmt-lgZbQun2h2MwXTpP6c';

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
};

export const fetchMovies = async (page = 1) => {
  const response = await fetch(
    `${API_BASE_URL}/movie/popular?language=en-US&page=${page}`,
    options
  );
  
  if (!response.ok) {
    throw new Error('Failed to fetch movies');
  }
  
  return response.json();
};

export const searchMovies = async (query, page = 1) => {
  const response = await fetch(
    `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}&language=en-US&page=${page}`,
    options
  );
  
  if (!response.ok) {
    throw new Error('Failed to search movies');
  }
  
  return response.json();
};