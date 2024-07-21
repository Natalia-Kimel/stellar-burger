import burgerConstructorSliceReducer, {
  initialState,
  addIngredient,
  deleteIngredient,
  moveIngredientUp,
  moveIngredientDown,
  closeOrder,
  orderBurgerThunk
} from '../burgerConstructor';

const mockIngredient = {
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
  id: '4'
};

const mockBunIngredient = {
  _id: '643d69a5c3f7b9001cfa093d',
  name: 'Флюоресцентная булка R2-D3',
  type: 'bun',
  proteins: 44,
  fat: 26,
  carbohydrates: 85,
  calories: 643,
  price: 988,
  image: 'https://code.s3.yandex.net/react/code/bun-01.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
  id: '5'
};

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

const mockOrderResponse = {
  success: true,
  name: 'Space астероидный краторный бессмертный экзо-плантаго бургер',
  order: {
    ingredients: [
      '643d69a5c3f7b9001cfa093c',
      '643d69a5c3f7b9001cfa0941',
      '643d69a5c3f7b9001cfa093e',
      '643d69a5c3f7b9001cfa093c'
    ],
    _id: '669af7be119d45001b4fa2b5',
    status: 'done',
    name: 'Space астероидный краторный бессмертный экзо-плантаго бургер',
    createdAt: '2024-07-19T23:33:18.705Z',
    updatedAt: '2024-07-19T23:33:19.171Z',
    number: 46536
  }
};

describe('тесты burgerConstructor', () => {
  describe('тесты синхронных экшенов', () => {
    test('добавить ингредиент: main/sauce', () => {
      const newState = burgerConstructorSliceReducer(
        initialState,
        addIngredient(mockIngredient)
      );
      const { constructorItems } = newState;

      expect(constructorItems.ingredients.length).toBe(1);
      expect(constructorItems.ingredients[0].name).toEqual(
        'Филе Люминесцентного тетраодонтимформа'
      );
    });

    test('добавить ингредиент: bun', () => {
      const newState = burgerConstructorSliceReducer(
        initialState,
        addIngredient(mockBunIngredient)
      );
      const { constructorItems } = newState;

      expect(constructorItems.bun.name).toEqual('Флюоресцентная булка R2-D3');
    });

    test('удалить ингредиент', () => {
      const newState = burgerConstructorSliceReducer(
        {
          ...initialState,
          constructorItems: {
            bun: {},
            ingredients: [mockIngredient]
          }
        },
        deleteIngredient(mockIngredient)
      );
      const { constructorItems } = newState;

      expect(constructorItems.ingredients).toEqual([]);
    });

    test('передвинуть ингредиент вверх', () => {
      const state = {
        ...initialState,
        constructorItems: {
          bun: {},
          ingredients: mockIngredients
        }
      };
      const newState = burgerConstructorSliceReducer(
        state,
        moveIngredientUp(state.constructorItems.ingredients[2])
      );
      const { constructorItems } = newState;

      expect(constructorItems.ingredients[1]).toEqual(mockIngredients[2]);
    });

    test('передвинуть ингредиент вниз', () => {
      const state = {
        ...initialState,
        constructorItems: {
          bun: {},
          ingredients: mockIngredients
        }
      };
      const newState = burgerConstructorSliceReducer(
        state,
        moveIngredientDown(state.constructorItems.ingredients[1])
      );
      const { constructorItems } = newState;

      expect(constructorItems.ingredients[2]).toEqual(mockIngredients[1]);
    });

    test('закрыть окно заказа', () => {
      const newState = burgerConstructorSliceReducer(
        initialState,
        closeOrder()
      );
      const { orderRequest, orderModalData } = newState;

      expect(orderRequest).toBe(false);
      expect(orderModalData).toBe(null);
    });
  });

  describe('тесты асинхронных экшенов', () => {
    test('orderBurger fulfilled', () => {
      const newState = burgerConstructorSliceReducer(
        initialState,
        orderBurgerThunk.fulfilled(mockOrderResponse, '', [])
      );
      const { orderModalData, orderRequest, constructorItems, isLoading } =
        newState;

      expect(isLoading).toBe(false);
      expect(orderModalData).toEqual(mockOrderResponse.order);
      expect(orderRequest).toBe(false);
      expect(constructorItems).toEqual({
        bun: {},
        ingredients: []
      });
    });

    test('orderBurger pending', () => {
      const newState = burgerConstructorSliceReducer(
        initialState,
        orderBurgerThunk.pending('', [])
      );
      const { isLoading } = newState;

      expect(isLoading).toBe(true);
    });

    test('orderBurger rejected', () => {
      const newState = burgerConstructorSliceReducer(
        initialState,
        orderBurgerThunk.rejected({ name: '', message: 'test error' }, '', [])
      );
      const { error, isLoading } = newState;

      expect(isLoading).toBe(false);
      expect(error).toBe('test error');
    });
  });
});
