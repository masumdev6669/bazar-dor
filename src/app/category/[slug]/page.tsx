"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Navbar from "../../_components/Navbar";
import CategoryTabs from "../../_components/CategoryTabs";
import Marquee from "../../_components/Marquee";
import ProductCard from "../../_components/ProductCard";
import SortDropdown, { type SortKey } from "../../_components/SortDropdown";
import Footer from "../../_components/Footer";
import {
  getCategories,
  getProducts,
  type Category,
  type Product,
} from "@/lib/api";
import { toBn } from "@/lib/bn";

const CATEGORY_META: Record<string, { icon: string; nameBn: string }> = {
  chal: { icon: "🍚", nameBn: "চাল" },
  dal: { icon: "🫘", nameBn: "ডাল" },
  tel: { icon: "🛢️", nameBn: "তেল" },
  sobji: { icon: "🥬", nameBn: "সবজি" },
  mach: { icon: "🐟", nameBn: "মাছ" },
  mangsho: { icon: "🍗", nameBn: "মাংস" },
  "dim-dui": { icon: "🥛", nameBn: "ডিম-দুধ" },
  mosla: { icon: "🌶️", nameBn: "মসলা" },
};

export default function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();

  const [categories, setCategories] = useState<Category[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [products, setProducts] = useState<Product[] | null>(null);
  const [sort, setSort] = useState<SortKey>("default");

  // Load nav data (categories + marquee products) once
  useEffect(() => {
    getCategories()
      .then(setCategories)
      .catch(() => {});
    getProducts()
      .then(setAllProducts)
      .catch(() => {});
  }, []);

  // Load products for this category whenever slug changes
  useEffect(() => {
    setProducts(null);
    getProducts(slug)
      .then((data) => setProducts(data ?? []))
      .catch(() => setProducts([]));
  }, [slug]);

  const sorted = useMemo(() => {
    if (!products) return null;
    if (sort === "low") return [...products].sort((a, b) => a.today - b.today);
    if (sort === "high") return [...products].sort((a, b) => b.today - a.today);
    return products;
  }, [products, sort]);

  const meta = CATEGORY_META[slug];
  const isEmpty = sorted !== null && sorted.length === 0;

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <CategoryTabs categories={categories} />
      {allProducts.length > 0 && <Marquee items={allProducts} />}

      <div className="flex-1 max-w-6xl mx-auto w-full px-4 py-8">
        {/* Invalid slug or no products */}
        {!meta || isEmpty ? (
          <div className="text-center py-20">
            <p className="text-6xl mb-4">🔍</p>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              ক্যাটাগরি খুঁজে পাওয়া যায়নি
            </h1>
            <p className="text-gray-500 mb-6">
              "{slug}" নামে কোনো ক্যাটাগরি বা পণ্য নেই।
            </p>
            <Link
              href="/"
              className="inline-block bg-green-700 hover:bg-green-800 text-white font-semibold px-6 py-3 rounded-md transition"
            >
              হোম পেজে ফিরে যান
            </Link>
          </div>
        ) : (
          <>
            {/* Info bar */}
            <div className="bg-green-50 border border-green-100 rounded-2xl px-6 py-5 mb-6 flex items-center gap-4">
              <span className="text-3xl">{meta.icon}</span>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  {meta.nameBn}
                </h1>
                <p className="text-sm text-gray-600">
                  প্রতি কেজি পণ্যের আজকের দাম ও পরিবর্তন
                </p>
              </div>
            </div>

            {/* Sort + count */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
              <p className="text-sm text-gray-500">
                মোট {sorted ? toBn(sorted.length) : "..."} টি পণ্য দেখানো হচ্ছে
              </p>
              <SortDropdown value={sort} onChange={setSort} />
            </div>

            {/* Product grid */}
            {sorted === null ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-40 bg-gray-200/60 rounded-2xl animate-pulse"
                  />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {sorted.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            )}
          </>
        )}
      </div>

      <Footer />
    </main>
  );
}
