import { RequestStatus, TOrder } from '@utils-types';
import { createSlice } from '@reduxjs/toolkit';
import { getOrder } from '../thunk/order';

type TOrdersState = {
  data: TOrder[];
  status: RequestStatus;
};

export const initialState: TOrdersState = {
  data: [],
  status: RequestStatus.Idle
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrder.pending, (state) => {
        state.status = RequestStatus.Loading;
      })
      .addCase(getOrder.fulfilled, (state, { payload }) => {
        state.data = payload.orders;
        state.status = RequestStatus.Success;
      })
      .addCase(getOrder.rejected, (state) => {
        state.status = RequestStatus.Failed;
      });
  },
  selectors: {
    getSingleOrder: (state: TOrdersState) => state.data
  }
});

export const singleOrderSelector = orderSlice.selectors;
export const singleOrderReducer = orderSlice.reducer;
