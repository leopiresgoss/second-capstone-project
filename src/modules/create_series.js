// This function creates the div that carries individual seasons with the components inside it
const createSeries = (movie) => {
  const series = document.createElement('div');
  const imageHolder = document.createElement('p');
  const title = document.createElement('h2');
  const summary = document.createElement('p');
  const likeHolder = document.createElement('p');
  const button = document.createElement('button');
  const likeButton = document.createElement('button');
  series.classList.add('column');
  imageHolder.classList.add('column-image');
  imageHolder.style.backgroundImage = `url('${movie.image.medium}')`;

  title.textContent = `Season ${movie.number}`;
  summary.innerHTML = movie.summary;
  button.textContent = 'Comments';
  button.classList.add('comment-btn');
  button.setAttribute('data-id', `${movie.id}`);
  likeHolder.classList.add('like-item');
  likeHolder.setAttribute('dataid', `${movie.id}`);
  likeButton.textContent = 'like';
  likeButton.classList.add('like-btn');
  likeButton.type = 'button';
  likeButton.setAttribute('dataid', `${movie.id}`);

  series.append(imageHolder, title, likeButton, likeHolder, summary, button);

  return series;
};

// For each element of the created season, add them to the container that carries all seasons
const renderPage = (movies) => {
  const seriesItems = document.querySelector('.row');
  seriesItems.innerHTML = '';
  movies.forEach((movie) => {
    // check if it is not empty
    if (movie.image !== null) {
      seriesItems.appendChild(createSeries(movie));
    }
  });
};

export default renderPage;
