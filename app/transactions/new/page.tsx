import TransactionEditForm from "@/components/TransactionEditForm";

export default function NewTxPage() {
  return (
    <div className="max-w-sm mx-auto p-2 md:p-0">
      <h1 className="font-bold text-2xl mb-3">Add transaction</h1>
      <TransactionEditForm />
    </div>
  )
}
