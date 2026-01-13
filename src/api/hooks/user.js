import { useQuery } from '@tanstack/react-query';

import { UserService } from '@/services/users';

export const getUserBalanceQueryKey = ({ userId, from, to }) => {
  if (!from || !to) {
    return ['balance'];
  }
  return ['balance', userId, from, to];
};

export const useGetUserBalance = () => {
  return useQuery({
    queryKey: ['getBalance'],
    queryFn: () => {
      return UserService.getBalance();
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    //enabled: Boolean(from) && Boolean(to) && Boolean(user.id),
  });
};
