import { AppDispatch, RootState } from './store';
import {
  TypedUseSelectorHook,
  useDispatch as useDispatchRedux,
  useSelector as useSelectorRedux
} from 'react-redux';
import { createAsyncThunk } from '@reduxjs/toolkit';
// import {BurgerApi} from '../utils/burger-api'

export const useDispatch = () => useDispatchRedux<AppDispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = useSelectorRedux;

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: RootState;
  dispatch: AppDispatch;
  // extra: BurgerApi;
}>();
