import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { title, category, language } = await request.json();

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "GROQ_API_KEY not configured" }, { status: 500 });
  }

  const langLabel = language === "fr" ? "français" : "anglais";
  const prompt = `Tu es un rédacteur SEO expert. Génère du contenu de blog pour une agence digitale nommée ALOPRO.

Titre de l'article : "${title}"
Catégorie : ${category}
Langue : ${langLabel}

Réponds UNIQUEMENT avec un JSON valide (sans markdown, sans backticks) avec cette structure exacte :
{
  "excerpt": "Un résumé accrocheur de 2-3 phrases (max 160 caractères pour le SEO)",
  "content": "Le contenu complet de l'article en HTML avec des balises <h2>, <h3>, <p>, <ul>, <li>, <strong>. Minimum 800 mots, bien structuré avec des sous-titres.",
  "metaDescription": "Description meta SEO optimisée (max 155 caractères)",
  "keywords": ["mot-clé1", "mot-clé2", "mot-clé3", "mot-clé4", "mot-clé5"],
  "readTime": 5
}`;

  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 4096,
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    return NextResponse.json({ error: "Groq API error", details: err }, { status: 502 });
  }

  const data = await response.json();
  const raw = data.choices?.[0]?.message?.content ?? "";

  try {
    const parsed = JSON.parse(raw);
    return NextResponse.json(parsed);
  } catch {
    return NextResponse.json({ error: "Failed to parse AI response", raw }, { status: 500 });
  }
}
