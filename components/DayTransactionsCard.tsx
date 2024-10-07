import { Card, CardBody } from "@nextui-org/card";
import TransactionItem from "@/components/TransactionItem";

export default function DayTransactionCard({transactions}: any) {
  return (
    <Card shadow="none">
      <CardBody className="p-4 gap-6">
        {transactions.map((transaction: any) => (
          <TransactionItem key={transaction._id} transaction={transaction} />
        ))}
      </CardBody>
    </Card>
  )
}