import { api } from '@/core/config';
import { type IJwtResponseDto, type FormRegisterValuesDto } from '@/core/types';
import { type FormLoginValues } from '@/core/schemas';

export const authService = {
  async register(formData: FormRegisterValuesDto): Promise<IJwtResponseDto> {
    const { data } = await api.post<IJwtResponseDto>('/api/auth/register', formData);
    return data;
  },
  async login(formData: FormLoginValues) {
    const { data } = await api.post<IJwtResponseDto>('/api/auth/login', formData);
    return data;
  },
};
