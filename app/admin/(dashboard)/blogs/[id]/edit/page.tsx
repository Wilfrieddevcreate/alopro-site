"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import type { Blog, BlogCategory, BlogStatus } from "@/src/types/blog";

const categories: { value: BlogCategory; label: string }[] = [
  { value: "dev", label: "Développement" },
  { value: "research", label: "Recherche" },
  { value: "training", label: "Formation" },
  { value: "news", label: "Actualités" },
];

function Skeleton({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse rounded bg-white/[0.06] ${className}`} />;
}

export default function EditBlogPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [generating, setGenerating] = useState<"fr" | "en" | null>(null);

  const [form, setForm] = useState({
    titleFr: "",
    titleEn: "",
    excerptFr: "",
    excerptEn: "",
    contentFr: "",
    contentEn: "",
    category: "dev" as BlogCategory,
    status: "draft" as BlogStatus,
    author: "",
    readTime: 5,
    metaDescriptionFr: "",
    metaDescriptionEn: "",
    keywordsFr: [] as string[],
    keywordsEn: [] as string[],
  });

  useEffect(() => {
    fetch(`/api/admin/blogs/${id}`)
      .then((r) => r.json())
      .then((blog: Blog) => {
        setForm({
          titleFr: blog.titleFr,
          titleEn: blog.titleEn,
          excerptFr: blog.excerptFr,
          excerptEn: blog.excerptEn,
          contentFr: blog.contentFr,
          contentEn: blog.contentEn,
          category: blog.category,
          status: blog.status,
          author: blog.author,
          readTime: blog.readTime,
          metaDescriptionFr: blog.metaDescriptionFr,
          metaDescriptionEn: blog.metaDescriptionEn,
          keywordsFr: blog.keywordsFr,
          keywordsEn: blog.keywordsEn,
        });
        setLoading(false);
      });
  }, [id]);

  const set = (key: string, value: unknown) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleGenerate = async (lang: "fr" | "en") => {
    const title = lang === "fr" ? form.titleFr : form.titleEn;
    if (!title) return alert("Remplissez d'abord le titre");

    setGenerating(lang);
    try {
      const res = await fetch("/api/admin/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, category: form.category, language: lang }),
      });

      if (!res.ok) {
        const err = await res.json();
        alert("Erreur : " + (err.error || "Échec"));
        return;
      }

      const data = await res.json();
      if (lang === "fr") {
        set("excerptFr", data.excerpt || "");
        set("contentFr", data.content || "");
        set("metaDescriptionFr", data.metaDescription || "");
        set("keywordsFr", data.keywords || []);
        set("readTime", data.readTime || 5);
      } else {
        set("excerptEn", data.excerpt || "");
        set("contentEn", data.content || "");
        set("metaDescriptionEn", data.metaDescription || "");
        set("keywordsEn", data.keywords || []);
      }
    } catch {
      alert("Erreur de connexion");
    } finally {
      setGenerating(null);
    }
  };

  const handleSave = async (status?: BlogStatus) => {
    setSaving(true);
    const payload = status ? { ...form, status } : form;
    const res = await fetch(`/api/admin/blogs/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (res.ok) {
      router.push("/admin");
    } else {
      alert("Erreur lors de la sauvegarde");
    }
    setSaving(false);
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-4xl space-y-6">
        <Skeleton className="h-10 w-64" />
        <div className="grid grid-cols-2 gap-4">
          <Skeleton className="h-12" /><Skeleton className="h-12" />
        </div>
        <Skeleton className="h-[400px] rounded-xl" />
        <Skeleton className="h-[400px] rounded-xl" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <button
            onClick={() => router.back()}
            className="mb-2 flex items-center gap-1 text-[13px] text-gray-500 transition-colors hover:text-white"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Retour
          </button>
          <h1 className="text-[28px] font-bold text-white">Modifier l&apos;article</h1>
        </div>
        <div className="flex gap-2">
          {form.status === "published" ? (
            <button
              onClick={() => handleSave("draft")}
              disabled={saving}
              className="rounded-lg border border-amber-500/20 px-4 py-2.5 text-[13px] font-semibold text-amber-400 transition-colors hover:bg-amber-500/10 disabled:opacity-50"
            >
              Repasser en brouillon
            </button>
          ) : (
            <button
              onClick={() => handleSave("published")}
              disabled={saving}
              className="rounded-lg border border-emerald-500/20 px-4 py-2.5 text-[13px] font-semibold text-emerald-400 transition-colors hover:bg-emerald-500/10 disabled:opacity-50"
            >
              Publier
            </button>
          )}
          <button
            onClick={() => handleSave()}
            disabled={saving}
            className="rounded-lg bg-[#1F6FEB] px-4 py-2.5 text-[13px] font-semibold text-white transition-colors hover:bg-[#1a5fd4] disabled:opacity-50"
          >
            {saving ? "Enregistrement..." : "Sauvegarder"}
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {/* Category + Author */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-2 block text-[12px] font-bold uppercase tracking-wider text-gray-500">Catégorie</label>
            <select
              value={form.category}
              onChange={(e) => set("category", e.target.value)}
              className="w-full rounded-lg border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-[14px] text-white outline-none focus:border-[#1F6FEB]/50"
            >
              {categories.map((c) => (
                <option key={c.value} value={c.value} className="bg-[#0a0a0a]">{c.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-2 block text-[12px] font-bold uppercase tracking-wider text-gray-500">Auteur</label>
            <input
              value={form.author}
              onChange={(e) => set("author", e.target.value)}
              className="w-full rounded-lg border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-[14px] text-white outline-none focus:border-[#1F6FEB]/50"
            />
          </div>
        </div>

        {/* French */}
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-[16px] font-bold text-white">
              <span className="rounded bg-blue-500/15 px-2 py-0.5 text-[11px] font-bold text-blue-400">FR</span>
              Contenu français
            </h2>
            <button
              onClick={() => handleGenerate("fr")}
              disabled={generating !== null}
              className="flex items-center gap-2 rounded-lg bg-purple-500/10 px-3 py-2 text-[12px] font-semibold text-purple-400 transition-colors hover:bg-purple-500/20 disabled:opacity-50"
            >
              {generating === "fr" ? "Génération..." : "Régénérer avec IA"}
            </button>
          </div>
          <div className="space-y-4">
            <div>
              <label className="mb-1.5 block text-[12px] font-medium text-gray-500">Titre</label>
              <input value={form.titleFr} onChange={(e) => set("titleFr", e.target.value)} className="w-full rounded-lg border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-[14px] text-white outline-none focus:border-[#1F6FEB]/50" />
            </div>
            <div>
              <label className="mb-1.5 block text-[12px] font-medium text-gray-500">Extrait</label>
              <textarea value={form.excerptFr} onChange={(e) => set("excerptFr", e.target.value)} rows={2} className="w-full resize-none rounded-lg border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-[14px] text-white outline-none focus:border-[#1F6FEB]/50" />
            </div>
            <div>
              <label className="mb-1.5 block text-[12px] font-medium text-gray-500">Contenu (HTML)</label>
              <textarea value={form.contentFr} onChange={(e) => set("contentFr", e.target.value)} rows={10} className="w-full resize-y rounded-lg border border-white/[0.08] bg-white/[0.03] px-4 py-3 font-mono text-[13px] text-white outline-none focus:border-[#1F6FEB]/50" />
            </div>
            <div>
              <label className="mb-1.5 block text-[12px] font-medium text-gray-500">Meta description</label>
              <input value={form.metaDescriptionFr} onChange={(e) => set("metaDescriptionFr", e.target.value)} maxLength={155} className="w-full rounded-lg border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-[14px] text-white outline-none focus:border-[#1F6FEB]/50" />
            </div>
            <div>
              <label className="mb-1.5 block text-[12px] font-medium text-gray-500">Mots-clés</label>
              <input value={form.keywordsFr.join(", ")} onChange={(e) => set("keywordsFr", e.target.value.split(",").map((k) => k.trim()).filter(Boolean))} className="w-full rounded-lg border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-[14px] text-white outline-none focus:border-[#1F6FEB]/50" />
            </div>
          </div>
        </div>

        {/* English */}
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-[16px] font-bold text-white">
              <span className="rounded bg-emerald-500/15 px-2 py-0.5 text-[11px] font-bold text-emerald-400">EN</span>
              English content
            </h2>
            <button
              onClick={() => handleGenerate("en")}
              disabled={generating !== null}
              className="flex items-center gap-2 rounded-lg bg-purple-500/10 px-3 py-2 text-[12px] font-semibold text-purple-400 transition-colors hover:bg-purple-500/20 disabled:opacity-50"
            >
              {generating === "en" ? "Generating..." : "Regenerate with AI"}
            </button>
          </div>
          <div className="space-y-4">
            <div>
              <label className="mb-1.5 block text-[12px] font-medium text-gray-500">Title</label>
              <input value={form.titleEn} onChange={(e) => set("titleEn", e.target.value)} className="w-full rounded-lg border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-[14px] text-white outline-none focus:border-[#1F6FEB]/50" />
            </div>
            <div>
              <label className="mb-1.5 block text-[12px] font-medium text-gray-500">Excerpt</label>
              <textarea value={form.excerptEn} onChange={(e) => set("excerptEn", e.target.value)} rows={2} className="w-full resize-none rounded-lg border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-[14px] text-white outline-none focus:border-[#1F6FEB]/50" />
            </div>
            <div>
              <label className="mb-1.5 block text-[12px] font-medium text-gray-500">Content (HTML)</label>
              <textarea value={form.contentEn} onChange={(e) => set("contentEn", e.target.value)} rows={10} className="w-full resize-y rounded-lg border border-white/[0.08] bg-white/[0.03] px-4 py-3 font-mono text-[13px] text-white outline-none focus:border-[#1F6FEB]/50" />
            </div>
            <div>
              <label className="mb-1.5 block text-[12px] font-medium text-gray-500">Meta description</label>
              <input value={form.metaDescriptionEn} onChange={(e) => set("metaDescriptionEn", e.target.value)} maxLength={155} className="w-full rounded-lg border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-[14px] text-white outline-none focus:border-[#1F6FEB]/50" />
            </div>
            <div>
              <label className="mb-1.5 block text-[12px] font-medium text-gray-500">Keywords</label>
              <input value={form.keywordsEn.join(", ")} onChange={(e) => set("keywordsEn", e.target.value.split(",").map((k) => k.trim()).filter(Boolean))} className="w-full rounded-lg border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-[14px] text-white outline-none focus:border-[#1F6FEB]/50" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
