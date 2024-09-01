import { RequestStatus, TOrder } from '@utils-types';
import { orderSlice, singleOrderReducer, initialState } from './order';
import { getOrder } from '../thunk/order';

describe('Super test', () => {
  // type TOrdersState = {
  //   data: TOrder[];
  //   status: RequestStatus;
  // };

  // const initialState: TOrdersState = {
  //   data: [],
  //   status: RequestStatus.Idle
  // };

  test('order loading', () => {
    const action = { type: getOrder.pending.type };
    const state = singleOrderReducer(initialState, action);
    expect(state).toEqual({ data: [], status: 'Loading' });
  });

  test('order success', () => {
    const payload = {
      orders: [
        {
          _id: '1',
          status: 'done',
          name: 'burger',
          createdAt: '1.02.01',
          updatedAt: '1.02.01',
          number: 1,
          ingredients: ''
        }
      ]
    };
    const action = {
      type: getOrder.fulfilled.type,
      payload: payload
    };
    const state = singleOrderReducer(initialState, action);

    expect(state).toEqual({
      data: payload.orders,
      status: 'Success'
    });
  });

  test('feed failed', () => {
    const action = { type: getOrder.rejected.type };
    const state = singleOrderReducer(initialState, action);

    expect(state).toEqual({
      data: [],
      status: 'Failed'
    });
  });
});
