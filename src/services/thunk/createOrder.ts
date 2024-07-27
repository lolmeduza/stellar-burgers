import { createAppAsyncThunk } from '../hooks';
import { TOrder } from '@utils-types';
import { orderBurgerApi } from '@api';

type TNewOrderResponse = {
  order: TOrder;
  name: string;
};

export const createOrder = createAppAsyncThunk<TNewOrderResponse, string[]>(
  `order/orders`,
  async (data: string[]) => {
    return await orderBurgerApi(data);
  }
);
