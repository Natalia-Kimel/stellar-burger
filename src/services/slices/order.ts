import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getOrdersApi } from '../../utils/burger-api';
import { TOrder } from '../../utils/types';

export const getOrdersThunk = createAsyncThunk('order/allOrders', getOrdersApi);

export interface initialState {
  isLoading: boolean;
  error: string | null;
  orders: TOrder[];
}

export const initialState: initialState = {
  isLoading: false,
  error: null,
  orders: []
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  selectors: {
    selectLoading: (state) => state.isLoading,
    selectErrorText: (state) => state.error,
    selectOrders: (state) => state.orders
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrdersThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrdersThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload;
      })
      .addCase(getOrdersThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message!;
      });
  }
});

export const { selectLoading, selectErrorText, selectOrders } =
  orderSlice.selectors;
export default orderSlice.reducer;
