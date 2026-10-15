
import type { Product } from "@/type/product";

interface Props {
  product: Product;
}

const toBanglaNumber = (value: number) =>
  value.toLocaleString("bn-BD", {
    maximumFractionDigits: 1,
    minimumFractionDigits: 1,
  });

const toBanglaInteger = (value: number) =>
  value.toLocaleString("bn-BD", {
    maximumFractionDigits: 0,
  });

export default function ProductInfo({ product }: Props) {
  const direction = product.change?.dir ?? "flat";
  const percentage = Math.abs(product.change?.pct ?? 0);

  const badgeStyle =
    direction === "up"
      ? "text-red-600 font-bold"
      : direction === "down"
        ? "text-emerald-600 font-bold"
        : "text-gray-600";

  const badgeIcon =
    direction === "up" ? "▲" : direction === "down" ? "▼" : "—";

  const unit =
    product.unit === "kg" || !product.unit ? "কেজি" : product.unit;

  const priceDifference =
    product.today != null && product.yesterday != null
      ? Math.abs(product.today - product.yesterday)
      : 0;

  return (
    <section className="rounded-2xl border border-gray-200/60 bg-white p-6 shadow-sm">
      <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        
        <div className="flex items-center gap-4">
          {/* Product Image / Icon */}
          <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-gray-100 text-3xl shadow-sm">
            {product.image?.startsWith("http") ? (
              <img
                src={product.image}
                alt={product.nameBn}
                className="h-full w-full object-cover"
              />
            ) : (
              product.categoryIcon || product.image || "🛒"
            )}
          </div>

          <div>
            <h1 className="text-2xl font-black text-gray-900">
              {product.nameBn}
            </h1>

            <p className="mt-1 text-xs text-gray-500">
              {/* প্রতি {unit} · {product.categoryNameBn ?? "চাল"} */}{product.categoryNameBn ?? "পণ্যের বিভাগ"}
            </p>

            <p className="mt-2 text-xs text-gray-600">
              গতকালের তুলনায় আজ দাম{" "}
              <span className="font-bold text-gray-900">
                {direction === "up"
                  ? "বেড়েছে"
                  : direction === "down"
                    ? "কমেছে"
                    : "পরিবর্তন হয়নি"}
              </span>
              {" · "}
              {toBanglaInteger(priceDifference)} টাকা
            </p>
          </div>
        </div>

       
        <div className="min-w-[150px] w-full rounded-xl border border-gray-100 bg-[#f7f8f6] p-4 text-center md:w-auto md:text-right">
          <p className="text-[11px] font-medium text-gray-500">
            আজকের দাম
          </p>

          <p className="mt-0.5 text-2xl font-black text-gray-900">
            {toBanglaInteger(product.today ?? 0)}
          </p>

          <p className="text-[11px] text-gray-500">টাকা / {unit}</p>

          <div className="mt-2 flex justify-center md:justify-end">
            <span
              className={`inline-flex items-center gap-1 text-xs ${badgeStyle}`}
            >
              <span>{badgeIcon}</span>
              <span>{toBanglaNumber(percentage)}%</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}