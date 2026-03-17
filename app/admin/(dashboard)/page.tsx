"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Blog } from "@/src/types/blog";

const statusColors: Record<string, { bg: string; text: string; label: string }> = {
  published: { bg: "bg-emerald-500/10", text: "text-emerald-400", label: "Publié" },
  draft: { bg: "bg-amber-500/10", text: "text-amber-400", label: "Brouillon" },
};

const categoryLabels: Record<string, string> = {
  dev: "Développement",
  research: "Recherche",
  training: "Formation",
  news: "Actualités",
};

function Skeleton({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse rounded bg-white/[0.06] ${className}`} />;
}

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  const fetchBlogs = async () => {
    const res = await fetch("/api/admin/blogs");
    const data = await res.json();
    setBlogs(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Supprimer cet article ?")) return;
    setDeleting(id);
    await fetch(`/api/admin/blogs/${id}`, { method: "DELETE" });
    setBlogs((prev) => prev.filter((b) => b.id !== id));
    setDeleting(null);
  };

  const toggleStatus = async (blog: Blog) => {
    const newStatus = blog.status === "published" ? "draft" : "published";
    await fetch(`/api/admin/blogs/${blog.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
    setBlogs((prev) =>
      prev.map((b) => (b.id === blog.id ? { ...b, status: newStatus } : b))
    );
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-[28px] font-bold text-white">Blog</h1>
          <p className="mt-1 text-[14px] text-gray-500">
            {blogs.length} article{blogs.length !== 1 ? "s" : ""}
          </p>
        </div>
        <Link
          href="/admin/blogs/new"
          className="flex items-center gap-2 rounded-lg bg-[#1F6FEB] px-4 py-2.5 text-[13px] font-semibold text-white transition-colors hover:bg-[#1a5fd4]"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Nouvel article
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.02]">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/[0.06]">
              <th className="px-5 py-3 text-left text-[11px] font-bold uppercase tracking-[0.1em] text-gray-500">
                Article
              </th>
              <th className="px-5 py-3 text-left text-[11px] font-bold uppercase tracking-[0.1em] text-gray-500">
                Catégorie
              </th>
              <th className="px-5 py-3 text-left text-[11px] font-bold uppercase tracking-[0.1em] text-gray-500">
                Statut
              </th>
              <th className="px-5 py-3 text-left text-[11px] font-bold uppercase tracking-[0.1em] text-gray-500">
                Date
              </th>
              <th className="px-5 py-3 text-right text-[11px] font-bold uppercase tracking-[0.1em] text-gray-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {loading &&
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i} className="border-b border-white/[0.04]">
                  <td className="px-5 py-4"><Skeleton className="h-4 w-48" /></td>
                  <td className="px-5 py-4"><Skeleton className="h-4 w-24" /></td>
                  <td className="px-5 py-4"><Skeleton className="h-5 w-20" /></td>
                  <td className="px-5 py-4"><Skeleton className="h-4 w-24" /></td>
                  <td className="px-5 py-4"><Skeleton className="ml-auto h-4 w-20" /></td>
                </tr>
              ))}

            {!loading && blogs.length === 0 && (
              <tr>
                <td colSpan={5} className="px-5 py-12 text-center text-[14px] text-gray-500">
                  Aucun article. Créez votre premier article !
                </td>
              </tr>
            )}

            {blogs.map((blog) => {
              const st = statusColors[blog.status];
              return (
                <tr
                  key={blog.id}
                  className="border-b border-white/[0.04] transition-colors hover:bg-white/[0.02]"
                >
                  <td className="px-5 py-4">
                    <p className="text-[14px] font-medium text-white">{blog.titleFr}</p>
                    <p className="mt-0.5 text-[12px] text-gray-500">{blog.titleEn}</p>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-[13px] text-gray-400">
                      {categoryLabels[blog.category] || blog.category}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <button
                      onClick={() => toggleStatus(blog)}
                      className={`rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider ${st.bg} ${st.text}`}
                    >
                      {st.label}
                    </button>
                  </td>
                  <td className="px-5 py-4 text-[13px] text-gray-500">
                    {new Date(blog.createdAt).toLocaleDateString("fr-FR")}
                  </td>
                  <td className="px-5 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/blogs/${blog.id}/edit`}
                        className="rounded-lg border border-white/[0.06] px-3 py-1.5 text-[12px] font-medium text-gray-400 transition-colors hover:border-white/[0.12] hover:text-white"
                      >
                        Modifier
                      </Link>
                      <button
                        onClick={() => handleDelete(blog.id)}
                        disabled={deleting === blog.id}
                        className="rounded-lg border border-white/[0.06] px-3 py-1.5 text-[12px] font-medium text-gray-400 transition-colors hover:border-red-500/30 hover:text-red-400 disabled:opacity-50"
                      >
                        {deleting === blog.id ? "..." : "Supprimer"}
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
