import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getOrderByNumberApi } from '@api';
import {
  TConstructorIngredient,
  TConstructorItems,
  TIngredient,
  TOrder,
  TUser
} from '@utils-types';
import { v4 as uuidv4 } from 'uuid';
import { arrayMoveImmutable } from 'array-move';

export const getOrderByNumberThunk = createAsyncThunk(
  'order/getByNumber',
  async (number: number) => getOrderByNumberApi(number)
);

export interface initialState {
  isLoading: boolean;
  error: string | null;
  orderData: TOrder[];
}

const initialState: initialState = {
  isLoading: false,
  error: null,
  orderData: []
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  selectors: {
    selectLoading: (state) => state.isLoading,
    selectErrorText: (state) => state.error,
    selectOrderData: (state) => state.orderData
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrderByNumberThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderByNumberThunk.fulfilled, (state, action) => {
        state.orderData = action.payload.orders;
        state.isLoading = false;
      })
      .addCase(getOrderByNumberThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message!;
      });
  }
});

export const { selectLoading, selectErrorText, selectOrderData } =
  ordersSlice.selectors;
export default ordersSlice.reducer;
