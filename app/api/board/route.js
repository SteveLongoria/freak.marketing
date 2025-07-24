import { NextResponse } from "next/server";
import { auth } from "@/auth";
import connectMongo from "@/libs/mongoose";
import User from "@/libs/models/User";
import Board from "@/libs/models/Board";

export async function POST(req) {
  try {
    const body = await req.json();

    // Making sure board has name
    if (!body.name) {
      return NextResponse.json(
        { error: "Board name is required!" },
        { status: 400 }
      );
    }

    // Making sure using is authenticated
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Not authorized!" }, { status: 401 });
    }

    await connectMongo();

    const user = await User.findById(session.user.id);

    const newBoard = await Board.create({
      userId: user._id,
      name: body.name,
    });

    user.boards.push(newBoard._id);
    await user.save();

    return NextResponse.json({ Board });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
