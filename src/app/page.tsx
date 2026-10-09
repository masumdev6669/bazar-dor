import Navbar from "./_components/Navbar";
import CategoryTabs from "./_components/CategoryTabs";
import Marquee from "./_components/Marquee";
import { getCategories, getProducts } from "@/lib/api";
import Hero from "./_components/Hero";

export default async function Home() {
  const [categories, products] = await Promise.all([
    getCategories(),
    getProducts(),
  ]);

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <CategoryTabs categories={categories} />
      <Marquee items={products} />
      <Hero />
    </main>
  );
}
