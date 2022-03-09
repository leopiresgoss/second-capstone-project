import Comment from './comment.js';

jest.mock('./comment.js');

test('should print number of comments from the api', async () => {
  const comment = new Comment();
  const comments = await comment.getCommentsFromApi();
  expect(comment.commentsCounter(comments)).toBe(5);
});