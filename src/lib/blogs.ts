import { readFile, writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";
import type { Blog } from "@/src/types/blog";

const DATA_DIR = join(process.cwd(), "data");
const DATA_PATH = join(DATA_DIR, "blogs.json");

async function ensureFile() {
  if (!existsSync(DATA_PATH)) {
    await mkdir(DATA_DIR, { recursive: true });
    await writeFile(DATA_PATH, "[]", "utf-8");
  }
}

export async function getBlogs(): Promise<Blog[]> {
  await ensureFile();
  const raw = await readFile(DATA_PATH, "utf-8");
  return JSON.parse(raw) as Blog[];
}

export async function getPublishedBlogs(): Promise<Blog[]> {
  const blogs = await getBlogs();
  return blogs
    .filter((b) => b.status === "published")
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function getBlogById(id: string): Promise<Blog | undefined> {
  const blogs = await getBlogs();
  return blogs.find((b) => b.id === id);
}

export async function getBlogBySlug(slug: string): Promise<Blog | undefined> {
  const blogs = await getBlogs();
  return blogs.find((b) => b.slug === slug && b.status === "published");
}

export async function createBlog(data: Omit<Blog, "id" | "createdAt" | "updatedAt">): Promise<Blog> {
  const blogs = await getBlogs();
  const now = new Date().toISOString();
  const blog: Blog = {
    ...data,
    id: crypto.randomUUID(),
    createdAt: now,
    updatedAt: now,
  };
  blogs.push(blog);
  await writeFile(DATA_PATH, JSON.stringify(blogs, null, 2), "utf-8");
  return blog;
}

export async function updateBlog(id: string, data: Partial<Omit<Blog, "id" | "createdAt">>): Promise<Blog | null> {
  const blogs = await getBlogs();
  const index = blogs.findIndex((b) => b.id === id);
  if (index === -1) return null;
  blogs[index] = { ...blogs[index], ...data, updatedAt: new Date().toISOString() };
  await writeFile(DATA_PATH, JSON.stringify(blogs, null, 2), "utf-8");
  return blogs[index];
}

export async function deleteBlog(id: string): Promise<boolean> {
  const blogs = await getBlogs();
  const filtered = blogs.filter((b) => b.id !== id);
  if (filtered.length === blogs.length) return false;
  await writeFile(DATA_PATH, JSON.stringify(filtered, null, 2), "utf-8");
  return true;
}

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
