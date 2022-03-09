import Comment from './src/modules/popup/comment.js';

test('should print number of comments', () => {
  const comment = new Comment();
  expect(comment.commentsCounter([])).toBe(0);
});