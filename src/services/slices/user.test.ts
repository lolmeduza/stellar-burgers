import { RequestStatus, TUser } from '@utils-types';
import { userActions, userReducer } from './user';
import { checkUserAuth, loginUser, registerUser } from '../thunk/user';

describe('Super test', () => {
  interface TUserState {
    isAuthChecked: boolean;
    data: TUser | null;
    requestStatus: RequestStatus;
  }

  const initialState: TUserState = {
    isAuthChecked: false,
    data: null,
    requestStatus: RequestStatus.Idle
  };

  test('builder checkUserAuth fulfilled', () => {
    const payload = {
      user: {
        email: 'lolmeduza@lol.com',
        name: 'lol'
      }
    };

    const action = { type: checkUserAuth.fulfilled.type, payload: payload };
    const state = userReducer(initialState, action);
    expect(state).toEqual({
      data: payload.user,
      requestStatus: 'Success',
      isAuthChecked: false
    });
  });

  test('builder registerUser fulfilled', () => {
    const payload = {
      user: {
        email: 'lolmeduza@lol.com',
        name: 'lol'
      }
    };

    const action = { type: registerUser.fulfilled.type, payload: payload };
    const state = userReducer(initialState, action);
    expect(state).toEqual({
      data: payload.user,
      requestStatus: 'Success',
      isAuthChecked: false
    });
  });

  test('builder loginUser fulfilled', () => {
    const payload = {
      user: {
        email: 'lolmeduza@lol.com',
        name: 'lol'
      }
    };

    const action = { type: loginUser.fulfilled.type, payload: payload };
    const state = userReducer(initialState, action);
    expect(state).toEqual({
      data: payload.user,
      requestStatus: 'Success',
      isAuthChecked: false
    });
  });

  test('reducer authCheck', () => {
    const action = { type: userActions.authCheck.type };
    const state = userReducer(initialState, action);
    expect(state).toEqual({
      data: null,
      requestStatus: 'Idle',
      isAuthChecked: true
    });
  });

  test('userLogout authCheck', () => {
    const action = { type: userActions.userLogout.type };
    const state = userReducer(initialState, action);
    expect(state).toEqual({
      data: null,
      requestStatus: 'Idle',
      isAuthChecked: false
    });
  });
});
