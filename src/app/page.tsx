import Navbar from "./_components/Navbar";
import CategoryTabs from "./_components/CategoryTabs";
import Marquee from "./_components/Marquee";
import Hero from "./_components/Hero";
import ProductCard from "./_components/ProductCard";
import { getCategories, getProducts, topRisers, topFallers } from "@/lib/api";
import { toBn } from "@/lib/bn";
import Footer from "./_components/Footer";

export default async function Home() {
  const [categories, products] = await Promise.all([
    getCategories(),
    getProducts(),
  ]);

  const risers = topRisers(products, 6);
  const fallers = topFallers(products, 6);

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <CategoryTabs categories={categories} />
      <Marquee items={products} />
      <Hero />

      <section className="max-w-6xl mx-auto px-4 mt-12 w-full">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <span className="text-red-500">▲</span> আজ দাম বেড়েছে
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {risers.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 mt-10 w-full">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <span className="text-green-600">▼</span> আজ দাম কমেছে
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {fallers.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {}
      <section
        id="সব-পণ্য"
        className="max-w-6xl mx-auto px-4 mt-10 mb-16 w-full scroll-mt-24"
      >
        <h2 className="text-xl font-bold text-gray-900 mb-1">সব পণ্য</h2>
        <p className="text-sm text-gray-500 mb-4">
          মোট {toBn(products.length)} টি পণ্য দেখানো হচ্ছে
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}
