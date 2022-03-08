const BASE_URL = 'https://api.tvmaze.com/shows/3606/seasons';

  // This is an Async callback used to fetch all the sesons for a given series
const fetchSeasons = async () => {
  console.log("Hello there Richie");
  const response = await fetch(BASE_URL);
  const scores = response.json();
  console.log(scores);
  return scores;
};

export default fetchSeasons;
