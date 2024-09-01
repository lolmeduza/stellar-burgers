import { RequestStatus, TOrder } from '@utils-types';
import { createSlice } from '@reduxjs/toolkit';
import { getFeed } from '../thunk/feed';

export type TFeedState = {
  data: TOrder[];
  total: number;
  totalToday: number;
  status: RequestStatus;
};

export const initialState: TFeedState = {
  data: [],
  total: 0,
  totalToday: 0,
  status: RequestStatus.Idle
};

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeed.pending, (state) => {
        state.status = RequestStatus.Loading;
      })
      .addCase(getFeed.fulfilled, (state, { payload }) => {
        state.data = payload.orders;
        state.total = payload.total;
        state.totalToday = payload.totalToday;
        state.status = RequestStatus.Success;
      })
      .addCase(getFeed.rejected, (state) => {
        state.status = RequestStatus.Failed;
      });
  },
  selectors: {
    getOrders: (state: TFeedState) => state.data,
    getTotal: (state: TFeedState) => state.total,
    getTotalToday: (state: TFeedState) => state.totalToday
  }
});

export const feedSelector = feedSlice.selectors;
export const feedSelectorReducer = feedSlice.reducer;
