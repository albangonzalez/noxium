import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";

export async function GET() {
  await dbConnect();

  try {
    const users = await User.find();

    if (!users) {
      return Response.json({ success: false }, { status: 404 });
    }

    const r = users.map((user) => user.toJSON());

    return Response.json({ success: true, data: r });
  } catch (e: unknown) {
    if (e instanceof Error) {
      return Response.json({ success: false, message: e.message }, { status: 500 });
    }
    return Response.json({ success: false }, { status: 500 });
  }
}
