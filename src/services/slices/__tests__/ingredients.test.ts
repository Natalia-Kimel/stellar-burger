import ingredientsSliceReducer, {
  initialState,
  getIngredientsThunk
} from '../ingredients';

const mockIngredients = [
  {
    _id: '643d69a5c3f7b9001cfa093c',
    name: 'Краторная булка N-200i',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
    id: '1'
  },
  {
    _id: '643d69a5c3f7b9001cfa093e',
    name: 'Филе Люминесцентного тетраодонтимформа',
    type: 'main',
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: 'https://code.s3.yandex.net/react/code/meat-03.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
    id: '2'
  },
  {
    _id: '643d69a5c3f7b9001cfa0942',
    name: 'Соус Spicy-X',
    type: 'sauce',
    proteins: 30,
    fat: 20,
    carbohydrates: 40,
    calories: 30,
    price: 90,
    image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png',
    id: '3'
  }
];

describe('тесты асинхронных экшенов', () => {
  test('getIngredients fulfilled', () => {
    const newState = ingredientsSliceReducer(
      initialState,
      getIngredientsThunk.fulfilled(mockIngredients, '')
    );
    const { ingredients, isLoading } = newState;

    expect(isLoading).toBe(false);
    expect(ingredients).toEqual(mockIngredients);
  });

  test('getIngredients pending', () => {
    const newState = ingredientsSliceReducer(
      initialState,
      getIngredientsThunk.pending('')
    );
    const { isLoading } = newState;

    expect(isLoading).toBe(true);
  });

  test('getIngredients rejected', () => {
    const newState = ingredientsSliceReducer(
      initialState,
      getIngredientsThunk.rejected({ name: '', message: 'test error' }, '')
    );
    const { error, isLoading } = newState;

    expect(isLoading).toBe(false);
    expect(error).toBe('test error');
  });
});
