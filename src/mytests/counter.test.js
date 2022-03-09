import itemsCounter from '../modules/counter.js';

describe('items counter test', () => {
  test('itemsCounter', () => {
    const arr = [
      {
        season: 1,
      },
      {
        season: 2,
      },
      {
        season: 3,
      },
      {
        season: 4,
      },
      {
        season: 5,
      },
    ];
    expect(itemsCounter(arr)).toBe(5);
  });
});
