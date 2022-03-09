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
          this.#addFormListener();
          // await this.addComments();
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
        <form action="/" method="POST">
          <h3>Add a comment</h3>
          <input type="text" name="username" id="name" placeholder="Your name" maxlength="30" required>
          <textarea name="comment" id="new-comment" placeholder="Your insights" cols="30" rows="10" maxlength="260" required></textarea>
          <button type="submit" id="submit-comment" data-id="${resp.id}">Comment</button>
        </form>
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
      commentLi.textContent = `
        ${comment.creation_date} ${comment.username}: ${comment.comment} 
      `;
      commentsList.appendChild(commentLi);
    });
    commentsBlock.append(commentsTitile, commentsList);
    return commentsBlock;
  };

  // add comment listener
  #addFormListener = () => {
    const form = document.querySelector('form');
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const username = document.getElementById('name').value;
      const comment = document.getElementById('new-comment').value;
      const button = document.getElementById('submit-comment');
      const id = button.getAttribute('data-id');

      this.addComments({
        username,
        comment,
        id,
      }).then(() => console.log('it worked'));
      form.reset();
    });
  }
}