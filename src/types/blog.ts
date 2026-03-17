export interface Blog {
  id: string;
  slug: string;
  titleFr: string;
  titleEn: string;
  excerptFr: string;
  excerptEn: string;
  contentFr: string;
  contentEn: string;
  category: "dev" | "research" | "training" | "news";
  status: "draft" | "published";
  author: string;
  readTime: number;
  metaDescriptionFr: string;
  metaDescriptionEn: string;
  keywordsFr: string[];
  keywordsEn: string[];
  createdAt: string;
  updatedAt: string;
}

export type BlogCategory = Blog["category"];
export type BlogStatus = Blog["status"];
