import { NextResponse } from "next/server";
import { getPublishedBlogs } from "@/src/lib/blogs";

export const dynamic = "force-dynamic";

export async function GET() {
  const blogs = await getPublishedBlogs();
  return NextResponse.json(blogs);
}
