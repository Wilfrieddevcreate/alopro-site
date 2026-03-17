import { NextResponse } from "next/server";
import { verifyPassword, createSession } from "@/src/lib/auth";

export async function POST(request: Request) {
  const { password } = await request.json();

  if (!verifyPassword(password)) {
    return NextResponse.json({ error: "Mot de passe incorrect" }, { status: 401 });
  }

  await createSession();
  return NextResponse.json({ success: true });
}
