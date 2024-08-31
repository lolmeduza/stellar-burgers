import rootReducer from './index';
import { createStore } from 'redux';
// import { initialState as dashboardState } from './modules/uv_dashboard/uv_dashboard.reducer';
import { configureStore } from '@reduxjs/toolkit';

import { combineReducers } from '@reduxjs/toolkit';

import { userReducer } from './user';
import { ingredientsReducer } from './ingredients';
import { constructorReducer } from './burgerConstructor';
import { ordersReducer } from './orders';
import { feedSelectorReducer } from './feed';
import { singleOrderReducer } from './order';

describe('RootReducerTest', () => {
  it('initState', () => {
    const initAction = { type: '@@INIT' };
    const state = rootReducer(undefined, initAction);
    expect(state).toEqual({
      burgerConstructor: constructorReducer(undefined, initAction),
      ingredients: ingredientsReducer(undefined, initAction),
      orders: ordersReducer(undefined, initAction),
      order: singleOrderReducer(undefined, initAction),
      feed: feedSelectorReducer(undefined, initAction),
      user: userReducer(undefined, initAction)
    });
  });
});
