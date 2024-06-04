import { configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import stellarBurgerReducer from './slices/stellarBurgerSlice';

/*const rootReducer = () => {
  stellarBurgerReducer;
};*/

export const store = configureStore({
  reducer: {
    stellarBurger: stellarBurgerReducer
  },
  devTools: process.env.NODE_ENV !== 'production'
});

//export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
//export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
