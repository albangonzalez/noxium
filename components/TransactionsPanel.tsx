"use client";

import { useEffect, useState } from "react";
import DayTransactionCard from "@/components/DayTransactionsCard";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { Transaction } from "@/models/Transaction";

export interface ITransactionItem extends Transaction {
  user: [{
    firstName: string;
    lastName: string;
  }];
}

export interface DayTransactions {
  items: ITransactionItem[];
  date: Date;
}

export default function TransactionsPanel() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_URL}/api/v1/transactions`)
      .then(res => res.json())
      .then(json => setTransactions(json.data));
  }, []);

  return (
    <div className="max-w-sm mx-auto p-3 md:p-0">
      <Button color="default" as={Link} className="w-full mb-3" href="/transactions/new">Add transaction</Button>
      <div className="flex flex-col gap-6">
        {(0 < transactions.length) && transactions.map((dayTransactions: DayTransactions, i: number) => (
          <DayTransactions key={i} transactions={dayTransactions} />
        ))}
      </div>
    </div>
  );
}

const DayTransactions = ({transactions}: { transactions: DayTransactions}) =>{
  const date = new Date(transactions.date);

  return (
    <div className="flex flex-col gap-3">
      <h2 className="font-medium">{Intl.DateTimeFormat("es-MX", {dateStyle: "long"}).format(date)}</h2>
      <DayTransactionCard transactions={transactions.items}/>
    </div>
  );
}
