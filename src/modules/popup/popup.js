import Comment from './comment.js';

export default class Popup extends Comment {
  // get season id
  constructor(id) {
    super();
    this.id = id;
  }

  renderPopUp = () => {
    this.#getDataFromAPI()
      .then(
        async (resp) => {
          await this.#displayPopup(resp);
          this.#closePopUp();
        },
      );
  };

  // get data from api
  #getDataFromAPI = async () => {
    const requestURL = `
      https://api.tvmaze.com/seasons/${this.id}
    `;
    const res = await fetch(requestURL);
    return res.json();
  };

  // render dom
  #displayPopup = async (resp) => {
    const comments = await this.getCommentsFromApi(resp.id);
    const commentsDiv = this.#displayComments(comments);

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
        ${commentsDiv.innerHTML}
      </div>
    `;
    document.body.appendChild(popup);
  };

  // close popup
  #closePopUp = () => {
    const closeBtn = document.getElementById('close-btn');
    closeBtn.addEventListener('click', () => {
      const contentSection = document.querySelector('.content');
      contentSection.classList.remove('hide');
      const popup = document.getElementById('popup');
      document.body.removeChild(popup);
    });
  };

  // display comments
  #displayComments = (comments) => {
    // display comments
    const commentsBlock = document.createElement('div');
    commentsBlock.classList.add('comments-block');

    const commentsTitile = document.createElement('h3');
    commentsTitile.textContent = `Comments (${comments.length})`;

    const commentsList = document.createElement('ul');
    commentsList.classList.add('comments');

    comments.forEach((comment) => {
      const commentLi = document.createElement('li');
      // TODO: add comment details from comment obj
      commentLi.textContent = '03/11/2021: I\'d love to buy it';
      commentsList.appendChild(commentLi);
    });
    commentsBlock.append(commentsTitile, commentsList);
    return commentsBlock;
  };
}