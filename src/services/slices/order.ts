import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
  getOrderByNumberApi
} from '@api';
import { TConstructorIngredient, TConstructorItems, TIngredient, TOrder, TUser } from '@utils-types';
import { v4 as uuidv4 } from 'uuid';
import {arrayMoveImmutable} from 'array-move';

export const getOrderByNumberThunk = createAsyncThunk(
  'order/getByNumber',
  async (number: number) => getOrderByNumberApi(number)
);

export interface initialState {
  isLoading: boolean;
  error: string | null;
  orders: TOrder[];
}

const initialState: initialState = {
  isLoading: false,
  error: null,
  orders: [],
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
  },
  selectors: {
    selectLoading: (state) => state.isLoading,
    selectErrorText: (state) => state.error,
    selectOrder: (state) => state.orders,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrderByNumberThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderByNumberThunk.fulfilled, (state, action) => {
        state.orders = action.payload.orders;
        state.isLoading = false;
      })
      .addCase(getOrderByNumberThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message!;
      });
  }
});

export const {
  selectLoading,
  selectErrorText,
} = orderSlice.selectors;
export default orderSlice.reducer;