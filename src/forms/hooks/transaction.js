import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import {
  useCreateTransaction,
  useEditTransaction,
} from '@/api/hooks/transaction';
import { getTransactionDate } from '@/helpers/date';

import {
  createTransactionFormSchema,
  editTransactionFormSchema,
} from '../schemas/transaction';

export const useCreateTransactionForm = ({ onSuccess, onError }) => {
  const { mutateAsync: createTransaction } = useCreateTransaction();
  const form = useForm({
    resolver: zodResolver(createTransactionFormSchema),
    defaultValues: {
      name: '',
      amount: 50,
      date: new Date(),
      type: 'EARNING',
    },
    // O shouldUnregister faz com que os campos que saem do formulário sejam "desregistrados", resetando seus valores
    shouldUnregister: true,
  });
  const onSubmit = async (data) => {
    try {
      await createTransaction(data);
      onSuccess();
    } catch (error) {
      console.error(error);
      onError();
    }
  };
  return { form, onSubmit };
};

export const useEditTransactionForm = ({ transaction, onSuccess, onError }) => {
  const { mutateAsync: updateTransaction } = useEditTransaction();
  const form = useForm({
    resolver: zodResolver(editTransactionFormSchema),
    defaultValues: {
      id: transaction.id,
      name: transaction.name,
      amount: transaction.amount,
      date: transaction.date,
      type: transaction.type,
    },
    // O shouldUnregister faz com que os campos que saem do formulário sejam "desregistrados", resetando seus valores
    shouldUnregister: true,
  });
  const onSubmit = async (data) => {
    await updateTransaction(data);
    try {
      onSuccess();
    } catch (error) {
      console.error(error);
      onError();
    }
  };
  return { form, onSubmit };
};
