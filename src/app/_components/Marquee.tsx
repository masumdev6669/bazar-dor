import { formatBnPrice, unitBn, toBn } from "@/lib/bn";
import type { Product } from "@/lib/api";

export default function Marquee({ items }: { items: Product[] }) {
  // Duplicate twice so the loop is seamless on wide screens
  const doubled = [...items, ...items];

  return (
    <div className="bg-green-50 border-b border-green-100 overflow-hidden">
      <div className="flex gap-8 animate-marquee whitespace-nowrap py-2 px-4">
        {doubled.map((p, i) => {
          const dir = p.change.dir;
          const color =
            dir === "up"
              ? "text-red-600"
              : dir === "down"
                ? "text-green-600"
                : "text-gray-500";
          const arrow = dir === "up" ? "▲" : dir === "down" ? "▼" : "—";
          const unitLabel = unitBn(p.unit).replace("প্রতি ", "");

          return (
            <span
              key={`${p.id}-${i}`}
              className="flex items-center gap-1.5 text-sm shrink-0"
            >
              <span>{p.image}</span>
              <span className="font-medium text-gray-800">{p.nameBn}</span>
              <span className="text-gray-600">
                {formatBnPrice(p.today)} টাকা/{unitLabel}
              </span>
              <span className={`font-semibold ${color}`}>
                {arrow} {toBn(Math.abs(p.change.pct).toFixed(1))}%
              </span>
            </span>
          );
        })}
      </div>
    </div>
  );
}
