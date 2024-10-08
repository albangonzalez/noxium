"use client";
import { Selection } from "@react-types/shared";
import { Input } from "@nextui-org/input";
import { useState } from "react";
import { useFormStatus, useFormState } from "react-dom";

import UserSelect from "@/components/UserSelect";
import { Button } from "@nextui-org/button";
import createTransaction from "@/actions/createTransaction";
import { Link } from "@nextui-org/link";

export default function TransactionEditForm() {
  const [label, setLabel] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [madeBy, setMadeBy] = useState<Selection>(new Set([]));
  const [state, formAction] = useFormState(createTransaction, { success: false });

  return (
    <form action={formAction} className="flex flex-col gap-3">
      {state.success &&
        <div className="border border-1 border-success-500 rounded-xl p-4 text-success-500">
          Saved <Link href="/">Go back</Link>
        </div>
      }
      <Input
        label="Label"
        name="label"
        size="lg"
        value={label}
        onValueChange={setLabel}
      />
      <Input
        label="Amount"
        name="amount"
        size="lg"
        type="number"
        value={amount}
        onValueChange={setAmount}
      />
      <UserSelect setValue={setMadeBy} value={madeBy} />
      <SubmitButton />
    </form>
  );
}

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button className="w-full" size="lg" color="primary" type="submit" isLoading={pending}>
      Save
    </Button>
  )
}
