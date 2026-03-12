import axios from 'axios';

import { createAppSlice } from '@/core/store/createAppSlice';
import type { FormRegisterValuesDto, IJwtResponseDto, IRegisterErrorResponse } from '@/core/types';
import { authService } from '@/core/services';
import type { FormLoginValues } from '@/core/schemas';

interface IInitialState extends IJwtResponseDto {
  loading: boolean;
  error: null | IRegisterErrorResponse;
}

const initialState: IInitialState = {
  userId: 0,
  email: '',
  accessToken: '',
  loading: false,
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
          state.accessToken = action.payload.accessToken;
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
          state.accessToken = action.payload.accessToken;
        },
        settled: (state) => {
          state.loading = false;
        },
      }
    ),
  }),
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
