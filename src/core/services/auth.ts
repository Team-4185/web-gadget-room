import { api } from '@/core/config';
import { type IJwtResponseDto } from '@/core/types';
import { type FormRegisterValuesDto } from '@/core/types';

export const authService = {
  async register(formData: FormRegisterValuesDto): Promise<IJwtResponseDto> {
    const { data } = await api.post<IJwtResponseDto>('/api/auth/register', formData);
    return data;
  },
};
