import TransactionsPanel from "@/components/TransactionsPanel";
import CurrentTotalPanel from "@/components/CurrentTotalPanel";

export default function Home() {
  return (
    <div className="bg-gray-50">
      <CurrentTotalPanel />
      <TransactionsPanel />
    </div>
  );
}
