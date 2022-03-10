import './style.css';
import '@fortawesome/fontawesome-free/js/all.js';
import logo from './billions.svg';
import fetchSeasons from './modules/series_api.js';
import renderPage from './modules/create_series.js';
import Popup from './modules/popup/popup.js';
import { sendLike, getlikes, updateLikes } from './modules/likes.js';
import itemsCounter from './modules/counter.js';

// add logo
const addLogo = () => {
  const logoDiv = document.querySelector('#logo');
  const img = document.createElement('img');
  img.src = logo;
  img.alt = 'logo';
  logoDiv.appendChild(img);
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
  fetchSeasons().then(() => {
    const headerlink = document.querySelector('.headlink');
    const columns = document.querySelectorAll('.column');
    headerlink.innerHTML = `Seasons(${itemsCounter(columns)})`;
  });
};

// This is to add a like FOR A PARTICULAR sesason of the series and post it to the API
const addLike = () => {
  const likebtn = document.querySelectorAll('.like-btn');
  likebtn.forEach((item) => {
    item.addEventListener('click', async (e) => {
      const likeId = e.currentTarget.getAttribute('dataid');
      const data = {
        item_id: likeId,
      };
      const likeItem = e.currentTarget.parentNode.querySelector('.like-item');
      const id = likeItem.getAttribute('dataid');
      await sendLike(data);
      updateLikes(id).then((like) => {
        if (like) {
          likeItem.innerHTML = like;
        }
      });
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
