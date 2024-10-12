"use server";

import dbConnect from "@/lib/dbConnect";
import Transaction from "@/models/Transaction";
import { parseZonedDateTime } from "@internationalized/date";

export default async function createTransaction(prevState: any, formData: FormData) {
  await dbConnect();

  const localDateTime = parseZonedDateTime(<string>formData.get("date"));

  try {
    const transaction = new Transaction({
      label: formData.get("label"),
      amount: formData.get("amount"),
      date: localDateTime.toDate(),
      madeBy: { user: { _id: formData.get("madeBy") }, amount: null, percent: null },
    });

    await transaction.save();

    return { success: true };
  } catch (e) {
    throw e;
  }
}
