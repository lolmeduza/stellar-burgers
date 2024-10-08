import { combineReducers } from '@reduxjs/toolkit';
import { userSlice } from './user';
import { ingredientsSlice } from './ingredients';
import { constructorSlice } from './burgerConstructor';
import { ordersSlice } from './orders';
import { feedSlice } from './feed';
import { orderSlice } from './order';

const rootReducer = combineReducers({
  [userSlice.name]: userSlice.reducer,
  [ingredientsSlice.name]: ingredientsSlice.reducer,
  [constructorSlice.name]: constructorSlice.reducer,
  [ordersSlice.name]: ordersSlice.reducer,
  [feedSlice.name]: feedSlice.reducer,
  [orderSlice.name]: orderSlice.reducer
});

export default rootReducer;
