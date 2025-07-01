import { useAuthStore } from '@/stores/Auth.store';
import { message } from 'antd';
import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
export const ProtectedRoute = () => {
  const { isAuthenticated } = useAuthStore();
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      message.info('Debes iniciar sesión para acceder a esta página');
      setShouldRedirect(true);
    }
  }, [isAuthenticated]);

  if (shouldRedirect) {
    return <Navigate to='/' replace />;
  }

  if (!isAuthenticated) return null;
  return <Outlet />;
};
