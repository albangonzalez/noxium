import dbConnect from "@/lib/dbConnect";
import Transaction from "@/models/Transaction";

export async function GET(
    request: Request,
    { params }: { params: { year: number, month: string }
}) {
  await dbConnect();

  const nextMonth = ((parseInt(params.month) + 1) % 12)
    .toString()
    .padStart(2, "0");
  const nextYear = (nextMonth === "01") ? params.year + 1 : params.year;

  const start = `${params.year}-${params.month}-01`;
  const end = `${nextYear}-${nextMonth}-01`;

  try {
    const transactions = await Transaction.aggregate()
      .match({
        date: {
          $gte: new Date(start),
          $lt: new Date(end)
        }
      })
      .group({
        _id: null,
        total: { $sum: "$amount" }
      })
      .exec();

    if (!transactions) {
      return Response.json({success: false}, {status: 404});
    }

    return Response.json({success: true, data: transactions});
  } catch (e: unknown) {
    if (e instanceof Error) {
      return Response.json({success: false, message: e.message}, {status: 500});
    }
    return Response.json({success: false}, {status: 500});
  }
}
