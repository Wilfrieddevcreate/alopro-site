import { NextResponse } from "next/server";
import { addSubscriber } from "@/src/lib/subscribers";

export async function POST(request: Request) {
  const { email } = await request.json();

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Email invalide" }, { status: 400 });
  }

  const sub = await addSubscriber(email);
  if (!sub) {
    return NextResponse.json({ error: "already_subscribed" }, { status: 409 });
  }

  return NextResponse.json({ success: true }, { status: 201 });
}
