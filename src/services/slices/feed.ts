import { RequestStatus, TOrder } from '@utils-types';
import { createSlice } from '@reduxjs/toolkit';
import { getFeed } from '../thunk/feed';

type TFeedState = {
  data: TOrder[];
  total: number;
  totalToday: number;
  status: RequestStatus;
};

const initialState: TFeedState = {
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
        console.log('Feed:', payload);
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
    getOrders: (state: TFeedState) => state.data
  }
});

export const feedSelector = feedSlice.selectors;
