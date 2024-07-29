import { deleteCookie } from 'src/utils/cookie';
import { createAppAsyncThunk } from '../hooks';
import { logoutApi } from '@api';
import { userSlice } from 'src/services/slices/user';
export const logoutUser = createAppAsyncThunk(
  'user/logoutUser',
  (_, { dispatch }) => {
    logoutApi()
      .then(() => {
        localStorage.clear(); // очищаем refreshToken
        deleteCookie('accessToken'); // очищаем accessToken
        dispatch(userSlice.actions.userLogout()); // удаляем пользователя из хранилища
      })
      .catch(() => {
        console.log('Ошибка выполнения выхода');
      });
  }
);
