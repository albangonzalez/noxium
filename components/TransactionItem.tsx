import { Transaction } from "@/models/Transaction";

export default function TransactionItem({ transaction }: any) {
  const date = new Date(transaction.date);
  return (
    <div className="flex gap-2">
      <div>
        <div className="bg-slate-100 rounded-full h-[32px] w-[32px] block"/>
      </div>
      <div className="w-full flex">
        <div className="size-2/3">
          <h3 className="text-slate-700 font-medium">
            {transaction.label}
          </h3>
          <p className="text-sm text-slate-500">{transaction.user[0].firstName} • {date.toLocaleTimeString().substring(0,5)}</p>
          {false && <p className="text-sm text-slate-500">[Description]</p>}
        </div>
        <div className="size-1/3">
          <p className="text-right text-gray-500">
            -${transaction.amount}
          </p>
        </div>
      </div>
    </div>
  )
}