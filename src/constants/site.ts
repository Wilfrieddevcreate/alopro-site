export const SITE_NAME = "Alopro";

export const NAV_ITEMS = [
  { key: "nav.home", href: "/" },
  { key: "nav.services", href: "#services" },
  { key: "nav.projects", href: "/projects" },
  { key: "nav.about", href: "#about" },
  { key: "nav.blog", href: "/blog" },
  { key: "nav.contact", href: "/contact" },
] as const;

export const ROUTES = {
  HOME: "/",
  SERVICES: "#services",
  PROJECTS: "#portfolio",
  ABOUT: "#about",
  CONTACT: "/contact",
} as const;
