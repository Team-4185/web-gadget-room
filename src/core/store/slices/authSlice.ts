import axios from 'axios';

import { createAppSlice } from '@/core/store/createAppSlice';
import type { FormRegisterValuesDto, IJwtResponseDto, IRegisterErrorResponse } from '@/core/types';
import { authService } from '@/core/services';
import type { FormLoginValues } from '@/core/schemas';
import { setAccessToken } from '@/core/config';

interface IInitialState extends Omit<IJwtResponseDto, 'accessToken'> {
  loading: boolean;
  authLoading: boolean;
  error: null | IRegisterErrorResponse;
}

const initialState: IInitialState = {
  userId: null,
  email: '',
  loading: false,
  authLoading: true,
  error: null,
};

export const authSlice = createAppSlice({
  name: 'auth',
  initialState,
  reducers: (create) => ({
    register: create.asyncThunk<
      IJwtResponseDto,
      FormRegisterValuesDto,
      { rejectValue: IRegisterErrorResponse }
    >(
      async (formData, { rejectWithValue }) => {
        try {
          return await authService.register(formData);
        } catch (err) {
          if (axios.isAxiosError<IRegisterErrorResponse>(err)) {
            return rejectWithValue(err.response!.data);
          } else {
            throw err;
          }
        }
      },
      {
        pending: (state) => {
          state.loading = true;
          state.error = null;
        },
        rejected: (state, action) => {
          state.error = action.payload ?? null;
        },
        fulfilled: (state, action) => {
          state.userId = action.payload.userId;
          state.email = action.payload.email;

          setAccessToken(action.payload.accessToken);
        },
        settled: (state) => {
          state.loading = false;
        },
      }
    ),
    login: create.asyncThunk<
      IJwtResponseDto,
      FormLoginValues,
      { rejectValue: IRegisterErrorResponse }
    >(
      async (formData, { rejectWithValue }) => {
        try {
          return await authService.login(formData);
        } catch (err) {
          if (axios.isAxiosError<IRegisterErrorResponse>(err)) {
            return rejectWithValue(err.response!.data);
          } else {
            throw err;
          }
        }
      },
      {
        pending: (state) => {
          state.loading = true;
          state.error = null;
        },
        rejected: (state, action) => {
          state.error = action.payload ?? null;
        },
        fulfilled: (state, action) => {
          state.userId = action.payload.userId;
          state.email = action.payload.email;

          setAccessToken(action.payload.accessToken);
        },
        settled: (state) => {
          state.loading = false;
        },
      }
    ),
    refreshToken: create.asyncThunk<IJwtResponseDto, void, { rejectValue: IRegisterErrorResponse }>(
      async (_, { rejectWithValue }) => {
        try {
          return await authService.refreshToken();
        } catch (err) {
          if (axios.isAxiosError<IRegisterErrorResponse>(err)) {
            return rejectWithValue(err.response!.data);
          } else {
            throw err;
          }
        }
      },
      {
        pending: (state) => {
          state.loading = true;
          state.error = null;
        },
        rejected: (state, action) => {
          state.error = action.payload ?? null;
        },
        fulfilled: (state, action) => {
          state.userId = action.payload.userId;
          state.email = action.payload.email;

          setAccessToken(action.payload.accessToken);
        },
        settled: (state) => {
          state.loading = false;
          state.authLoading = false;
        },
      }
    ),
  }),
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
