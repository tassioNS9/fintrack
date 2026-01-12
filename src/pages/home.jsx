import { useContext } from 'react';
import { Navigate } from 'react-router';

import { AuthContext } from '@/contexts/auth';
const HomePage = () => {
  const { user, isInitialize } = useContext(AuthContext);

  if (isInitialize) {
    return null;
  }

  if (!user) {
    return <Navigate to="login" />;
  }
  return <div>Home Page</div>;
};

export default HomePage;
