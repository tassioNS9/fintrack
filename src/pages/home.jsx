import { PlusIcon } from 'lucide-react';
import {
  PiggyBankIcon,
  TrendingDownIcon,
  TrendingUpIcon,
  WalletIcon,
} from 'lucide-react';
import { useContext } from 'react';
import { Navigate } from 'react-router';

import { useGetUserBalance } from '@/api/hooks/user';
import BalanceItem from '@/components/balance-item';
import DateSelection from '@/components/date-selection';
import Header from '@/components/header';
import { Button } from '@/components/ui/button';
import { AuthContext } from '@/contexts/auth';
const HomePage = () => {
  const { user, isInitialize } = useContext(AuthContext);
  // const [searchParams] = useSearchParams();
  // const from = searchParams.get('from'); // YYYY-MM-DD
  // const to = searchParams.get('to'); // YYYY-MM-DD
  const { data } = useGetUserBalance();
  if (isInitialize) {
    return null;
  }

  if (!user) {
    return <Navigate to="login" />;
  }
  return (
    <>
      <Header />
      <div className="space-y-5 p-8">
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

        <div className="grid grid-cols-[2fr,1fr]">
          <div className="grid grid-cols-2 grid-rows-2 gap-6">
            <BalanceItem
              label="Saldo"
              amount={data?.balance}
              icon={<WalletIcon size={16} />}
            />
            <BalanceItem
              label="Ganhos"
              amount={data?.earnings}
              icon={<TrendingUpIcon className="text-primary-green" size={16} />}
            />
            <BalanceItem
              label="Gastos"
              amount={data?.expenses}
              icon={<TrendingDownIcon className="text-primary-red" size={16} />}
            />
            <BalanceItem
              label="Investimentos"
              amount={data?.investments}
              icon={<PiggyBankIcon className="text-primary-blue" size={16} />}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
