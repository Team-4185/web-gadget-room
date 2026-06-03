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

export type UpdateUserProfilePayload = {
  firstName: string;
  lastName: string;
  city: string;
  phoneNumber: string;
};

export type UserProfileDto = UpdateUserProfilePayload & {
  id?: number;
  email?: string;
};

export type UserPersonalInfoResponseDto = {
  id: number;
  createdAt: string;
  updatedAt: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  city: string | null;
  phoneNumber: string | null;
  role: {
    id?: number;
    name?: string;
  };
  cart: unknown;
  orders: unknown[];
  favorites: unknown[];
};

export type FormRegisterValuesDto = Omit<FormRegisterValues, 'terms'>;

export interface IErrorResponse {
  type: string;
  title: string;
  status: number;
  detail: string;
  instance: string;
}
