import './style.css';
import fetchSeasons from './modules/series_api.js';
import renderPage from './modules/create_series.js';

window.addEventListener('load', () => {
  fetchSeasons().then((data) => {
    console.log(data);
    renderPage(data);
  });
}, false);
