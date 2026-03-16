import Link from "next/link";
import { SITE_NAME } from "@/src/constants/site";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/80 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-950/80">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-xl font-bold">
          {SITE_NAME}
        </Link>
        <div className="flex items-center gap-6">
          <Link href="/" className="text-sm hover:text-zinc-600 dark:hover:text-zinc-300">
            Accueil
          </Link>
          <Link href="/about" className="text-sm hover:text-zinc-600 dark:hover:text-zinc-300">
            À propos
          </Link>
          <Link href="/contact" className="text-sm hover:text-zinc-600 dark:hover:text-zinc-300">
            Contact
          </Link>
        </div>
      </nav>
    </header>
  );
}
