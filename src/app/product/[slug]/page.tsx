import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "../../_components/Navbar";
import CategoryTabs from "../../_components/CategoryTabs";
import Marquee from "../../_components/Marquee";
import Footer from "../../_components/Footer";
import { getProduct, getCategories, getProducts, type Market } from "@/lib/api";
import { formatBnPrice, unitBn, toBn } from "@/lib/bn";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const [product, categories, allProducts] = await Promise.all([
    getProduct(slug),
    getCategories(),
    getProducts(),
  ]);

  if (!product) notFound();

  // ----- Derived stats -----
  const mins = product.markets.map((m) => m.min);
  const maxs = product.markets.map((m) => m.max);
  const minimum = Math.min(...mins);
  const maximum = Math.max(...maxs);
  const average = Math.round(
    product.markets.reduce((s, m) => s + (m.min + m.max) / 2, 0) /
      product.markets.length,
  );

  const dir = product.change.dir;
  const changeColor =
    dir === "up"
      ? "bg-red-50 text-red-600"
      : dir === "down"
        ? "bg-green-50 text-green-600"
        : "bg-gray-100 text-gray-500";
  const arrow = dir === "up" ? "▲" : dir === "down" ? "▼" : "—";

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <CategoryTabs categories={categories} />
      <Marquee items={allProducts} />

      <div className="flex-1 max-w-6xl mx-auto w-full px-4 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-6 flex items-center gap-2 flex-wrap">
          <Link href="/" className="hover:text-green-700">
            হোম
          </Link>
          <span>›</span>
          <Link
            href={`/category/${product.category}`}
            className="hover:text-green-700"
          >
            {product.categoryNameBn}
          </Link>
          <span>›</span>
          <span className="text-gray-700">{product.nameBn}</span>
        </nav>

        {/* Summary card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col sm:flex-row items-start justify-between gap-6 mb-8">
          <div className="flex items-start gap-4 min-w-0">
            <span className="text-5xl shrink-0">{product.image}</span>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-1">
                {product.nameBn}
              </h1>
              <p className="text-sm text-gray-500 mb-1">
                {unitBn(product.unit)}
              </p>
              <p className="text-sm text-gray-600">
                সর্বশেষ বুকিং <span className="font-semibold">আজ</span> দাম{" "}
                {dir === "up"
                  ? "বেড়েছে"
                  : dir === "down"
                    ? "কমেছে"
                    : "অপরিবর্তিত"}
                {dir !== "flat" && (
                  <>
                    {" "}
                    <span className="font-semibold">
                      {toBn(Math.abs(product.change.pct).toFixed(1))}%
                    </span>
                  </>
                )}
              </p>
            </div>
          </div>

          <div className="text-right shrink-0">
            <p className="text-xs text-gray-500 mb-1">আজকের দাম</p>
            <p className="text-3xl font-bold text-gray-900 leading-none">
              {formatBnPrice(product.today)}
            </p>
            <p className="text-sm text-gray-500 mb-2">
              টাকা / {unitBn(product.unit).replace("প্রতি ", "")}
            </p>
            <span
              className={`inline-block text-xs font-bold px-2.5 py-1 rounded-md ${changeColor}`}
            >
              {arrow} {toBn(Math.abs(product.change.pct).toFixed(1))}%
            </span>
          </div>
        </div>

        {/* Price summary */}
        <div className="mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            দামের সারসংক্ষেপ
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <StatCard
              label="সর্বনিম্ন দাম"
              value={minimum}
              note="সম্ভাব্য সর্বনিম্ন বাজার দর"
              color="green"
            />
            <StatCard
              label="সর্বোচ্চ দাম"
              value={maximum}
              note="সম্ভাব্য সর্বোচ্চ বাজার দর"
              color="red"
            />
            <StatCard
              label="গড় দাম"
              value={average}
              note={`${toBn(product.markets.length)} টি বাজারের গড়`}
              color="gray"
            />
          </div>
        </div>

        {/* Markets table */}
        <div className="mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            বাজারভিত্তিক আজকের দাম
          </h2>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 text-gray-500">
                  <tr>
                    <th className="text-left px-4 py-3 font-medium">বাজার</th>
                    <th className="text-left px-4 py-3 font-medium">বিভাগ</th>
                    <th className="text-right px-4 py-3 font-medium">
                      সর্বনিম্ন
                    </th>
                    <th className="text-right px-4 py-3 font-medium">
                      সর্বোচ্চ
                    </th>
                    <th className="text-right px-4 py-3 font-medium">গড়</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {product.markets.map((m: Market, i: number) => {
                    const avg = Math.round((m.min + m.max) / 2);
                    return (
                      <tr key={i} className="hover:bg-gray-50/60">
                        <td className="px-4 py-3 text-gray-800">{m.market}</td>
                        <td className="px-4 py-3 text-gray-600">
                          {m.division}
                        </td>
                        <td className="px-4 py-3 text-right text-gray-800">
                          {toBn(m.min)}
                        </td>
                        <td className="px-4 py-3 text-right text-gray-800">
                          {toBn(m.max)}
                        </td>
                        <td className="px-4 py-3 text-right font-medium text-gray-900">
                          {toBn(avg)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Back to category */}
        <div className="text-center">
          <Link
            href={`/category/${product.category}`}
            className="inline-block text-sm text-green-700 hover:underline"
          >
            ← সব {product.categoryNameBn} দেখুন
          </Link>
        </div>
      </div>

      <Footer />
    </main>
  );
}

function StatCard({
  label,
  value,
  note,
  color,
}: {
  label: string;
  value: number;
  note: string;
  color: "green" | "red" | "gray";
}) {
  const colorMap = {
    green: "text-green-600",
    red: "text-red-600",
    gray: "text-gray-700",
  } as const;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
      <p className="text-xs text-gray-500 mb-2">{label}</p>
      <p className={`text-3xl font-bold ${colorMap[color]}`}>
        {formatBnPrice(value)}{" "}
        <span className="text-base font-medium">টাকা</span>
      </p>
      <p className="text-xs text-gray-500 mt-1">{note}</p>
    </div>
  );
}
