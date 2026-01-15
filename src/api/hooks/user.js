import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';

import { UserService } from '@/api/services/users';
import { AuthContext } from '@/contexts/auth';
export const getUserBalanceQueryKey = ({ userId, from, to }) => {
  // garante que se nao tiver o from e o to, ele retorna uma query key sem esses valores
  if (!from || !to) {
    return ['balance', userId];
  }
  return ['balance', userId, from, to];
};

export const useGetUserBalance = ({ from, to }) => {
  // Temos que passar o id do usuário na query, pois se não outro usuário a ser logado vai com dados do cache dessa requisição
  const { user } = useContext(AuthContext);
  return useQuery({
    queryKey: getUserBalanceQueryKey({ userId: user?.id, from, to }),
    queryFn: () => {
      return UserService.getBalance({ from, to });
    },
    // O StaleTime garante que a query vai ficar "fresca" por 5 minutos
    staleTime: 1000 * 60 * 5, // 5 minutes
    // Garante que a query só será executada se eu tiver o from e o to
    enabled: Boolean(from) && Boolean(to),
  });
};
