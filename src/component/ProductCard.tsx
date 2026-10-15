import Link from "next/link";
import type { Product } from "@/type/product";

const toBanglaNumber = (value: number) =>
  value.toLocaleString("bn-BD", {
    maximumFractionDigits: 2,
  });

const toBanglaUnit = (unit?: string) => {
  const units: Record<string, string> = {
    kg: "প্রতি কেজি",
    gram: "প্রতি গ্রাম",
    g: "প্রতি গ্রাম",
    liter: "প্রতি লিটার",
    litre: "প্রতি লিটার",
    l: "প্রতি লিটার",
    piece: "প্রতি পিস",
    pcs: "প্রতি পিস",
    dozen: "প্রতি ডজন",
    dozen_eggs: "প্রতি ডজন",
  };

  if (!unit) return "একক উল্লেখ নেই";

  return units[unit.toLowerCase()] || `প্রতি ${unit}`;
};

export default function ProductCard({
  product,
}: {
  product: Product;
}) {
  const direction = product.change?.dir ?? "flat";
  const percentage = product.change?.pct ?? 0;

  const badgeStyle =
    direction === "up"
      ? "bg-red-50 text-red-600"
      : direction === "down"
        ? "bg-emerald-50 text-emerald-700"
        : "bg-gray-100 text-gray-600";

  const badgeIcon =
    direction === "up" ? "▲" : direction === "down" ? "▼" : "—";

  return (
    <Link
      href={`/product/${product.id}`}
      className="block h-full rounded-xl focus-visible:ring-2 focus-visible:ring-emerald-500"
    >
      <article className="flex h-full min-h-[120px] flex-col justify-between gap-3 rounded-2xl border border-gray-200 bg-white p-4 transition hover:-translate-y-0.5 hover:shadow-md">
        {/* Product name and image */}
       <div className="flex items-start gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gray-50 text-2xl">
            {product.image || product.categoryIcon || "🛒"}
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="break-words text-sm font-bold text-gray-800">
              {product.nameBn}
            </h3>

            <p className="mt-1 text-xs text-gray-500">
              {toBanglaUnit(product.unit)}
            </p>
          </div>
        </div>

        {/* Price and change percentage */}
        <div className="flex flex-wrap items-end justify-between gap-2">
          <div>
            <p className="text-xs text-gray-500">আজকের দাম</p>

            <p className="mt-1 text-base font-extrabold text-gray-900">
              {product.today != null
                ? `${toBanglaNumber(product.today)} টাকা`
                : "দাম পাওয়া যায়নি"}
            </p>
          </div>

          <span
            className={`shrink-0 rounded-full px-2 py-1 text-xs font-bold ${badgeStyle}`}
          >
            {badgeIcon} {toBanglaNumber(Math.abs(percentage))}%
          </span>
        </div>
      </article>
    </Link>
  );
}