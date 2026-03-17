import type { MetadataRoute } from "next";
import { getPublishedBlogs } from "@/src/lib/blogs";
import { getPublishedProjects } from "@/src/lib/projects";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://alopro.net";

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/departments/dev`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/departments/research`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/departments/training`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/legal`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${siteUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  // Dynamic blog pages
  let blogPages: MetadataRoute.Sitemap = [];
  try {
    const blogs = await getPublishedBlogs();
    blogPages = blogs.map((blog) => ({
      url: `${siteUrl}/blog/${blog.slug}`,
      lastModified: new Date(blog.updatedAt),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));
  } catch {
    // Ignore errors during build
  }

  // Dynamic project pages (if you add detail pages later)
  let projectCount = 0;
  try {
    const projects = await getPublishedProjects();
    projectCount = projects.length;
  } catch {
    // Ignore
  }

  // Update projects page lastModified if there are projects
  if (projectCount > 0) {
    const projectsPage = staticPages.find((p) => p.url.endsWith("/projects"));
    if (projectsPage) projectsPage.lastModified = new Date();
  }

  return [...staticPages, ...blogPages];
}
