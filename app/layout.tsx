import type { Metadata, Viewport } from "next";
import { Outfit } from "next/font/google";
import { ThemeProvider } from "@/src/contexts/ThemeContext";
import { LanguageProvider } from "@/src/contexts/LanguageContext";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://alopro.net";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Alopro — Agence Digitale | Développement Web, Recherche & Formation",
    template: "%s | Alopro",
  },
  description:
    "Alopro est une agence digitale spécialisée dans le développement web, la recherche innovante et la formation. Nous donnons vie à vos projets digitaux avec exigence et créativité.",
  keywords: [
    "agence digitale",
    "développement web",
    "création de site internet",
    "formation digitale",
    "recherche innovante",
    "application mobile",
    "design UI/UX",
    "intelligence artificielle",
    "Alopro",
  ],
  authors: [{ name: "Alopro", url: SITE_URL }],
  creator: "Alopro",
  publisher: "Alopro",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    alternateLocale: "en_US",
    url: SITE_URL,
    siteName: "Alopro",
    title: "Alopro — Agence Digitale | Développement Web, Recherche & Formation",
    description:
      "Agence digitale spécialisée dans le développement web, la recherche innovante et la formation. Nous donnons vie à vos projets digitaux.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Alopro — Agence Digitale",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Alopro — Agence Digitale",
    description:
      "Développement web, recherche innovante et formation. Nous donnons vie à vos projets digitaux.",
    images: ["/images/og-image.jpg"],
  },
  alternates: {
    canonical: SITE_URL,
    languages: {
      "fr-FR": SITE_URL,
      "en-US": SITE_URL,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        {/* JSON-LD Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Alopro",
              url: SITE_URL,
              logo: `${SITE_URL}/images/logo.png`,
              description:
                "Agence digitale spécialisée dans le développement web, la recherche innovante et la formation.",
              contactPoint: {
                "@type": "ContactPoint",
                email: "hello@alopro.net",
                contactType: "customer service",
                availableLanguage: ["French", "English"],
              },
              sameAs: [],
            }),
          }}
        />
      </head>
      <body className={`${outfit.variable} antialiased`}>
        <ThemeProvider>
          <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
