import './style.css';
import fetchSeasons from './modules/series_api.js';
import renderPage from './modules/create_series.js';
import Popup from './modules/popup/popup.js';

window.addEventListener('load', () => {
  fetchSeasons().then((data) => {
    renderPage(data);
  });
}, false);

// test popup window
const popup = new Popup('11227');
popup.renderPopUp();