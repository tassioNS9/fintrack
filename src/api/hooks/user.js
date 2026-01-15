import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';

import { AuthContext } from '@/contexts/auth';
import { UserService } from '@/services/users';
export const getUserBalanceQueryKey = ({ userId, from, to }) => {
  if (!from || !to) {
    return ['balance'];
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
    staleTime: 1000 * 60 * 5, // 5 minutes
    //enabled: Boolean(from) && Boolean(to) && Boolean(user.id),
  });
};
