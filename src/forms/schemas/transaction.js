import { z } from 'zod';

export const createTransactionFormSchema = z.object({
  name: z.string().trim().min(1, {
    message: 'O nome é obrigatório.',
  }),
  amount: z.number({
    required_error: 'O valor é obrigatório.',
  }),
  date: z.date({
    required_error: 'A data é obrigatória.',
  }),
  type: z.enum(['EARNING', 'EXPENSE', 'INVESTMENT']),
});

// Para o formulário de edição, eu preciso do id também com os dados de criação
export const editTransactionFormSchema = createTransactionFormSchema.extend({
  id: z.string().uuid(),
});
