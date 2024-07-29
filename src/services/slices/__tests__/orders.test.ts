import ordersSliceReducer, {
  initialState,
  getOrderByNumberThunk
} from '../orders';

const mockOrders = {
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
  ]
};

describe('тесты асинхронных экшенов', () => {
  test('getOrderByNumber fulfilled', () => {
    const newState = ordersSliceReducer(
      initialState,
      getOrderByNumberThunk.fulfilled(mockOrders, '', 0)
    );
    const { orderData, isLoading } = newState;

    expect(isLoading).toBe(false);
    expect(orderData).toEqual(mockOrders.orders);
  });

  test('getOrderByNumber pending', () => {
    const newState = ordersSliceReducer(
      initialState,
      getOrderByNumberThunk.pending('', 0)
    );
    const { isLoading } = newState;

    expect(isLoading).toBe(true);
  });

  test('getOrderByNumber rejected', () => {
    const newState = ordersSliceReducer(
      initialState,
      getOrderByNumberThunk.rejected({ name: '', message: 'test error' }, '', 0)
    );
    const { error, isLoading } = newState;

    expect(isLoading).toBe(false);
    expect(error).toBe('test error');
  });
});
