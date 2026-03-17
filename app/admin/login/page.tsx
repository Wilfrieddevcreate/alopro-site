"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push("/admin");
    } else {
      setError("Mot de passe incorrect");
    }
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#000000] px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="mb-8 text-center">
          <h1 className="text-[32px] font-bold text-white">
            ALO<span className="text-[#1F6FEB]">PRO</span>
          </h1>
          <p className="mt-2 text-[14px] text-gray-500">Espace administration</p>
        </div>

        {/* Card */}
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8"
        >
          <h2 className="mb-6 text-[20px] font-bold text-white">Connexion</h2>

          <div className="mb-4">
            <label className="mb-2 block text-[13px] font-medium text-gray-400">
              Mot de passe
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Entrez le code d'accès"
              className="w-full rounded-lg border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-[14px] text-white placeholder-gray-600 outline-none transition-colors focus:border-[#1F6FEB]/50 focus:ring-1 focus:ring-[#1F6FEB]/25"
              autoFocus
            />
          </div>

          {error && (
            <p className="mb-4 rounded-lg bg-red-500/10 px-3 py-2 text-[13px] text-red-400">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading || !password}
            className="w-full rounded-lg bg-[#1F6FEB] px-4 py-3 text-[14px] font-semibold text-white transition-colors hover:bg-[#1a5fd4] disabled:opacity-50"
          >
            {loading ? "Connexion..." : "Se connecter"}
          </button>
        </form>
      </div>
    </div>
  );
}
