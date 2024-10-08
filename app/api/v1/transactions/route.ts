import dbConnect from "@/lib/dbConnect";
import Transaction from "@/models/Transaction";

export async function GET() {
  await dbConnect();

  try {
    const transactions = await Transaction.aggregate()
      .sort({
        date: -1,
      })
      .addFields({
        dateOnly: { $dateToString: { format: "%Y-%m-%d", date: "$date", timezone: "-05" } }
      })
      .lookup({
        from: "users",
        localField: "madeBy.user",
        foreignField: "_id",
        as: "user",
      })
      .project({
        madeBy: 0,
        createdAt:0,
        updatedAt: 0,
      })
      .group({
        _id: "$dateOnly",
        items: { $push: "$$ROOT" }
      })
      .sort({
        _id: -1
      })
      .exec();

    if (!transactions) {
      return Response.json({ success: false }, { status: 404 });
    }

    return Response.json({ success: true, data: transactions });
  } catch (e: unknown) {
    if (e instanceof Error) {
      return Response.json({ success: false, message: e.message }, { status: 500 });
    }
    return Response.json({ success: false }, { status: 500 });
  }
}
