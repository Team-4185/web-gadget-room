import { useState } from 'react';

import { endpoints } from '../config/endpoints';
import { http } from '../config/api';
import type { AuthRequestRegister, AuthResponse } from '../types/auth';
import { useSession } from '../store/session';

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
