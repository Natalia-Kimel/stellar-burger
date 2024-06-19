import { combineReducers, configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import stellarBurgerReducer from './slices/stellarBurgerSlice';
//import orderSlice from './slices/order';
import burgerConstructorSlice from './slices/burgerConstructor';
import feedSlice from './slices/feed';
import ingredientsSlice from './slices/ingredients';

const rootReducer = combineReducers({
  burgerConstructor: burgerConstructorSlice,
  feed: feedSlice,
  ingredients: ingredientsSlice,
  //order: orderSlice,
})

export const store = configureStore({
  reducer: {
    rootReducer
  },
  devTools: process.env.NODE_ENV !== 'production'
});
console.log(rootReducer);

type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
//export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
