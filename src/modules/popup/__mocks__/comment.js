export default class Comment {
  // get data from involvement api
  getCommentsFromApi = () => Promise.resolve(
    [
      { 0: { comment: 'Hello', username: 'Jane', creation_date: '2022-03-09' } },
      { 1: { creation_date: '2022-03-09', username: 'Jane', comment: 'Hello' } },
      { 2: { creation_date: '2022-03-09', comment: 'Hello', username: 'Jane' } },
      { 3: { comment: 'Hello', username: 'Jane', creation_date: '2022-03-09' } },
      { 4: { username: 'Jane', creation_date: '2022-03-09', comment: 'Hello' } },
    ],
  );

  commentsCounter = (comments) => {
    if (comments) return comments.length;
    return 0;
  };
}