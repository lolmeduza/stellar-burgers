import { RequestStatus, TOrder } from '@utils-types';
import { ordersReducer } from './orders';
import { getOrders } from '../thunk/orders';

describe('Super test', () => {
  type TOrdersState = {
    data: TOrder[];
    status: RequestStatus;
  };

  const initialState: TOrdersState = {
    data: [],
    status: RequestStatus.Idle
  };

  test('order loading', () => {
    const action = { type: getOrders.pending.type };
    const state = ordersReducer(initialState, action);
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
      type: getOrders.fulfilled.type,
      payload: payload
    };
    const state = ordersReducer(initialState, action);

    expect(state).toEqual({
      data: payload,
      status: 'Success'
    });
  });

  test('feed failed', () => {
    const action = { type: getOrders.rejected.type };
    const state = ordersReducer(initialState, action);

    expect(state).toEqual({
      data: [],
      status: 'Failed'
    });
  });
});
