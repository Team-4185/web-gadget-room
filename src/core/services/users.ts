import { api } from '@/core/config';
import type { UpdateUserProfilePayload, UserProfileDto } from '@/core/types';

export const usersService = {
  async updateProfile(userId: number, payload: UpdateUserProfilePayload) {
    const { data } = await api.patch<UserProfileDto>(
      `/api/v1/users/${userId}/update-profile`,
      payload
    );
    return data;
  },
};
