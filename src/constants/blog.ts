export interface BlogPost {
  slug: string;
  titleFr: string;
  titleEn: string;
  excerptFr: string;
  excerptEn: string;
  category: "dev" | "research" | "training" | "news";
  date: string;
  readTime: number;
  image: string;
  author: string;
}

export const BLOG_CATEGORIES = {
  all: { fr: "Tous", en: "All" },
  dev: { fr: "Développement", en: "Development" },
  research: { fr: "Recherche", en: "Research" },
  training: { fr: "Formation", en: "Training" },
  news: { fr: "Actualités", en: "News" },
} as const;

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "intelligence-artificielle-entreprise-2026",
    titleFr: "L'IA en entreprise : tendances et opportunités en 2026",
    titleEn: "AI in Business: Trends and Opportunities in 2026",
    excerptFr: "Découvrez comment l'intelligence artificielle transforme les processus métier et ouvre de nouvelles perspectives pour les entreprises de toutes tailles.",
    excerptEn: "Discover how artificial intelligence is transforming business processes and opening new perspectives for companies of all sizes.",
    category: "research",
    date: "2026-03-15",
    readTime: 8,
    image: "/images/blog/ai-business.jpg",
    author: "Équipe ALOPRO",
  },
  {
    slug: "nextjs-16-nouveautes",
    titleFr: "Next.js 16 : les nouveautés qui changent la donne",
    titleEn: "Next.js 16: Game-Changing New Features",
    excerptFr: "Tour d'horizon des fonctionnalités révolutionnaires de Next.js 16 et comment les exploiter dans vos projets web modernes.",
    excerptEn: "An overview of the revolutionary features of Next.js 16 and how to leverage them in your modern web projects.",
    category: "dev",
    date: "2026-03-10",
    readTime: 6,
    image: "/images/blog/nextjs.jpg",
    author: "Équipe ALOPRO",
  },
  {
    slug: "formation-cybersecurite-enjeux",
    titleFr: "Cybersécurité : pourquoi former vos équipes est devenu indispensable",
    titleEn: "Cybersecurity: Why Training Your Teams Has Become Essential",
    excerptFr: "Les cybermenaces évoluent constamment. Investir dans la formation de vos collaborateurs est la première ligne de défense.",
    excerptEn: "Cyber threats are constantly evolving. Investing in training your employees is the first line of defense.",
    category: "training",
    date: "2026-03-05",
    readTime: 5,
    image: "/images/blog/cybersecurity.jpg",
    author: "Équipe ALOPRO",
  },
  {
    slug: "blockchain-supply-chain",
    titleFr: "Blockchain et supply chain : révolutionner la traçabilité",
    titleEn: "Blockchain and Supply Chain: Revolutionizing Traceability",
    excerptFr: "Comment la technologie blockchain apporte transparence et confiance dans la gestion des chaînes d'approvisionnement mondiales.",
    excerptEn: "How blockchain technology brings transparency and trust to global supply chain management.",
    category: "research",
    date: "2026-02-28",
    readTime: 7,
    image: "/images/blog/blockchain.jpg",
    author: "Équipe ALOPRO",
  },
  {
    slug: "design-system-scalable",
    titleFr: "Construire un design system scalable pour votre entreprise",
    titleEn: "Building a Scalable Design System for Your Business",
    excerptFr: "Un guide pratique pour créer et maintenir un design system cohérent qui évolue avec vos besoins.",
    excerptEn: "A practical guide to creating and maintaining a consistent design system that scales with your needs.",
    category: "dev",
    date: "2026-02-20",
    readTime: 10,
    image: "/images/blog/design-system.jpg",
    author: "Équipe ALOPRO",
  },
  {
    slug: "iot-industrie-40",
    titleFr: "IoT et Industrie 4.0 : connecter l'usine du futur",
    titleEn: "IoT and Industry 4.0: Connecting the Factory of the Future",
    excerptFr: "L'Internet des objets redéfinit la production industrielle. Explorez les cas d'usage concrets et les bénéfices mesurables.",
    excerptEn: "The Internet of Things is redefining industrial production. Explore concrete use cases and measurable benefits.",
    category: "research",
    date: "2026-02-14",
    readTime: 9,
    image: "/images/blog/iot.jpg",
    author: "Équipe ALOPRO",
  },
  {
    slug: "react-server-components-guide",
    titleFr: "Guide complet des React Server Components",
    titleEn: "Complete Guide to React Server Components",
    excerptFr: "Maîtrisez les Server Components de React pour des applications plus rapides et une meilleure expérience développeur.",
    excerptEn: "Master React Server Components for faster applications and a better developer experience.",
    category: "dev",
    date: "2026-02-08",
    readTime: 12,
    image: "/images/blog/react-rsc.jpg",
    author: "Équipe ALOPRO",
  },
  {
    slug: "alopro-partenariat-innovation",
    titleFr: "ALOPRO signe un partenariat stratégique pour l'innovation",
    titleEn: "ALOPRO Signs a Strategic Innovation Partnership",
    excerptFr: "Nous sommes fiers d'annoncer un nouveau partenariat qui renforce notre capacité d'innovation et d'accompagnement.",
    excerptEn: "We are proud to announce a new partnership that strengthens our innovation and support capabilities.",
    category: "news",
    date: "2026-02-01",
    readTime: 4,
    image: "/images/blog/partnership.jpg",
    author: "Équipe ALOPRO",
  },
  {
    slug: "formation-cloud-aws-azure",
    titleFr: "Cloud : nos formations AWS et Azure certifiantes",
    titleEn: "Cloud: Our AWS and Azure Certification Training",
    excerptFr: "Préparez vos équipes aux certifications cloud les plus demandées avec nos programmes de formation sur mesure.",
    excerptEn: "Prepare your teams for the most in-demand cloud certifications with our tailored training programs.",
    category: "training",
    date: "2026-01-25",
    readTime: 5,
    image: "/images/blog/cloud.jpg",
    author: "Équipe ALOPRO",
  },
];

export const POSTS_PER_PAGE = 6;
