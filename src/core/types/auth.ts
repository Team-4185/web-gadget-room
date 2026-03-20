import type { FormRegisterValues } from '@/core/schemas';

export interface IAuthRequestLogin {
  email: string;
  password: string;
}

export interface IAuthRequestRefresh {
  refreshToken: string;
}

export interface IJwtResponseDto {
  userId: number | null;
  email: string;
  accessToken: string;
}

export type FormRegisterValuesDto = Omit<FormRegisterValues, 'terms'>;

export interface IRegisterErrorResponse {
  type: string;
  title: string;
  status: number;
  detail: string;
  instance: string;
}
