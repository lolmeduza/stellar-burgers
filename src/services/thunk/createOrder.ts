import { createAppAsyncThunk } from '../hooks';
import { TOrder } from '@utils-types';
import { orderBurgerApi } from '@api';

export type TNewOrderResponse = {
  order: TOrder;
  name: string;
};

export const createOrder = createAppAsyncThunk<TNewOrderResponse, string[]>(
  `order/orders`,
  async (data: string[]) => orderBurgerApi(data)
);
