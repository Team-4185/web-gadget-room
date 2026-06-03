import { api } from '@/core/config';
import type {
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
};
