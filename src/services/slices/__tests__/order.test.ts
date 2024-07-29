import orderSliceReducer, { initialState, getOrdersThunk } from '../order';

const mockOrders = [
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
];

describe('тесты асинхронных экшенов', () => {
  test('getOrders fulfilled', () => {
    const newState = orderSliceReducer(
      initialState,
      getOrdersThunk.fulfilled(mockOrders, '')
    );
    const { orders, isLoading } = newState;

    expect(isLoading).toBe(false);
    expect(orders).toEqual(mockOrders);
  });

  test('getOrders pending', () => {
    const newState = orderSliceReducer(
      initialState,
      getOrdersThunk.pending('')
    );
    const { isLoading } = newState;

    expect(isLoading).toBe(true);
  });

  test('getOrders rejected', () => {
    const newState = orderSliceReducer(
      initialState,
      getOrdersThunk.rejected({ name: '', message: 'test error' }, '')
    );
    const { error, isLoading } = newState;

    expect(isLoading).toBe(false);
    expect(error).toBe('test error');
  });
});
