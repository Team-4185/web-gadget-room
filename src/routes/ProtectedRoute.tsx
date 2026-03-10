import { Navigate, Outlet } from 'react-router-dom';

import { useAppSelector } from '@/core/store';

export const ProtectedRoutes = () => {
  const accessToken = useAppSelector((state) => state.auth.accessToken);

  return accessToken ? <Outlet /> : <Navigate to="/" replace />;
};
