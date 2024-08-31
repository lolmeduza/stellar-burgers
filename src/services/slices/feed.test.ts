import { RequestStatus, TOrder } from '@utils-types';
import { feedSelectorReducer, TFeedState } from './feed';
import { getFeed } from '../thunk/feed';

describe('Super test', () => {
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

  test('feed loading', () => {
    const action = { type: getFeed.pending.type };
    const state = feedSelectorReducer(initialState, action);

    expect(state).toEqual({
      data: [],
      status: 'Loading',
      total: 0,
      totalToday: 0
    });
  });

  test('feed success', () => {
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
      ],
      total: 1,
      totalToday: 2
    };
    const action = {
      type: getFeed.fulfilled.type,
      payload: payload
    };
    const state = feedSelectorReducer(initialState, action);

    expect(state).toEqual({
      data: payload.orders,
      status: 'Success',
      total: payload.total,
      totalToday: payload.totalToday
    });
  });

  test('feed failed', () => {
    const action = { type: getFeed.rejected.type };
    const state = feedSelectorReducer(initialState, action);

    expect(state).toEqual({
      data: [],
      status: 'Failed',
      total: 0,
      totalToday: 0
    });
  });
});
