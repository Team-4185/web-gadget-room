import { apiAuth } from '@/core/config';
import { type IJwtResponseDto, type FormRegisterValuesDto } from '@/core/types';
import { type FormLoginValues, type FormForgotPassword } from '@/core/schemas';

export const authService = {
  async register(formData: FormRegisterValuesDto): Promise<IJwtResponseDto> {
    const { data } = await apiAuth.post<IJwtResponseDto>('/api/auth/register', formData);
    return data;
  },
  async login(formData: FormLoginValues) {
    const { data } = await apiAuth.post<IJwtResponseDto>('/api/auth/login', formData);
    return data;
  },
  async refreshToken() {
    const { data } = await apiAuth.post<IJwtResponseDto>('/api/auth/refresh-token');
    return data;
  },
  async forgotPassword(email: FormForgotPassword) {
    await apiAuth.post<void>('/api/auth/forgot-password', email);
  },
};
