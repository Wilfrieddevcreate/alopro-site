import { readFile, writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";
import type { Project } from "@/src/types/project";

const DATA_DIR = join(process.cwd(), "data");
const DATA_PATH = join(DATA_DIR, "projects.json");

async function ensureFile() {
  if (!existsSync(DATA_PATH)) {
    await mkdir(DATA_DIR, { recursive: true });
    await writeFile(DATA_PATH, "[]", "utf-8");
  }
}

export async function getProjects(): Promise<Project[]> {
  await ensureFile();
  const raw = await readFile(DATA_PATH, "utf-8");
  return JSON.parse(raw) as Project[];
}

export async function getPublishedProjects(): Promise<Project[]> {
  const projects = await getProjects();
  return projects
    .filter((p) => p.status === "published")
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function getProjectById(id: string): Promise<Project | undefined> {
  const projects = await getProjects();
  return projects.find((p) => p.id === id);
}

export async function createProject(data: Omit<Project, "id" | "createdAt" | "updatedAt">): Promise<Project> {
  const projects = await getProjects();
  const now = new Date().toISOString();
  const project: Project = {
    ...data,
    id: crypto.randomUUID(),
    createdAt: now,
    updatedAt: now,
  };
  projects.push(project);
  await writeFile(DATA_PATH, JSON.stringify(projects, null, 2), "utf-8");
  return project;
}

export async function updateProject(id: string, data: Partial<Omit<Project, "id" | "createdAt">>): Promise<Project | null> {
  const projects = await getProjects();
  const index = projects.findIndex((p) => p.id === id);
  if (index === -1) return null;
  projects[index] = { ...projects[index], ...data, updatedAt: new Date().toISOString() };
  await writeFile(DATA_PATH, JSON.stringify(projects, null, 2), "utf-8");
  return projects[index];
}

export async function deleteProject(id: string): Promise<boolean> {
  const projects = await getProjects();
  const filtered = projects.filter((p) => p.id !== id);
  if (filtered.length === projects.length) return false;
  await writeFile(DATA_PATH, JSON.stringify(filtered, null, 2), "utf-8");
  return true;
}
