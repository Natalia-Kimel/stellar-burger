import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  TConstructorIngredient,
  TConstructorItems,
  TIngredient,
  TOrder
} from '@utils-types';
import { v4 as uuidv4 } from 'uuid';
import { arrayMoveImmutable } from 'array-move';
import { orderBurgerApi } from '@api';

export const orderBurgerThunk = createAsyncThunk(
  'order/orderBurger', orderBurgerApi);

export interface initialState {
  isLoading: boolean;
  error: string | null;
  orderRequest: boolean;
  orderModalData: TOrder | null;
  constructorItems: TConstructorItems;
}

const initialState: initialState = {
  isLoading: false,
  error: '',
  orderRequest: false,
  orderModalData: null,
  constructorItems: {
    bun: {},
    ingredients: []
  }
};

const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (state.constructorItems) {
          action.payload.type === 'bun'
            ? (state.constructorItems.bun = action.payload)
            : state.constructorItems.ingredients.push(action.payload);
        }
      },
      prepare: (ingredient: TIngredient) => ({
        payload: { ...ingredient, id: uuidv4() }
      })
    },
    deleteIngredient: (
      state,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      if (state.constructorItems) {
        state.constructorItems.ingredients =
          state.constructorItems.ingredients.filter(
            (ing) => ing.id !== action.payload.id
          );
      }
    },
    moveIngredientDown: (
      state,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      if (state.constructorItems) {
        const ingredientIndex = state.constructorItems.ingredients.findIndex(
          (ing) => ing.id === action.payload.id
        );
        state.constructorItems.ingredients = arrayMoveImmutable(
          state.constructorItems.ingredients,
          ingredientIndex,
          ingredientIndex + 1
        );
      }
    },
    moveIngredientUp: (
      state,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      if (state.constructorItems) {
        const ingredientIndex = state.constructorItems.ingredients.findIndex(
          (ing) => ing.id === action.payload.id
        );
        state.constructorItems.ingredients = arrayMoveImmutable(
          state.constructorItems.ingredients,
          ingredientIndex,
          ingredientIndex - 1
        );
      }
    },
    closeOrder: (state) => {
      (state.orderRequest = false), (state.orderModalData = null);
    }
  },
  selectors: {
    selectBurgerConstructor: (state) => state.constructorItems,
    selectOrderRequest: (state) => state.orderRequest,
    selectOrderModalData: (state) => state.orderModalData,
    selectLoading: (state) => state.isLoading
  },
  extraReducers: (builder) => {
    builder
      .addCase(orderBurgerThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(orderBurgerThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderModalData = action.payload.order;
        state.orderRequest = false;
        state.constructorItems = {
          bun: {},
          ingredients: []
        };
      })
      .addCase(orderBurgerThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message!;
      });
  }
});

export const {
  selectBurgerConstructor,
  selectOrderModalData,
  selectOrderRequest,
  selectLoading
} = burgerConstructorSlice.selectors;
export const {
  addIngredient,
  deleteIngredient,
  moveIngredientDown,
  moveIngredientUp,
  closeOrder
} = burgerConstructorSlice.actions;
export default burgerConstructorSlice.reducer;
