import { NextResponse } from "next/server";
import { getPublishedProjects } from "@/src/lib/projects";

export const dynamic = "force-dynamic";

export async function GET() {
  const projects = await getPublishedProjects();
  return NextResponse.json(projects);
}
