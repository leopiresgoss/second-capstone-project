const BASE_URL = 'https://api.tvmaze.com/shows/3606/seasons';

// This is an Async callback used to fetch all the sesons for a given series
const fetchSeasons = async () => {
  const response = await fetch(BASE_URL);
  const scores = response.json();
  return scores;
};

export default fetchSeasons;
