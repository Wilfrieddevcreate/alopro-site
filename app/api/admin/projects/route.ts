import { NextResponse } from "next/server";
import { getProjects, createProject } from "@/src/lib/projects";
import { generateSlug } from "@/src/lib/blogs";

export async function GET() {
  const projects = await getProjects();
  const sorted = projects.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  return NextResponse.json(sorted);
}

export async function POST(request: Request) {
  const body = await request.json();
  const slug = generateSlug(body.titleFr || body.titleEn);
  const project = await createProject({ ...body, slug });
  return NextResponse.json(project, { status: 201 });
}
