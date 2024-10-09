import { Card, CardBody } from "@nextui-org/card";
import TransactionItem from "@/components/TransactionItem";
import { ITransactionItem } from "@/components/TransactionsPanel";

export default function DayTransactionCard({transactions}: { transactions: ITransactionItem[] }) {
  return (
    <Card shadow="none">
      <CardBody className="p-4 gap-6">
        {transactions.map((transaction) => (
          <TransactionItem key={transaction.id} transaction={transaction} />
        ))}
      </CardBody>
    </Card>
  )
}