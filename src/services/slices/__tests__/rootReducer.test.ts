import { rootReducer } from '../../store';

test('тест корневого редюсера', () => {
  const state = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });
  const expectedState = {
    burgerConstructor: {
      isLoading: false,
      error: '',
      orderRequest: false,
      orderModalData: null,
      constructorItems: {
        bun: {},
        ingredients: []
      }
    },
    feed: {
      isLoading: false,
      orders: [],
      feed: {
        total: 0,
        totalToday: 0
      },
      error: null
    },
    ingredients: {
      isLoading: false,
      ingredients: [],
      error: null
    },
    order: {
      isLoading: false,
      error: null,
      orders: []
    },
    orders: {
      isLoading: false,
      error: null,
      orderData: []
    },
    user: {
      isLoading: false,
      isAuthChecked: false,
      user: {
        email: '',
        name: ''
      },
      error: null
    }
  };
  expect(state).toEqual(expectedState);
});
