const BASE = "https://api.api-store.workers.dev/api/bazardor";

export type ChangeDir = "up" | "down" | "flat";

export interface Market {
  market: string;
  division: string;
  min: number;
  max: number;
}

export interface Product {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: { dir: ChangeDir; pct: number };
  markets: Market[];
}

export interface Category {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

export async function getCategories(): Promise<Category[]> {
  const res = await fetch(`${BASE}/categories`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to load categories");
  return res.json();
}

export async function getProducts(category?: string): Promise<Product[]> {
  const url = category
    ? `${BASE}/products?category=${encodeURIComponent(category)}`
    : `${BASE}/products`;
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to load products");
  return res.json();
}

export async function getProduct(slug: string): Promise<Product | null> {
  const res = await fetch(`${BASE}/products/${slug}`, { cache: "no-store" });
  if (!res.ok) return null;
  return res.json();
}

export const topRisers = (products: Product[], n = 6) =>
  [...products]
    .filter((p) => p.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, n);

export const topFallers = (products: Product[], n = 6) =>
  [...products]
    .filter((p) => p.change.dir === "down")
    .sort((a, b) => a.change.pct - b.change.pct)
    .slice(0, n);
