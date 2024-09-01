import { RequestStatus, TOrder } from '@utils-types';
import { createSlice } from '@reduxjs/toolkit';
import { getOrders } from '../thunk/orders';

type TOrdersState = {
  data: TOrder[];
  status: RequestStatus;
};

export const initialState: TOrdersState = {
  data: [],
  status: RequestStatus.Idle
};

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state) => {
        state.status = RequestStatus.Loading;
      })
      .addCase(getOrders.fulfilled, (state, { payload }) => {
        state.data = payload;
        state.status = RequestStatus.Success;
      })
      .addCase(getOrders.rejected, (state) => {
        state.status = RequestStatus.Failed;
      });
  },
  selectors: {
    getOrders: (state: TOrdersState) => state.data
  }
});

export const ordersSelector = ordersSlice.selectors;
export const ordersReducer = ordersSlice.reducer;
