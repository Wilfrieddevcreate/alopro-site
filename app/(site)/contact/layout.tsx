import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact — Démarrer un Projet",
  description:
    "Contactez Alopro pour discuter de votre projet digital. Développement web, application mobile, design ou formation — nous sommes à votre écoute.",
  openGraph: {
    title: "Contactez-nous — Alopro",
    description:
      "Discutons de votre projet digital. Contactez notre équipe pour un accompagnement sur mesure.",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
