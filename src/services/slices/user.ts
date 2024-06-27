import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  registerUserApi,
  loginUserApi,
  logoutApi,
  getUserApi,
  updateUserApi,
} from '@api';
import { TUser } from '@utils-types';
import { deleteCookie, setCookie } from '../../utils/cookie';

export const registerUserThunk = createAsyncThunk(
  'user/registerUser', registerUserApi);

export const loginUserThunk = createAsyncThunk(
  'user/loginUser', loginUserApi);

export const logoutUserThunk = createAsyncThunk('user/logoutUser', logoutApi);

export const getUserThunk = createAsyncThunk('user/getUser', getUserApi);

export const updateUserThunk = createAsyncThunk(
  'user/updateUser', updateUserApi);

export interface initialState {
  isLoading: boolean;
  isAuthChecked: boolean;
  user: TUser;
  error: string | null;
}

const initialState: initialState = {
  isLoading: false,
  isAuthChecked: false,
  user: {
    email: '',
    name: ''
  },
  error: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  selectors: {
    selectLoading: (state) => state.isLoading,
    selectUser: (state) => state.user,
    selectIsAuthChecked: (state) => state.isAuthChecked,
    selectErrorText: (state) => state.error
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUserThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        setCookie('accessToken', action.payload.accessToken);
        localStorage.setItem('refreshToken', action.payload.refreshToken);
        state.isAuthChecked = true;
      })
      .addCase(loginUserThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message!;
      })

      .addCase(registerUserThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUserThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        localStorage.setItem('refreshToken', action.payload.refreshToken);
        setCookie('accessToken', action.payload.accessToken);
        state.isAuthChecked = true;
      })
      .addCase(registerUserThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message!;
      })

      .addCase(logoutUserThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUserThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload.success) {
          localStorage.removeItem('refreshToken');
          deleteCookie('accessToken');
          state.user = { name: '', email: '' };
          state.isAuthChecked = false;
        }
      })
      .addCase(logoutUserThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message!;
      })

      .addCase(getUserThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user.name = action.payload.user.name;
        state.user.email = action.payload.user.email;
        state.isAuthChecked = true;
      })
      .addCase(getUserThunk.rejected, (state) => {
        state.isLoading = false;
        state.isAuthChecked = false;
        state.user = { name: '', email: '' };
        deleteCookie('accessToken');
        localStorage.removeItem('refreshToken');
      })

      .addCase(updateUserThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUserThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload.success) {
          state.user.name = action.payload.user.name;
          state.user.email = action.payload.user.email;
        }
      })
      .addCase(updateUserThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message!;
      });
  }
});

export const {
  selectLoading,
  selectUser,
  selectIsAuthChecked,
  selectErrorText
} = userSlice.selectors;
export default userSlice.reducer;
