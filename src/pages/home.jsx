import { useContext } from 'react';
import { Navigate } from 'react-router';

import { Button } from '@/components/ui/button';
import { AuthContext } from '@/contexts/auth';
const HomePage = () => {
  const { user, isInitialize, signOut } = useContext(AuthContext);

  if (isInitialize) {
    return null;
  }

  if (!user) {
    return <Navigate to="login" />;
  }
  return (
    <div className="flex">
      Home Page
      <Button onClick={signOut}>Sair</Button>
    </div>
  );
};

export default HomePage;
