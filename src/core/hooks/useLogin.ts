import { useState } from 'react';

import { endpoints } from '@/core/config/endpoints';
import { http } from '@/core/config/api';
import type { AuthRequestLogin, AuthResponse } from '@/core/types/auth';
import { useSession } from '@/core/store/session';

export const useLogin = () => {
  const { setAuth } = useSession();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (payload: AuthRequestLogin) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await http.client.post<AuthResponse>(endpoints.login, payload);
      setAuth(data);
      return data;
    } catch (e: any) {
      console.log(e?.response);
      setError(e?.response?.data?.body?.detail ?? 'Login failed');
      throw e;
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
};
