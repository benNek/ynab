import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table.tsx";
import { parseTransactions } from "@/features/converter/converter-utils.ts";

type Props = {
  data: string;
};

export default function ConvertedTransactions({ data }: Props) {
  const transactions = parseTransactions(data);

  return (
    <Table>
      <TableCaption>A list of your imported transactions.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Date</TableHead>
          <TableHead>Payee</TableHead>
          <TableHead>Memo</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((transaction, index) => (
          <TableRow key={index}>
            <TableCell>{transaction.date}</TableCell>
            <TableCell>{transaction.payee}</TableCell>
            <TableCell>{transaction.memo}</TableCell>
            <TableCell className="text-right">{transaction.amount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
