import { api } from '@/core/config';
import type { ApiAdminSidebarCounters } from '@/core/types';

export const adminNavigationService = {
  async checkAdminAccess(signal?: AbortSignal) {
    await api.get('/api/v1/admin', { signal });
  },
  async getSidebarCounters(signal?: AbortSignal) {
    const { data } = await api.get<ApiAdminSidebarCounters>('/api/v1/admin/sidebar-counters', {
      signal,
    });
    return data;
  },
};
