"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import type { ProjectCategory } from "@/src/types/project";

const categories: { value: ProjectCategory; label: string }[] = [
  { value: "web", label: "Web" },
  { value: "mobile", label: "Mobile" },
  { value: "design", label: "Design" },
  { value: "ai", label: "IA" },
];

export default function NewProjectPage() {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [form, setForm] = useState({
    titleFr: "",
    titleEn: "",
    descriptionFr: "",
    descriptionEn: "",
    image: "",
    link: "",
    category: "web" as ProjectCategory,
    status: "draft" as "draft" | "published",
  });

  const set = (key: string, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Preview
    const reader = new FileReader();
    reader.onload = (ev) => setPreview(ev.target?.result as string);
    reader.readAsDataURL(file);

    // Upload
    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);

    try {
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      if (res.ok) {
        const { url } = await res.json();
        set("image", url);
      } else {
        const err = await res.json();
        alert(err.error || "Erreur lors de l'upload");
        setPreview(null);
      }
    } catch {
      alert("Erreur de connexion");
      setPreview(null);
    }
    setUploading(false);
  };

  const handleSave = async (status: "draft" | "published") => {
    if (!form.titleFr && !form.titleEn) return alert("Le titre est requis");
    setSaving(true);
    const res = await fetch("/api/admin/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, status }),
    });
    if (res.ok) router.push("/admin/projects");
    else alert("Erreur lors de la sauvegarde");
    setSaving(false);
  };

  return (
    <div className="mx-auto max-w-3xl">
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
          <h1 className="text-[28px] font-bold text-white">Nouveau projet</h1>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => handleSave("draft")}
            disabled={saving || uploading}
            className="rounded-lg border border-white/[0.08] px-4 py-2.5 text-[13px] font-semibold text-gray-300 transition-colors hover:border-white/[0.15] hover:text-white disabled:opacity-50"
          >
            Brouillon
          </button>
          <button
            onClick={() => handleSave("published")}
            disabled={saving || uploading}
            className="rounded-lg bg-[#1F6FEB] px-4 py-2.5 text-[13px] font-semibold text-white transition-colors hover:bg-[#1a5fd4] disabled:opacity-50"
          >
            {saving ? "Enregistrement..." : "Publier"}
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {/* Category + Link */}
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
            <label className="mb-2 block text-[12px] font-bold uppercase tracking-wider text-gray-500">Lien du projet</label>
            <input
              value={form.link}
              onChange={(e) => set("link", e.target.value)}
              placeholder="https://example.com"
              className="w-full rounded-lg border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-[14px] text-white placeholder-gray-600 outline-none focus:border-[#1F6FEB]/50"
            />
          </div>
        </div>

        {/* Image upload */}
        <div>
          <label className="mb-2 block text-[12px] font-bold uppercase tracking-wider text-gray-500">Image du projet</label>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          {preview || form.image ? (
            <div className="relative">
              <div className="h-48 overflow-hidden rounded-xl border border-white/[0.06]">
                <img
                  src={preview || form.image}
                  alt="Aperçu"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute right-3 top-3 flex gap-2">
                <button
                  onClick={() => fileRef.current?.click()}
                  className="rounded-lg bg-black/60 px-3 py-1.5 text-[12px] font-medium text-white backdrop-blur-sm transition-colors hover:bg-black/80"
                >
                  Changer
                </button>
                <button
                  onClick={() => { set("image", ""); setPreview(null); }}
                  className="rounded-lg bg-red-500/60 px-3 py-1.5 text-[12px] font-medium text-white backdrop-blur-sm transition-colors hover:bg-red-500/80"
                >
                  Supprimer
                </button>
              </div>
              {uploading && (
                <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-black/50">
                  <div className="flex items-center gap-2 text-[13px] font-medium text-white">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="animate-spin">
                      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                    </svg>
                    Upload en cours...
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => fileRef.current?.click()}
              className="flex h-48 w-full items-center justify-center rounded-xl border-2 border-dashed border-white/[0.08] bg-white/[0.01] transition-colors hover:border-white/[0.15] hover:bg-white/[0.03]"
            >
              <div className="text-center">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-2 text-gray-600">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" />
                </svg>
                <p className="text-[13px] font-medium text-gray-500">Cliquez pour choisir une image</p>
                <p className="mt-1 text-[11px] text-gray-600">JPG, PNG, WebP, GIF (max 5 Mo)</p>
              </div>
            </button>
          )}
        </div>

        {/* French */}
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-6">
          <h2 className="mb-4 flex items-center gap-2 text-[16px] font-bold text-white">
            <span className="rounded bg-blue-500/15 px-2 py-0.5 text-[11px] font-bold text-blue-400">FR</span>
            Contenu français
          </h2>
          <div className="space-y-4">
            <div>
              <label className="mb-1.5 block text-[12px] font-medium text-gray-500">Titre</label>
              <input value={form.titleFr} onChange={(e) => set("titleFr", e.target.value)} placeholder="Titre du projet" className="w-full rounded-lg border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-[14px] text-white placeholder-gray-600 outline-none focus:border-[#1F6FEB]/50" />
            </div>
            <div>
              <label className="mb-1.5 block text-[12px] font-medium text-gray-500">Description</label>
              <textarea value={form.descriptionFr} onChange={(e) => set("descriptionFr", e.target.value)} rows={4} placeholder="Description du projet en français" className="w-full resize-y rounded-lg border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-[14px] text-white placeholder-gray-600 outline-none focus:border-[#1F6FEB]/50" />
            </div>
          </div>
        </div>

        {/* English */}
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-6">
          <h2 className="mb-4 flex items-center gap-2 text-[16px] font-bold text-white">
            <span className="rounded bg-emerald-500/15 px-2 py-0.5 text-[11px] font-bold text-emerald-400">EN</span>
            English content
          </h2>
          <div className="space-y-4">
            <div>
              <label className="mb-1.5 block text-[12px] font-medium text-gray-500">Title</label>
              <input value={form.titleEn} onChange={(e) => set("titleEn", e.target.value)} placeholder="Project title" className="w-full rounded-lg border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-[14px] text-white placeholder-gray-600 outline-none focus:border-[#1F6FEB]/50" />
            </div>
            <div>
              <label className="mb-1.5 block text-[12px] font-medium text-gray-500">Description</label>
              <textarea value={form.descriptionEn} onChange={(e) => set("descriptionEn", e.target.value)} rows={4} placeholder="Project description in English" className="w-full resize-y rounded-lg border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-[14px] text-white placeholder-gray-600 outline-none focus:border-[#1F6FEB]/50" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
