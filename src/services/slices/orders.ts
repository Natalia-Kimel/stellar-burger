import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getOrderByNumberApi } from '@api';
import {
  TOrder
} from '@utils-types';

export const getOrderByNumberThunk = createAsyncThunk(
  'order/getByNumber', getOrderByNumberApi);

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
