import axios from 'axios';
import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router';

import { CircularProgress } from '@/components';
import { adminNavigationService } from '@/core/services';
import { useAppSelector } from '@/core/store';

type AdminAccessStatus = 'checking' | 'allowed' | 'denied';

export const AdminRoutes = () => {
  const { userId, authLoading } = useAppSelector((state) => state.auth);
  const [accessStatus, setAccessStatus] = useState<AdminAccessStatus>('checking');

  useEffect(() => {
    if (authLoading) return;

    if (!userId) {
      setAccessStatus('denied');
      return;
    }

    const controller = new AbortController();

    setAccessStatus('checking');

    adminNavigationService
      .getSidebarCounters(controller.signal)
      .then(() => setAccessStatus('allowed'))
      .catch((error: unknown) => {
        if (controller.signal.aborted) return;

        if (
          axios.isAxiosError(error) &&
          (error.response?.status === 401 || error.response?.status === 403)
        ) {
          setAccessStatus('denied');
          return;
        }

        setAccessStatus('denied');
      });

    return () => {
      controller.abort();
    };
  }, [authLoading, userId]);

  if (authLoading || accessStatus === 'checking') return <CircularProgress />;

  return accessStatus === 'allowed' ? <Outlet /> : <Navigate to="/home" replace />;
};
