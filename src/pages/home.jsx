import { PlusIcon } from 'lucide-react';
import { useContext } from 'react';
import { Navigate } from 'react-router';

import DateSelection from '@/components/date-selection';
import Header from '@/components/header';
import { Button } from '@/components/ui/button';
import { AuthContext } from '@/contexts/auth';
const HomePage = () => {
  const { user, isInitialize } = useContext(AuthContext);

  if (isInitialize) {
    return null;
  }

  if (!user) {
    return <Navigate to="login" />;
  }
  return (
    <>
      <Header />
      <div className="p-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Dashboard</h2>
          <div className="flex items-center gap-2">
            <DateSelection />
            {/* Seletor de Data */}
            <Button>
              <PlusIcon />
              Nova Transação
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
