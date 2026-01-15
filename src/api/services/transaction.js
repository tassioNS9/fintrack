import { protectedApi } from '@/lib/axios';

export const TransactionService = {
  create: async (input) => {
    const response = await protectedApi.post('/transactions', {
      name: input.name,
      date: input.date,
      amount: input.amount,
      type: input.type,
    });
    return response.data;
  },
};
