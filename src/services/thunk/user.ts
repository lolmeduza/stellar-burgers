import { createAppAsyncThunk } from '../hooks';
import { getUserApi, loginUserApi, registerUserApi, TLoginData } from '@api';
import {
  TUserLoginBody,
  TUserRegisterBody,
  UserResponse,
  TUserResponseToken
} from '@utils-types';
import { setCookie } from '../../utils/cookie';

const USER_SLICE_NAME = 'user';
export const checkUserAuth = createAppAsyncThunk<UserResponse, void>(
  `${USER_SLICE_NAME}/checkUserAuth`,
  getUserApi
);

export const loginUser = createAppAsyncThunk<UserResponse, TLoginData>(
  `${USER_SLICE_NAME}/loginUser`,
  async (data: TLoginData) => {
    const res = await loginUserApi(data);
    setCookie('accessToken', res.accessToken);
    setCookie('refreshToken', res.refreshToken);
    return res;
  }
);

export const registerUser = createAppAsyncThunk<
  TUserResponseToken,
  TUserRegisterBody
>(`${USER_SLICE_NAME}/registerUser`, async (dataUser) => {
  const data = await registerUserApi(dataUser);
  setCookie('accessToken', data.accessToken);
  setCookie('refreshToken', data.refreshToken);
  return data;
});
