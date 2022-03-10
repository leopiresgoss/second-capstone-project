import './style.css';
import '@fortawesome/fontawesome-free/js/all.js';
import logo from './billions.svg';
import fetchSeasons from './modules/series_api.js';
import renderPage from './modules/create_series.js';
import Popup from './modules/popup/popup.js';
import { sendLike, getlikes } from './modules/likes.js';

// add logo
const addLogo = () => {
  const img = document.querySelector('#logo img');
  img.src = logo;
};

// add comments event listener
const openPopUp = () => {
  const commentsBtn = document.querySelectorAll('.comment-btn');
  commentsBtn.forEach((button) => {
    button.addEventListener('click', () => {
      document.body.classList.add('hide');
      const id = button.getAttribute('data-id');
      const popup = new Popup(id);
      popup.renderPopUp();
    });
  });
};

// This function is used to display the likes on each of the seasons
const displayLikes = () => {
  const likeP = document.querySelectorAll('.like-item');
  likeP.forEach((item) => {
    item.innerHTML = 0;
  });

  // Use the getLikes funtions to get likes from the API
  getlikes().then((items) => {
    likeP.forEach((item) => {
      const itemId = item.getAttribute('dataid');
      if (itemId in items) {
        item.innerHTML = items[itemId];
      }
    });
  });
};

// This is to implement items counter on the homepage and update on the header section
const seasonsCounter = () => {
  fetchSeasons().then((data) => {
    const headerlink = document.querySelector('.headlink');
    headerlink.innerHTML = `${data.length} Seasons`;
  });
  // const columns = document.querySelectorAll('.column');
  // const headerlink = document.querySelector('.headlink');
  // headerlink.innerHTML =  columns.length + " Seasons";
};

// This is to add a like FOR A PARTICULAR sesason of the series and post it to the API
const addLike = () => {
  const likebtn = document.querySelectorAll('.like-btn');
  likebtn.forEach((item) => {
    item.addEventListener('click', (e) => {
      const likeId = e.target.getAttribute('dataid');
      const data = {
        item_id: likeId,
      };
      sendLike(data);
      // window.location.reload();
    });
  });
};

window.addEventListener('load', () => {
  fetchSeasons().then((data) => {
    renderPage(data);
    addLogo();
    openPopUp();
    addLike();
    displayLikes();
    seasonsCounter();
  });
}, false);
