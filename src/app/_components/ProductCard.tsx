import Link from "next/link";
import type { Product } from "@/lib/api";
import { formatBnPrice, unitBn, toBn } from "@/lib/bn";

export default function ProductCard({ product }: { product: Product }) {
  const { dir, pct } = product.change;

  const badge =
    dir === "up"
      ? { cls: "bg-red-50 text-red-500", arrow: "▲" }
      : dir === "down"
        ? { cls: "bg-green-50 text-green-600", arrow: "▼" }
        : { cls: "bg-gray-100 text-gray-500", arrow: "—" };

  return (
    <Link
      href={`/product/${product.slug}`}
      className="bg-white rounded-2xl border border-gray-200 hover:border-green-300 hover:shadow-sm transition px-5 py-4 flex flex-col gap-5"
    >
      <div className="flex items-start gap-3">
        <span className="text-2xl leading-none mt-0.5 shrink-0 bg-gray-100 w-13 h-13 px-[9px] py-3 rounded-[8px]">
          {product.image}
        </span>
        <div className="min-w-0">
          <h3 className="font-semibold text-gray-900 leading-tight">
            {product.nameBn}
          </h3>
          <p className="text-xs text-gray-500 mt-0.5">{unitBn(product.unit)}</p>
        </div>
      </div>

      {/* Footer: label + price + badge */}
      <div className="flex items-end justify-between gap-3">
        <div>
          <p className="text-xs text-gray-500 mb-0.5">আজকের দাম</p>
          <p className="text-xl font-bold text-gray-900 leading-none">
            {formatBnPrice(product.today)}{" "}
            <span className="text-sm font-medium">টাকা</span>
          </p>
        </div>
        <span
          className={`text-xs font-semibold px-2.5 py-1.5 rounded-full shrink-0 ${badge.cls}`}
        >
          {badge.arrow} {toBn(Math.abs(pct).toFixed(1))}%
        </span>
      </div>
    </Link>
  );
}
