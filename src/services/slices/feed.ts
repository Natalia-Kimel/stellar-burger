import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getFeedsApi } from '@api';
import { TOrder } from '@utils-types';

export const getFeedThunk = createAsyncThunk('order/getFeed', getFeedsApi);

export interface initialState {
  isLoading: boolean;
  orders: TOrder[];
  feed: {
    total: number;
    totalToday: number;
  };
  error: string | null;
}

const initialState: initialState = {
  isLoading: false,
  orders: [],
  feed: {
    total: 0,
    totalToday: 0
  },
  error: null
};

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  selectors: {
    selectLoading: (state) => state.isLoading,
    selectOrders: (state) => state.orders,
    selectFeed: (state) => state.feed
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeedThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFeedThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.feed.total = action.payload.total;
        state.feed.totalToday = action.payload.totalToday;
        state.orders = action.payload.orders;
      })
      .addCase(getFeedThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message!;
      });
  }
});

export const { selectLoading, selectOrders, selectFeed } = feedSlice.selectors;
export default feedSlice.reducer;
