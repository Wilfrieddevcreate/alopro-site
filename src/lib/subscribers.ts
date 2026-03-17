import { readFile, writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";

export interface Subscriber {
  id: string;
  email: string;
  createdAt: string;
}

const DATA_DIR = join(process.cwd(), "data");
const DATA_PATH = join(DATA_DIR, "subscribers.json");

async function ensureFile() {
  if (!existsSync(DATA_PATH)) {
    await mkdir(DATA_DIR, { recursive: true });
    await writeFile(DATA_PATH, "[]", "utf-8");
  }
}

export async function getSubscribers(): Promise<Subscriber[]> {
  await ensureFile();
  const raw = await readFile(DATA_PATH, "utf-8");
  return JSON.parse(raw) as Subscriber[];
}

export async function addSubscriber(email: string): Promise<Subscriber | null> {
  const subscribers = await getSubscribers();
  const exists = subscribers.some((s) => s.email.toLowerCase() === email.toLowerCase());
  if (exists) return null;

  const sub: Subscriber = {
    id: crypto.randomUUID(),
    email: email.toLowerCase().trim(),
    createdAt: new Date().toISOString(),
  };
  subscribers.push(sub);
  await writeFile(DATA_PATH, JSON.stringify(subscribers, null, 2), "utf-8");
  return sub;
}

export async function deleteSubscriber(id: string): Promise<boolean> {
  const subscribers = await getSubscribers();
  const filtered = subscribers.filter((s) => s.id !== id);
  if (filtered.length === subscribers.length) return false;
  await writeFile(DATA_PATH, JSON.stringify(filtered, null, 2), "utf-8");
  return true;
}
