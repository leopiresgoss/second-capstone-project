import './style.css';
import fetchSeasons from './modules/series_api.js';
import renderPage from './modules/create_series.js';
import Popup from './modules/popup/popup.js';

// add comments event listener
const openPopUp = () => {
  const commentsBtn = document.querySelectorAll('.comment-btn');
  commentsBtn.forEach((button) => {
    button.addEventListener('click', () => {
      const contentSection = document.querySelector('.content');
      contentSection.classList.add('hide');
      const id = button.getAttribute('data-id');
      const popup = new Popup(id);
      popup.renderPopUp();
    });
  });
};

window.addEventListener('load', () => {
  fetchSeasons().then((data) => {
    renderPage(data);
    openPopUp();
  });
}, false);
