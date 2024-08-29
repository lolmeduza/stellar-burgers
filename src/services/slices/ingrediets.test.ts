import { RequestStatus, TIngredient } from '@utils-types';
import { ingredientsReducer } from './ingredients';
import { getIngredients } from '../thunk/ingredients';

describe('Super test', () => {
  type TIngredientsState = {
    data: TIngredient[];
    status: RequestStatus;
  };

  const initialState: TIngredientsState = {
    data: [],
    status: RequestStatus.Idle
  };

  test('builder loading', () => {
    const action = { type: getIngredients.pending.type };
    const state = ingredientsReducer(initialState, action);

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
      type: getIngredients.fulfilled.type,
      payload: [payload]
    };
    const state = ingredientsReducer(initialState, action);

    expect(state).toEqual({ data: [payload], status: 'Success' });
  });

  test('builder failed', () => {
    const action = { type: getIngredients.rejected.type };
    const state = ingredientsReducer(initialState, action);

    expect(state).toEqual({ data: [], status: 'Failed' });
  });
});
