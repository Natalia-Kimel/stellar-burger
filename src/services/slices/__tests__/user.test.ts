import { log } from 'console';
import userSliceReducer, {
  initialState,
  getUserThunk,
  updateUserThunk,
  loginUserThunk,
  registerUserThunk,
  logoutUserThunk
} from '../user';

const mockUser = {
  success: true,
  user: {
    email: 'ex@gmail.com',
    name: 'Nat'
  }
};

const mockUpdateUser = {
  email: 'ex@gmail.com',
  name: 'Nataly'
};

const mockAuthResponse = {
  success: true,
  refreshToken: 'testRefreshToken',
  accessToken: 'testAccessToken',
  user: {
    email: 'ex@gmail.com',
    name: 'Nat'
  }
};

const mockLoginData = {
  email: 'ex@gmail.com',
  password: 'pupupu'
};

const mockRegisterData = {
  email: 'ex@gmail.com',
  name: 'Nat',
  password: 'pupupu'
};

describe('тесты асинхронных экшенов', () => {
  test('loginUser fulfilled', () => {
    const newState = userSliceReducer(
      initialState,
      loginUserThunk.fulfilled(mockAuthResponse, '', mockLoginData)
    );
    const { user, isAuthChecked, isLoading } = newState;

    expect(isLoading).toBe(false);
    expect(isAuthChecked).toBe(true);
    expect(user).toEqual(mockUser.user);
  });

  test('loginUser pending', () => {
    const newState = userSliceReducer(
      initialState,
      loginUserThunk.pending('', mockLoginData)
    );
    const { isLoading } = newState;

    expect(isLoading).toBe(true);
  });

  test('loginUser rejected', () => {
    const newState = userSliceReducer(
      initialState,
      loginUserThunk.rejected(
        { name: '', message: 'test error' },
        '',
        mockLoginData
      )
    );
    const { error, isLoading } = newState;

    expect(isLoading).toBe(false);
    expect(error).toBe('test error');
  });

  test('registerUser fulfilled', () => {
    const newState = userSliceReducer(
      initialState,
      registerUserThunk.fulfilled(mockAuthResponse, '', mockRegisterData)
    );
    const { user, isAuthChecked, isLoading } = newState;

    expect(isLoading).toBe(false);
    expect(isAuthChecked).toBe(true);
    expect(user).toEqual(mockUser.user);
  });

  test('registerUser pending', () => {
    const newState = userSliceReducer(
      initialState,
      registerUserThunk.pending('', mockRegisterData)
    );
    const { isLoading } = newState;

    expect(isLoading).toBe(true);
  });

  test('registerUser rejected', () => {
    const newState = userSliceReducer(
      initialState,
      registerUserThunk.rejected(
        { name: '', message: 'test error' },
        '',
        mockRegisterData
      )
    );
    const { error, isLoading } = newState;

    expect(isLoading).toBe(false);
    expect(error).toBe('test error');
  });

  test('logoutUser fulfilled', () => {
    const newState = userSliceReducer(
      initialState,
      logoutUserThunk.fulfilled(mockAuthResponse, '')
    );
    const { user, isAuthChecked, isLoading } = newState;

    expect(isLoading).toBe(false);
    expect(isAuthChecked).toBe(true);
    expect(user).toEqual({ name: '', email: '' });
  });

  test('logoutUser pending', () => {
    const newState = userSliceReducer(
      initialState,
      logoutUserThunk.pending('')
    );
    const { isLoading } = newState;

    expect(isLoading).toBe(true);
  });

  test('logoutUser rejected', () => {
    const newState = userSliceReducer(
      initialState,
      logoutUserThunk.rejected({ name: '', message: 'test error' }, '')
    );
    const { error, isLoading } = newState;

    expect(isLoading).toBe(false);
    expect(error).toBe('test error');
  });

  test('getUser fulfilled', () => {
    const newState = userSliceReducer(
      initialState,
      getUserThunk.fulfilled(mockUser, '')
    );
    const { user, isAuthChecked, isLoading } = newState;

    expect(isLoading).toBe(false);
    expect(isAuthChecked).toBe(true);
    expect(user).toEqual(mockUser.user);
  });

  test('getUser pending', () => {
    const newState = userSliceReducer(initialState, getUserThunk.pending(''));
    const { isLoading } = newState;

    expect(isLoading).toBe(true);
  });

  test('getUser rejected', () => {
    const newState = userSliceReducer(
      initialState,
      getUserThunk.rejected({ name: '', message: 'test error' }, '')
    );
    const { error, isLoading, user } = newState;

    expect(isLoading).toBe(false);
    expect(user).toEqual({ name: '', email: '' });
    expect(error).toBe('test error');
  });

  test('updateUser fulfilled', () => {
    const newState = userSliceReducer(
      initialState,
      updateUserThunk.fulfilled(
        { ...mockUser, user: mockUpdateUser },
        '',
        mockUpdateUser
      )
    );
    const { user, isLoading } = newState;

    expect(isLoading).toBe(false);
    expect(user).toEqual(mockUpdateUser);
  });

  test('updateUser pending', () => {
    const newState = userSliceReducer(
      initialState,
      updateUserThunk.pending('', mockUpdateUser)
    );
    const { isLoading } = newState;

    expect(isLoading).toBe(true);
  });

  test('updateUser rejected', () => {
    const newState = userSliceReducer(
      initialState,
      updateUserThunk.rejected(
        { name: '', message: 'test error' },
        '',
        mockUpdateUser
      )
    );
    const { error, isLoading } = newState;

    expect(isLoading).toBe(false);
    expect(error).toBe('test error');
  });
});
