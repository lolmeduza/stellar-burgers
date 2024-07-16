import { createSlice } from '@reduxjs/toolkit';
import { RequestStatus, TUser } from '@utils-types';
import { checkUserAuth } from '../thunk/user';

export interface TUserState {
  isAuthChecked: boolean;
  data: TUser | null;
  requestStatus: RequestStatus;
}

const initialState: TUserState = {
  isAuthChecked: false,
  data: null,
  requestStatus: RequestStatus.Idle
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    authCheck(state) {
      state.isAuthChecked = true;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(checkUserAuth.fulfilled, (state, action) => {
      state.data = action.payload.user;
      state.requestStatus = RequestStatus.Success;
      console.log('Auth payload', action);
    });
  },
  selectors: {
    userDataSelector: (state) => state.data,
    isAuthCheckedSelector: (state) => state.isAuthChecked
  }
});

export const userActions = userSlice.actions;

export const userSelectors = userSlice.selectors;
