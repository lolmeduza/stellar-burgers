import { RequestStatus, TIngredient } from '@utils-types';
import { createSlice } from '@reduxjs/toolkit';
import { getIngredients } from '../thunk/ingredients';

type TIngredientsState = {
  data: TIngredient[];
  status: RequestStatus;
};

const initialState: TIngredientsState = {
  data: [],
  status: RequestStatus.Idle
};

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.status = RequestStatus.Loading;
      })
      .addCase(getIngredients.fulfilled, (state, { payload }) => {
        state.data = payload;
        state.status = RequestStatus.Success;
      })
      .addCase(getIngredients.rejected, (state) => {
        state.status = RequestStatus.Failed;
      });
  },
  selectors: {
    getIngredients: (state: TIngredientsState) => state.data
  }
});

export const ingredientsSelector = ingredientsSlice.selectors;
