export default class Popup {
  // get season id
  constructor(id) {
    this.id = id;
  }

  renderPopUp = () => {
    this.#getDataFromAPI()
      .then(
        (resp) => {
          this.#displayPopup(resp);
          this.#closePopUp();
        },
      );
  }

  // get data from api
  #getDataFromAPI = async () => {
    const requestURL = `
      https://api.tvmaze.com/seasons/${this.id}
    `;
    const res = await fetch(requestURL);
    return res.json();
  }

  // render dom
  #displayPopup = (resp) => {
    const popup = document.createElement('div');
    popup.id = 'popup';
    popup.innerHTML = `
      <div class="modal">
        <button type="button" id="close-btn">X</button>
        <img src="${resp.image.original}" alt="">
        <h2 class="season 1">Season 1</h2>
        <ul class="date">
          <li id="premerier-date">
            <p>Premerier Date:</p>
            <p>${resp.premiereDate}</p>
          </li>
          <li id="end-date">
            <p>End Date:</p>
            <p>${resp.endDate}</p>
          </li>
        </ul>
        <div class="summary">
          ${resp.summary}
        </div>
      </div>
    `;

    document.body.appendChild(popup);
  }

  // close popup
  #closePopUp = () => {
    const closeBtn = document.getElementById('close-btn');
    closeBtn.addEventListener('click', () => {
      const contentSection = document.querySelector('.content');
      contentSection.classList.remove('hide');
      const popup = document.getElementById('popup');
      document.body.removeChild(popup);
    });
  }
}