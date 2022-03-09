import Comment from './comment.js';

jest.mock('./comment.js');

describe('Test comment counter', () => {
  const comment = new Comment();
  test('should print number of comments from the api', async () => {
    const comments = await comment.getCommentsFromApi();
    expect(comment.commentsCounter(comments)).toBe(5);
  });

  test('in case of an empty comments, should return 0', () => {
    const comments = [];
    expect(comment.commentsCounter(comments)).toBe(0);
  });

  test('in case of not passing any param, should return 0', () => {
    expect(comment.commentsCounter()).toBe(0);
  });
});
