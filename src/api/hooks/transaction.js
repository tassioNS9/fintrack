import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';

import { TransactionService } from '@/api/services/transaction';
import { AuthContext } from '@/contexts/auth';

export const createTransactionMutationKey = ['createTransaction'];

export const useCreateTransaction = () => {
  const queryClient = useQueryClient();
  const { user } = useContext(AuthContext);
  return useMutation({
    mutationKey: createTransactionMutationKey,
    mutationFn: (input) => TransactionService.create(input),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getTransactionsQueryKey({ userId: user.id }),
      });
    },
  });
};

export const getTransactionsQueryKey = ({ userId, from, to }) => {
  if (!from || !to) {
    return ['getTransactions', userId];
  }
  return ['getTransactions', userId, from, to];
};

export const useGetTransactions = ({ from, to }) => {
  const { user } = useContext(AuthContext);
  return useQuery({
    queryKey: getTransactionsQueryKey({ userId: user?.id, from, to }),
    queryFn: () => {
      return TransactionService.getAll({ from, to });
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    enabled: Boolean(from) && Boolean(to),
  });
};
