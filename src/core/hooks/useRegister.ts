import { useState } from 'react';

import { endpoints } from '@/core/config/endpoints';
import { http } from '@/core/config/api';
import type { AuthRequestRegister, AuthResponse } from '@/core/types/auth';
import { useSession } from '@/core/store/session';

export const useRegister = () => {
  const { setAuth } = useSession();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const register = async (payload: AuthRequestRegister) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await http.client.post<AuthResponse>(endpoints.register, payload);
      setAuth(data);
      return data;
    } catch (e: any) {
      setError(e?.response?.data?.body?.detail ?? 'Registration failed');
      throw e;
    } finally {
      setLoading(false);
    }
  };

  return { register, loading, error };
};
