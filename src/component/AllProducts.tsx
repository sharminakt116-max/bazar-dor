
import Link from "next/link";
import type { Product, ProductProps } from "../type/product";

const toBanglaNumber = (value: number) =>
  value.toLocaleString("bn-BD", {
    maximumFractionDigits: 2,
  });

const toBanglaUnit = (unit: string) => {
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

  return units[unit.toLowerCase()] || `প্রতি ${unit}`;
};

function ProductCard({ product }: { product: Product }) {
  const direction = product.change?.dir ?? "flat";
  const percentage = product.change?.pct ?? 0;

  const badgeStyle =
    direction === "up"
      ? "bg-emerald-50 text-emerald-700"
      : direction === "down"
        ? "bg-red-50 text-red-600"
        : "bg-gray-100 text-gray-600";

  const badgeIcon =
    direction === "up" ? "▲" : direction === "down" ? "▼" : "—";

  return (
    <Link
      href={`/product/${product.slug}`}
      className="block h-full rounded-xl outline-none focus-visible:ring-2  focus-visible:ring-emerald-500"
    >
      <article className="flex h-full min-h-[145px] flex-col justify-between gap-3 rounded-xl border  border-gray-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
        <div className="flex items-start gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl  bg-gray-50 text-2xl">
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

        <div className="flex flex-wrap items-end justify-between gap-2">
          <div>
            <p className="text-xs text-gray-500">আজকের দাম</p>
            <p className="mt-1 text-base font-extrabold text-gray-900">
              {toBanglaNumber(product.today)} টাকা
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

export default function AllProductsSection({
  products,
}: ProductProps) {
  const increasedProducts = [...products]
    .filter((product) => product.change?.dir === "up")
    .sort(
      (a, b) =>
        Math.abs(b.change?.pct ?? 0) -
        Math.abs(a.change?.pct ?? 0)
    )
    .slice(0, 6);

  const decreasedProducts = [...products]
    .filter((product) => product.change?.dir === "down")
    .sort(
      (a, b) =>
        Math.abs(b.change?.pct ?? 0) -
        Math.abs(a.change?.pct ?? 0)
    )
    .slice(0, 6);

  return (
    <main className="mx-auto w-full max-w-7xl space-y-8 bg-[#f0f6f0] px-4 py-6 md:px-8">
      {/* Section A: Top 6 risers */}
      <section>
        <h2 className="mb-4 text-lg font-extrabold text-gray-800">
          <span className="text-emerald-600">▲</span>{" "}
          আজ দাম বেড়েছে
        </h2>

        {increasedProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
            {increasedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">
            দাম বেড়েছে এমন পণ্য পাওয়া যায়নি।
          </p>
        )}
      </section>

      {/* Section B: Top 6 fallers */}
      <section>
        <h2 className="mb-4 text-lg font-extrabold text-gray-800">
          <span className="text-red-600">▼</span>{" "}
          আজ দাম কমেছে
        </h2>

        {decreasedProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
            {decreasedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">
            দাম কমেছে এমন পণ্য পাওয়া যায়নি।
          </p>
        )}
      </section>

      {/* Section C: All products */}
      <section>
        <h2 className="mb-2 text-lg font-extrabold text-gray-800">
          সব পণ্য
        </h2>

        <p className="mb-4 text-xs text-gray-500">
          মোট {toBanglaNumber(products.length)}টি পণ্য দেখানো হচ্ছে
        </p>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">
            দেখানোর মতো কোনো পণ্য পাওয়া যায়নি।
          </p>
        )}
      </section>
    </main>
  );
}
