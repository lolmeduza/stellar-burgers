import { createAppAsyncThunk } from '../hooks';
import { getOrdersApi } from '@api';

export const getOrders = createAppAsyncThunk(
  'ingredients/getOrders',
  getOrdersApi
);
