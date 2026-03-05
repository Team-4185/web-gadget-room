import type { FormRegisterValues } from '@/core/schemas';

export interface IAuthRequestLogin {
  email: string;
  password: string;
}

export interface IAuthRequestRefresh {
  refreshToken: string;
}

export interface IAuthResponse {
  userId: number;
  email: string;
  accessToken: string;
  refreshToken: string;
}

export type FormRegisterValuesDto = Omit<FormRegisterValues, 'terms'>;
