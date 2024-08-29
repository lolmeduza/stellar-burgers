import { RequestStatus, TOrder } from '@utils-types';
import { feedSelectorReducer } from './feed';
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

  test('builder loading', () => {
    const action = { type: getFeed.pending.type };
    const state = feedSelectorReducer(initialState, action);

    expect(state).toEqual({ data: [], status: 'Loading' });
  });

  test('builder success', () => {
    const payload = {
      _id: '643d69a5c3f7b9001cfa093c',
      name: 'MOCK Краторная булка N-200i',
      type: 'bun',
      proteins: 80,
      fat: 24,
      carbohydrates: 53,
      calories: 420,
      price: 1255,
      image: 'https://code.s3.yandex.net/react/code/bun-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
      id: '1'
    };
    const action = {
      type: getFeed.fulfilled.type,
      payload: [payload]
    };
    const state = feedSelectorReducer(initialState, action);

    expect(state).toEqual({ data: [payload], status: 'Success' });
  });

  test('builder failed', () => {
    const action = { type: getFeed.rejected.type };
    const state = feedSelectorReducer(initialState, action);

    expect(state).toEqual({ data: [], status: 'Failed' });
  });
});
