import { combineReducers, configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import stellarBurgerReducer from './slices/stellarBurgerSlice';
//import orderSlice from './slices/order';
import burgerConstructorReducer from './slices/burgerConstructor';
import feedReducer from './slices/feed';
import ingredientsReducer from './slices/ingredients';

const rootReducer = combineReducers({
  burgerConstructor: burgerConstructorReducer,
  feed: feedReducer,
  ingredients: ingredientsReducer,
  //order: orderSlice,
})

export const store = configureStore({
  reducer: {
    stellarBurgerReducer
  },
  devTools: process.env.NODE_ENV !== 'production'
});

//type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
//export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
