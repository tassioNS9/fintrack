import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router';

import { AuthContext } from '@/contexts/auth';

const PrivateRoute = () => {
  const { user } = useContext(AuthContext);

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
