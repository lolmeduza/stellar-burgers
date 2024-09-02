import { createSlice } from '@reduxjs/toolkit';
import { RequestStatus, TUser } from '@utils-types';
import { checkUserAuth, loginUser, registerUser } from '../thunk/user';

export interface TUserState {
  isAuthChecked: boolean;
  data: TUser | null;
  requestStatus: RequestStatus;
}

export const initialState: TUserState = {
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
    },
    userLogout: (state) => {
      state.data = null;
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(checkUserAuth.fulfilled, (state, action) => {
        state.data = action.payload.user;
        state.requestStatus = RequestStatus.Success;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.data = action.payload.user;
        state.requestStatus = RequestStatus.Success;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.data = action.payload.user;
        state.requestStatus = RequestStatus.Success;
      });
  },
  selectors: {
    userDataSelector: (state) => state.data,
    isAuthCheckedSelector: (state) => state.isAuthChecked,
    userName: (state) => state.data?.name
  }
});

export const userActions = userSlice.actions;

export const userSelectors = userSlice.selectors;
export const userReducer = userSlice.reducer;
