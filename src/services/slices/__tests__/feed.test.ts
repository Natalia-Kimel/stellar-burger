import feedSliceReducer, { getFeedThunk, initialState } from '../feed';

const mockFeedResponse = {
  success: true,
  orders: [
    {
      _id: '669aedd1119d45001b4fa28a',
      ingredients: ['643d69a5c3f7b9001cfa093c', '643d69a5c3f7b9001cfa093e'],
      status: 'done',
      name: 'Краторный люминесцентный бургер',
      createdAt: '2024-07-19T22:50:57.102Z',
      updatedAt: '2024-07-19T22:50:57.498Z',
      number: 46528
    },
    {
      _id: '669aed60119d45001b4fa289',
      ingredients: [
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa0940',
        '643d69a5c3f7b9001cfa0947'
      ],
      status: 'done',
      name: 'Флюоресцентный фалленианский метеоритный бургер',
      createdAt: '2024-07-19T22:49:04.841Z',
      updatedAt: '2024-07-19T22:49:05.319Z',
      number: 46527
    }
  ],
  total: 46154,
  totalToday: 116
};

describe('тесты асинхронных экшенов', () => {
  test('getFeed fulfilled', () => {
    const newState = feedSliceReducer(
      initialState,
      getFeedThunk.fulfilled(mockFeedResponse, '')
    );
    const { orders, feed, isLoading } = newState;

    expect(isLoading).toBe(false);
    expect(orders).toEqual(mockFeedResponse.orders);
    expect(feed.total).toEqual(mockFeedResponse.total);
    expect(feed.totalToday).toEqual(mockFeedResponse.totalToday);
  });

  test('getFeed pending', () => {
    const newState = feedSliceReducer(initialState, getFeedThunk.pending(''));
    const { isLoading } = newState;

    expect(isLoading).toBe(true);
  });

  test('getFeed rejected', () => {
    const newState = feedSliceReducer(
      initialState,
      getFeedThunk.rejected({ name: '', message: 'test error' }, '')
    );
    const { error, isLoading } = newState;

    expect(isLoading).toBe(false);
    expect(error).toBe('test error');
  });
});
