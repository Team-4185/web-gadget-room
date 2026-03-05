import { api } from '@/core/config';
import { type IAuthResponse } from '@/core/types';
import { type FormRegisterValuesDto } from '@/core/types';

export const authService = {
  async register(formData: FormRegisterValuesDto): Promise<IAuthResponse> {
    const { data } = await api.post<IAuthResponse>('/api/auth/register', formData);
    return data;
  },
};
