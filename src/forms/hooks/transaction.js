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
    // O default values vai ser Usado na reenderização inicial do formulário mas como não temos o input de id,quando enviamos o form, ele não tem o id
    defaultValues: {
      id: transaction.id,
      name: transaction.name,
      amount: parseFloat(transaction.amount),
      date: new Date(transaction.date),
      type: transaction.type,
    },
    // O shouldUnregister faz com que os campos que saem do formulário sejam "desregistrados", resetando seus valores
    shouldUnregister: true,
  });

  //Com o problema do id no envio do form, usamos o useEffect para setar o valor do id sempre que o form ou a transaction mudarem
  // Mas a transition não vai mudar, vai ficar a mesma durante o ciclo de vida do form de edição
  useEffect(() => {
    form.reset({
      name: transaction.name,
      amount: parseFloat(transaction.amount),
      date: getTransactionDate(transaction),
      type: transaction.type,
    });
    form.setValue('id', transaction.id);
  }, [form, transaction]);

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
