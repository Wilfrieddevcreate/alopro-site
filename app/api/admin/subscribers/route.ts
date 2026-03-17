import { NextResponse } from "next/server";
import { getSubscribers } from "@/src/lib/subscribers";

export async function GET() {
  const subscribers = await getSubscribers();
  const sorted = subscribers.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  return NextResponse.json(sorted);
}
