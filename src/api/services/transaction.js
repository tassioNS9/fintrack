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

  update: async (input) => {
    const response = await protectedApi.patch(`/transactions/${input.id}`, {
      name: input.name,
      date: input.date,
      amount: input.amount,
      type: input.type,
    });
    return response.data;
  },

  getAll: async ({ from, to }) => {
    const queryParams = new URLSearchParams();
    queryParams.set('from', from);
    queryParams.set('to', to);
    const response = await protectedApi.get(
      `/transactions?${queryParams.toString()}`
    );
    return response.data;
  },
};
