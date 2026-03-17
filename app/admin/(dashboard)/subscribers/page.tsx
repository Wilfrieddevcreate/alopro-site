"use client";

import { useEffect, useState } from "react";
import type { Subscriber } from "@/src/lib/subscribers";

function Skeleton({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse rounded bg-white/6 ${className}`} />;
}

export default function AdminSubscribersPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/subscribers")
      .then((r) => r.json())
      .then((data) => {
        setSubscribers(data);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Supprimer cet abonné ?")) return;
    setDeleting(id);
    await fetch(`/api/admin/subscribers/${id}`, { method: "DELETE" });
    setSubscribers((prev) => prev.filter((s) => s.id !== id));
    setDeleting(null);
  };

  const handleExport = () => {
    const csv = ["Email,Date d'inscription"]
      .concat(subscribers.map((s) => `${s.email},${new Date(s.createdAt).toLocaleDateString("fr-FR")}`))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `subscribers-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-[28px] font-bold text-white">Newsletter</h1>
          <p className="mt-1 text-[14px] text-gray-500">
            {subscribers.length} abonné{subscribers.length !== 1 ? "s" : ""}
          </p>
        </div>
        {subscribers.length > 0 && (
          <button
            onClick={handleExport}
            className="flex items-center gap-2 rounded-lg border border-white/8 px-4 py-2.5 text-[13px] font-semibold text-gray-300 transition-colors hover:border-white/15 hover:text-white"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Exporter CSV
          </button>
        )}
      </div>

      <div className="overflow-hidden rounded-xl border border-white/6 bg-white/2">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/6">
              <th className="px-5 py-3 text-left text-[11px] font-bold uppercase tracking-[0.1em] text-gray-500">
                Email
              </th>
              <th className="px-5 py-3 text-left text-[11px] font-bold uppercase tracking-[0.1em] text-gray-500">
                Date d&apos;inscription
              </th>
              <th className="px-5 py-3 text-right text-[11px] font-bold uppercase tracking-[0.1em] text-gray-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {loading &&
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i} className="border-b border-white/4">
                  <td className="px-5 py-4"><Skeleton className="h-4 w-48" /></td>
                  <td className="px-5 py-4"><Skeleton className="h-4 w-28" /></td>
                  <td className="px-5 py-4"><Skeleton className="ml-auto h-4 w-20" /></td>
                </tr>
              ))}

            {!loading && subscribers.length === 0 && (
              <tr>
                <td colSpan={3} className="px-5 py-12 text-center text-[14px] text-gray-500">
                  Aucun abonné pour le moment.
                </td>
              </tr>
            )}

            {subscribers.map((sub) => (
              <tr
                key={sub.id}
                className="border-b border-white/4 transition-colors hover:bg-white/2"
              >
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1F6FEB]/10 text-[12px] font-bold text-[#1F6FEB]">
                      {sub.email.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-[14px] font-medium text-white">{sub.email}</span>
                  </div>
                </td>
                <td className="px-5 py-4 text-[13px] text-gray-500">
                  {new Date(sub.createdAt).toLocaleDateString("fr-FR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </td>
                <td className="px-5 py-4 text-right">
                  <button
                    onClick={() => handleDelete(sub.id)}
                    disabled={deleting === sub.id}
                    className="rounded-lg border border-white/6 px-3 py-1.5 text-[12px] font-medium text-gray-400 transition-colors hover:border-red-500/30 hover:text-red-400 disabled:opacity-50"
                  >
                    {deleting === sub.id ? "..." : "Supprimer"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
