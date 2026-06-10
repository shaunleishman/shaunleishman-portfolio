export const BLOG_CATEGORIES = [
  {
    id: "product-thinking",
    label: "Product Thinking",
    description: "Strategy, assumptions, prioritisation",
    thumbnailBg: "#F5EDB8",
    accentColor: "#B8922E",
  },
  {
    id: "user-behavior",
    label: "User Behavior",
    description: "Psychology, attention, cognitive load",
    thumbnailBg: "#D4E3F0",
    accentColor: "#4A7FA8",
  },
  {
    id: "research",
    label: "Research",
    description: "Testing, discovery, evidence-based tasks",
    thumbnailBg: "#F0D1D6",
    accentColor: "#B85C6B",
  },
  {
    id: "design-craft",
    label: "Design Craft",
    description: "UI, hierarchy, content, journeys, user flows",
    thumbnailBg: "#D8EBD8",
    accentColor: "#4A8F5C",
  },
  {
    id: "accessibility",
    label: "Accessibility",
    description: "Inclusive design, neurodiversity, readability",
    thumbnailBg: "#DDD6F0",
    accentColor: "#6B5BA6",
  },
] as const;

export type BlogCategoryId = (typeof BLOG_CATEGORIES)[number]["id"];

export type BlogCategory = (typeof BLOG_CATEGORIES)[number];

export const BLOG_CATEGORY_BY_ID: Record<BlogCategoryId, BlogCategory> = Object.fromEntries(
  BLOG_CATEGORIES.map((category) => [category.id, category]),
) as Record<BlogCategoryId, BlogCategory>;

export const BLOG_CATEGORY_FILTER_OPTIONS = ["All", ...BLOG_CATEGORIES.map((c) => c.label)] as const;

export type BlogCategoryFilter = (typeof BLOG_CATEGORY_FILTER_OPTIONS)[number];

export function getBlogCategory(id: BlogCategoryId): BlogCategory {
  return BLOG_CATEGORY_BY_ID[id];
}

export function getBlogCategoryByLabel(label: string): BlogCategory | undefined {
  return BLOG_CATEGORIES.find((category) => category.label === label);
}

export function resolveBlogCategoryId(
  category: BlogCategoryId | undefined,
  tags: string[],
): BlogCategoryId {
  if (category && category in BLOG_CATEGORY_BY_ID) {
    return category;
  }

  const tagLower = tags.map((tag) => tag.toLowerCase());
  if (tagLower.some((tag) => tag.includes("accessibility") || tag.includes("inclusive"))) {
    return "accessibility";
  }
  if (tagLower.some((tag) => tag.includes("research") || tag.includes("testing"))) {
    return "research";
  }
  if (tagLower.some((tag) => tag.includes("cognitive") || tag.includes("behavior") || tag.includes("behaviour"))) {
    return "user-behavior";
  }
  if (tagLower.some((tag) => tag.includes("ui") || tag.includes("craft") || tag.includes("design craft"))) {
    return "design-craft";
  }

  return "product-thinking";
}
