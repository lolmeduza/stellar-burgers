// import { RequestStatus, TOrder } from '@utils-types';
// import { orderSlice, singleOrderReducer } from './order';
// import { getOrder } from '../thunk/order';

// describe('Super test', () => {
//   type TOrdersState = {
//     data: TOrder[];
//     status: RequestStatus;
//   };

//   const initialState: TOrdersState = {
//     data: [],
//     status: RequestStatus.Idle
//   };

//   test('order loading', () => {
//     const action = { type: getOrder.pending.type };
//     const state = singleOrderReducer(initialState, action);

//     expect(state).toEqual({ data: [], status: 'Loading' });
//   });

//   test('order success', () => {
//     const payload = orderSlice.selectors.getSingleOrder;
//     const action = {
//       type: getOrder.fulfilled.type,
//       payload: [payload]
//     };
//     const state = singleOrderReducer(initialState, action);

//     expect(state).toEqual({ data: [payload], status: 'Success' });
//   });

//   test('order failed', () => {
//     const action = { type: getOrder.rejected.type };
//     const state = singleOrderReducer(initialState, action);

//     expect(state).toEqual({ data: [], status: 'Failed' });
//   });
// });
