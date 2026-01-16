import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale/pt-BR';
import { useSearchParams } from 'react-router';

import { useGetTransactions } from '@/api/hooks/transaction';
import { formatCurrency } from '@/helpers/currency';

import TransactionTypeBadge from './transaction-type-badge';
import { DataTable } from './ui/data-table';

const columns = [
  {
    // acessorKey é a chave do objeto de dados que esta coluna irá exibir que vem da API
    accessorKey: 'name',
    // Título da coluna que será exibido no cabeçalho da tabela
    header: 'Titulo',
  },
  {
    accessorKey: 'type',
    header: 'Tipo',
    cell: ({ row: { original: transaction } }) => {
      return <TransactionTypeBadge variant={transaction.type.toLowerCase()} />;
    },
  },
  {
    accessorKey: 'date',
    header: 'Data',
    // Temos uma propriedade cell que permite customizar o conteúdo da célula
    cell: ({ row: { original: transaction } }) => {
      return format(new Date(transaction.date), "dd 'de' MMMM 'de' yyyy", {
        locale: ptBR,
      });
    },
  },
  {
    accessorKey: 'amount',
    header: 'Valor',
    cell: ({ row: { original: transaction } }) => {
      return formatCurrency(transaction.amount);
    },
  },
  {
    accessorKey: 'actions',
    header: 'Ações',
  },
];

const TransactionsTable = () => {
  const [searchParams] = useSearchParams();
  const from = searchParams.get('from');
  const to = searchParams.get('to');

  const { data: transactions } = useGetTransactions({ from, to });
  if (!transactions) return null;

  return <DataTable columns={columns} data={transactions} />;
};

export default TransactionsTable;
