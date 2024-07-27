import { combineReducers } from '@reduxjs/toolkit';
import { userSlice } from './user';
import { ingredientsSlice } from './ingredients';
import { constructorSlice } from './burgerConstructor';
import { ordersSlice } from './orders';
import { feedSlice } from './feed';

const rootReducer = combineReducers({
  [userSlice.name]: userSlice.reducer,
  [ingredientsSlice.name]: ingredientsSlice.reducer,
  [constructorSlice.name]: constructorSlice.reducer,
  [ordersSlice.name]: ordersSlice.reducer,
  [feedSlice.name]: feedSlice.reducer
});

export default rootReducer;
