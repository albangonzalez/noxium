"use server";

import dbConnect from "@/lib/dbConnect";
import Transaction from "@/models/Transaction";

export default async function createTransaction(formData: FormData) {
  dbConnect();

  try {
    const transaction = new Transaction({
      label: formData.get("label"),
      amount: formData.get("amount"),
      date: new Date(),
      madeBy: { user: { _id: formData.get("madeBy") }, amount: null, percent: null },
    });

    await transaction.save();
  } catch (e) {
    throw e;
  }
}
