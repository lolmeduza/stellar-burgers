import { createAppAsyncThunk } from '../hooks';
import { getIngredientsApi } from '@api';

export const getIngredients = createAppAsyncThunk(
  'ingredients/getIngredients',
  getIngredientsApi
);
