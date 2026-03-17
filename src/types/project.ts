export interface Project {
  id: string;
  slug: string;
  titleFr: string;
  titleEn: string;
  descriptionFr: string;
  descriptionEn: string;
  image: string;
  link: string;
  category: "web" | "mobile" | "design" | "ai";
  status: "draft" | "published";
  createdAt: string;
  updatedAt: string;
}

export type ProjectCategory = Project["category"];
