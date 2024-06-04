import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
  registerUserApi,
  loginUserApi,
  logoutApi,
  getUserApi,
  updateUserApi,
  getIngredientsApi,
  getFeedsApi,
  orderBurgerApi,
  getOrdersApi,
  getOrderByNumberApi
} from '@api';
import { TRegisterData, TLoginData } from '@api';
import { TConstructorItems, TIngredient, TOrder, TUser } from '@utils-types';
import { deleteCookie, setCookie } from '../../utils/cookie';
import { act } from 'react-dom/test-utils';

//работа с данными пользователя
export const registerUserThunk = createAsyncThunk(
  'user/registerUser',
  async (data: TRegisterData) => registerUserApi(data)
);

export const loginUserThunk = createAsyncThunk(
  'user/loginUser',
  async (data: TLoginData) => loginUserApi(data)
);

export const logoutUserThunk = createAsyncThunk('user/logoutUser', async () =>
  logoutApi()
);

export const getUserThunk = createAsyncThunk('user/getUser', async () =>
  getUserApi()
);

export const updateUserThunk = createAsyncThunk(
  'user/updateUser',
  async (user: Partial<TRegisterData>) => updateUserApi(user)
);

//данные для бургера и заказа
export const getIngredientsThunk = createAsyncThunk(
  'burger/getIngredients',
  async () => getIngredientsApi()
);

export const getFeedThunk = createAsyncThunk(
  'order/getFeed',
  async () => getFeedsApi()
);

export const orderBurgerThunk = createAsyncThunk(
  'order/orderBurger',
  async (data: string[]) => orderBurgerApi(data)
);

export const getOrderByNumberThunk = createAsyncThunk(
  'order/getByNumber',
  async (number: number) => getOrderByNumberApi(number)
)

export const getOrdersThunk = createAsyncThunk(
  'order/userOrders',
  async () => getOrdersApi()
);

export interface initialState {
    isInit: boolean;
    isLoading: boolean;
    isAuthChecked: boolean;
    user: TUser;
    error: string | null;

    ingredients: TIngredient[];
    orders: TOrder[];
    userOrders: TOrder[];
    feed: {
      total: number,
      totalToday: number
    };
    order: TOrder | null;
    orderRequest: boolean;
    burgerConstructor: TConstructorItems;
    orderModalData: TOrder | null;
}

const initialState: initialState = {
    isInit: false,
    isLoading: false,
    isAuthChecked: false,
    user: {
        email: '',
        name: ''
    },
    error: null,

    ingredients: [],
    orders: [],
    userOrders: [],
    feed: {
      total: 0,
      totalToday: 0
    },
    order: null,
    orderRequest: false,
    burgerConstructor: {
      bun: {
        price: 0
      },
      ingredients: []
    },
    orderModalData: null,
}

const stellarBurgerSlice = createSlice({
  name: 'stellarBurger',
  initialState,
  reducers: {
    init(state) {
      state.isInit = true;
    },
    
  },
  selectors: {
    selectLoading: (state) => state.isLoading,
    selectUser: (state) => state.user,
    selectIsAuthChecked: (state) => state.isAuthChecked,
    selectIsInit: (state) => state.isInit,
    selectErrorText: (state) => state.error,
    selectOrders: (state) => state.orders,
    selectUserOrders: (state) => state.userOrders,
    selectFeed: (state) => state.feed,
    selectIngredients: (state) => state.ingredients,
    selectBurgerConstructor: (state) => state.burgerConstructor,
    selectOrderRequest: (state) => state.orderRequest,
    selectOrderModalData: (state) => state.orderModalData,
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
        })


        .addCase(getFeedThunk.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getFeedThunk.fulfilled, (state, action) => {
            state.isLoading = false;
            state.feed.total = action.payload.total;
            state.feed.totalToday = action.payload.totalToday;
            state.orders = action.payload.orders;
        })
        .addCase(getFeedThunk.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message!;
        })


        .addCase(getIngredientsThunk.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getIngredientsThunk.fulfilled, (state, action) => {
            state.isLoading = false;
            state.ingredients = action.payload;
        })
        .addCase(getIngredientsThunk.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message!;
        })


        .addCase(orderBurgerThunk.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(orderBurgerThunk.fulfilled, (state, action) => {
            state.isLoading = false;
            state.order = action.payload.order;
        })
        .addCase(orderBurgerThunk.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message!;
        })

        .addCase(getOrdersThunk.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getOrdersThunk.fulfilled, (state, action) => {
            state.isLoading = false;
            state.userOrders = action.payload;
        })
        .addCase(getOrdersThunk.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message!;
        })
  }
});

export const { selectLoading, selectUser, selectIsAuthChecked, selectIsInit, selectErrorText, selectOrders, selectUserOrders, selectFeed, selectIngredients, selectBurgerConstructor, selectOrderRequest, selectOrderModalData } = stellarBurgerSlice.selectors;
export default stellarBurgerSlice.reducer;