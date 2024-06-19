import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TConstructorItems, TIngredient } from '@utils-types';
import { v4 as uuidv4 } from 'uuid';
import {arrayMoveImmutable} from 'array-move';

const initialState: TConstructorItems = {
    bun: {},
    ingredients: []
}

const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: { 
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
      action.payload.type === 'bun' ? state.bun = action.payload : state.ingredients.push(action.payload);
    },
      prepare: (ingredient: TIngredient) => ({
        payload: {...ingredient, id: uuidv4()}
      })
    },
    deleteIngredient: (state, action: PayloadAction<TConstructorIngredient>) => {
      state.ingredients = state.ingredients.filter((ing) => ing.id !== action.payload.id)
    },
    moveIngredientDown: (state, action: PayloadAction<TConstructorIngredient>) => {
      const ingredientIndex = state.ingredients.findIndex((ing) => ing.id === action.payload.id);
      state.ingredients = arrayMoveImmutable(state.ingredients, ingredientIndex, ingredientIndex + 1);
    },
    moveIngredientUp: (state, action: PayloadAction<TConstructorIngredient>) => {
      const ingredientIndex = state.ingredients.findIndex((ing) => ing.id === action.payload.id);
      state.ingredients = arrayMoveImmutable(state.ingredients, ingredientIndex, ingredientIndex - 1);
    },
  },
  selectors: {
    selectBurgerConstructor: (state) => state,
  }
});

export const {
  selectBurgerConstructor,
} = burgerConstructorSlice.selectors;
export const {addIngredient, deleteIngredient, moveIngredientDown, moveIngredientUp} = burgerConstructorSlice.actions;
export default burgerConstructorSlice.reducer;
