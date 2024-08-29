import rootReducer from './index';
import { createStore } from 'redux';
// import { initialState as dashboardState } from './modules/uv_dashboard/uv_dashboard.reducer';
import { configureStore } from '@reduxjs/toolkit';

import { combineReducers } from '@reduxjs/toolkit';
import { userSlice } from './user';
import { ingredientsSlice } from './ingredients';
import { constructorSlice } from './burgerConstructor';
import { ordersSlice } from './orders';
import { feedSlice } from './feed';
import { orderSlice } from './order';

describe('Root Reducer Suite', () => {
  const myReducer = combineReducers({
    [userSlice.name]: userSlice.reducer,
    [ingredientsSlice.name]: ingredientsSlice.reducer,
    [constructorSlice.name]: constructorSlice.reducer,
    [ordersSlice.name]: ordersSlice.reducer,
    [feedSlice.name]: feedSlice.reducer,
    [orderSlice.name]: orderSlice.reducer
  });
  // console.log(myReducer);
  // console.log(rootReducer);
  test('loaded correctly', () => {
    expect(myReducer).toEqual(myReducer);
  });
});
