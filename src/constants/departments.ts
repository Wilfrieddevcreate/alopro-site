export interface DepartmentProject {
  key: string;
  color: string;
}

export interface DepartmentService {
  key: string;
}

export interface DepartmentTeamMember {
  key: string;
}

export interface Department {
  slug: string;
  color: string;
  lightBg: string;
  translationPrefix: string;
  services: DepartmentService[];
  currentProjects: DepartmentProject[];
  completedProjects: DepartmentProject[];
  team: DepartmentTeamMember[];
}

export const DEPARTMENTS: Department[] = [
  {
    slug: "dev",
    color: "#2563EB",
    lightBg: "bg-blue-50",
    translationPrefix: "dept.dev",
    services: [
      { key: "s1" }, { key: "s2" }, { key: "s3" }, { key: "s4" }, { key: "s5" }, { key: "s6" },
    ],
    currentProjects: [
      { key: "p1", color: "#1F6FEB" },
      { key: "p2", color: "#1F6FEB" },
    ],
    completedProjects: [
      { key: "p1", color: "#059669" },
      { key: "p2", color: "#EA580C" },
      { key: "p3", color: "#1F6FEB" },
    ],
    team: [{ key: "m1" }, { key: "m2" }, { key: "m3" }, { key: "m4" }],
  },
  {
    slug: "research",
    color: "#1F6FEB",
    lightBg: "bg-blue-50",
    translationPrefix: "dept.research",
    services: [
      { key: "s1" }, { key: "s2" }, { key: "s3" }, { key: "s4" }, { key: "s5" }, { key: "s6" },
    ],
    currentProjects: [
      { key: "p1", color: "#1F6FEB" },
      { key: "p2", color: "#1F6FEB" },
    ],
    completedProjects: [
      { key: "p1", color: "#059669" },
      { key: "p2", color: "#1F6FEB" },
      { key: "p3", color: "#EA580C" },
    ],
    team: [{ key: "m1" }, { key: "m2" }, { key: "m3" }, { key: "m4" }],
  },
  {
    slug: "training",
    color: "#1F6FEB",
    lightBg: "bg-blue-50",
    translationPrefix: "dept.training",
    services: [
      { key: "s1" }, { key: "s2" }, { key: "s3" }, { key: "s4" }, { key: "s5" }, { key: "s6" },
    ],
    currentProjects: [
      { key: "p1", color: "#059669" },
      { key: "p2", color: "#1F6FEB" },
    ],
    completedProjects: [
      { key: "p1", color: "#1F6FEB" },
      { key: "p2", color: "#059669" },
      { key: "p3", color: "#1F6FEB" },
    ],
    team: [{ key: "m1" }, { key: "m2" }, { key: "m3" }, { key: "m4" }],
  },
];

export const DEPARTMENT_SLUGS = DEPARTMENTS.map((d) => d.slug);

export function getDepartmentBySlug(slug: string): Department | undefined {
  return DEPARTMENTS.find((d) => d.slug === slug);
}
