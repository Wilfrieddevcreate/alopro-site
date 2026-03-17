"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Project } from "@/src/types/project";

const statusColors: Record<string, { bg: string; text: string; label: string }> = {
  published: { bg: "bg-emerald-500/10", text: "text-emerald-400", label: "Publié" },
  draft: { bg: "bg-amber-500/10", text: "text-amber-400", label: "Brouillon" },
};

const categoryLabels: Record<string, string> = {
  web: "Web",
  mobile: "Mobile",
  design: "Design",
  ai: "IA",
};

function Skeleton({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse rounded bg-white/[0.06] ${className}`} />;
}

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/projects")
      .then((r) => r.json())
      .then((data) => {
        setProjects(data);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Supprimer ce projet ?")) return;
    setDeleting(id);
    await fetch(`/api/admin/projects/${id}`, { method: "DELETE" });
    setProjects((prev) => prev.filter((p) => p.id !== id));
    setDeleting(null);
  };

  const toggleStatus = async (project: Project) => {
    const newStatus = project.status === "published" ? "draft" : "published";
    await fetch(`/api/admin/projects/${project.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
    setProjects((prev) =>
      prev.map((p) => (p.id === project.id ? { ...p, status: newStatus } : p))
    );
  };

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-[28px] font-bold text-white">Projets</h1>
          <p className="mt-1 text-[14px] text-gray-500">
            {projects.length} projet{projects.length !== 1 ? "s" : ""}
          </p>
        </div>
        <Link
          href="/admin/projects/new"
          className="flex items-center gap-2 rounded-lg bg-[#1F6FEB] px-4 py-2.5 text-[13px] font-semibold text-white transition-colors hover:bg-[#1a5fd4]"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Nouveau projet
        </Link>
      </div>

      {/* Grid of project cards */}
      {loading && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
              <Skeleton className="mb-3 h-36 w-full rounded-lg" />
              <Skeleton className="mb-2 h-5 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      )}

      {!loading && projects.length === 0 && (
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] py-16 text-center">
          <p className="text-[14px] text-gray-500">Aucun projet. Ajoutez votre premier projet !</p>
        </div>
      )}

      {!loading && projects.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => {
            const st = statusColors[project.status];
            return (
              <div
                key={project.id}
                className="group overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.02] transition-colors hover:border-white/[0.10]"
              >
                {/* Image preview */}
                <div className="relative h-40 bg-white/[0.03]">
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.titleFr}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-gray-700">
                        <rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" />
                      </svg>
                    </div>
                  )}
                  <div className="absolute right-2 top-2">
                    <button
                      onClick={() => toggleStatus(project)}
                      className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${st.bg} ${st.text}`}
                    >
                      {st.label}
                    </button>
                  </div>
                </div>

                <div className="p-4">
                  <p className="mb-0.5 text-[12px] text-gray-500">
                    {categoryLabels[project.category] || project.category}
                  </p>
                  <h3 className="mb-1 text-[15px] font-bold text-white">{project.titleFr}</h3>
                  <p className="text-[12px] text-gray-500">{project.titleEn}</p>

                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-block text-[12px] text-[#1F6FEB] hover:underline"
                    >
                      {project.link}
                    </a>
                  )}

                  <div className="mt-3 flex gap-2 border-t border-white/[0.06] pt-3">
                    <Link
                      href={`/admin/projects/${project.id}/edit`}
                      className="rounded-lg border border-white/[0.06] px-3 py-1.5 text-[12px] font-medium text-gray-400 transition-colors hover:border-white/[0.12] hover:text-white"
                    >
                      Modifier
                    </Link>
                    <button
                      onClick={() => handleDelete(project.id)}
                      disabled={deleting === project.id}
                      className="rounded-lg border border-white/[0.06] px-3 py-1.5 text-[12px] font-medium text-gray-400 transition-colors hover:border-red-500/30 hover:text-red-400 disabled:opacity-50"
                    >
                      {deleting === project.id ? "..." : "Supprimer"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
