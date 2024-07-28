import { createAppAsyncThunk } from '../hooks';
import { getOrderByNumberApi, TOrderResponse } from '@api';

// export const getOrder = createAppAsyncThunk(
//   '/orders/number',
//   getOrderByNumberApi
// );
export const getOrder = createAppAsyncThunk(
  `/orders/number`,
  async (number: number) => {
    const res = await getOrderByNumberApi(number);
    return res;
  }
);
