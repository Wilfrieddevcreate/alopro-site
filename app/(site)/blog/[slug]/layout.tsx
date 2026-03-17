import type { Metadata } from "next";
import { getBlogBySlug } from "@/src/lib/blogs";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  let blog;
  try {
    blog = await getBlogBySlug(slug);
  } catch {
    return { title: "Article" };
  }

  if (!blog) return { title: "Article introuvable" };

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://alopro.net";

  return {
    title: blog.titleFr,
    description: blog.metaDescriptionFr || blog.excerptFr,
    keywords: blog.keywordsFr,
    authors: [{ name: blog.author }],
    openGraph: {
      type: "article",
      title: blog.titleFr,
      description: blog.metaDescriptionFr || blog.excerptFr,
      publishedTime: blog.createdAt,
      modifiedTime: blog.updatedAt,
      authors: [blog.author],
      tags: blog.keywordsFr,
    },
    twitter: {
      card: "summary_large_image",
      title: blog.titleFr,
      description: blog.metaDescriptionFr || blog.excerptFr,
    },
    alternates: {
      canonical: `${siteUrl}/blog/${blog.slug}`,
    },
  };
}

export default function BlogSlugLayout({ children }: { children: React.ReactNode }) {
  return children;
}
