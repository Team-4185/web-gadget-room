import { Navigate, Outlet } from 'react-router-dom';

import { useAppSelector } from '@/core/store';
import { CircularProgress } from '@/components';

export const ProtectedRoutes = () => {
  const { userId, authLoading } = useAppSelector((state) => state.auth);

  if (authLoading) return <CircularProgress />;

  return userId ? <Outlet /> : <Navigate to="/" replace />;
};
