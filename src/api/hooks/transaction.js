import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useContext } from 'react';

import { AuthContext } from '@/contexts/auth';
import { TransactionService } from '@/services/transaction';

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
