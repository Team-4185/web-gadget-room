import { api } from '@/core/config';
import type {
  ChangeUserEmailPayload,
  ChangeUserPasswordPayload,
  UpdateUserProfilePayload,
  UserPersonalInfoResponseDto,
  UserProfileDto,
} from '@/core/types';

export const usersService = {
  async getCurrentUser(signal?: AbortSignal) {
    const { data } = await api.get<UserPersonalInfoResponseDto>('/api/v1/users/me', { signal });
    return data;
  },
  async updateProfile(userId: number, payload: UpdateUserProfilePayload) {
    const { data } = await api.patch<UserProfileDto>(
      `/api/v1/users/${userId}/update-profile`,
      payload
    );
    return data;
  },
  async changePassword(payload: ChangeUserPasswordPayload) {
    await api.patch<void>('/api/v1/users/me/password', payload);
  },
  async changeEmail(payload: ChangeUserEmailPayload) {
    await api.patch<void>('/api/v1/users/me/email', payload);
  },
};
