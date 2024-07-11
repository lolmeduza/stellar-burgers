import { createSlice } from '@reduxjs/toolkit';
import { loginUserApi } from '../../utils/burger-api';
import { TUser } from '../../utils/types';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    email: '',
    password: '',
    token: ''
    // id: null
  },
  reducers: {
    setUser(state, action) {
      state.email = action.payload.email;
      state.token = action.payload.password;
      // state.id = action.payload.id;
    },
    removeUser(state) {
      state.email = '';
      state.password = '';
      state.token = '';
      // state.id = null;
    },
    login(state, action) {
      loginUserApi({
        email: state.email,
        password: state.password
      })
        .then((res) => (state.token = res.accessToken))
        .catch((err) => {
          console.log('kek', err);
        });
    },
    logout(state, action) {}
  },
  selectors: {
    userDataSelector: (state) => state,
    isAuthCheckedSelector: (state) => state.token !== ''
  }
});

export const { setUser, removeUser } = userSlice.actions;

export const { userDataSelector, isAuthCheckedSelector } = userSlice.selectors;
