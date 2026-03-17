import { NextResponse } from "next/server";
import { getBlogs, createBlog, generateSlug } from "@/src/lib/blogs";

export async function GET() {
  const blogs = await getBlogs();
  const sorted = blogs.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  return NextResponse.json(sorted);
}

export async function POST(request: Request) {
  const body = await request.json();
  const slug = generateSlug(body.titleFr || body.titleEn);
  const blog = await createBlog({ ...body, slug });
  return NextResponse.json(blog, { status: 201 });
}
