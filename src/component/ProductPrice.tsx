
// import type { Product } from "@/type/product";

// interface Props {
//   product: Product;
// }

// const toBanglaNumber = (value: number) =>
//   value.toLocaleString("bn-BD", {
//     maximumFractionDigits: 0,
//   });

// export default function ProductPrice({ product }: Props) {
//   const markets = product.markets ?? [];
//   const minPrice =
//     markets.length > 0
//       ? Math.min(...markets.map((m) => m.min))
//       : product.today;
//   const maxPrice =
//     markets.length > 0
//       ? Math.max(...markets.map((m) => m.max))
//       : product.today;
//   const avgPrice = product.today ?? 0;

//   return (
//     <section className="space-y-4">
//       <h2 className="text-base font-bold text-gray-900">দামের সারসংক্ষেপ</h2>
//       <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
//         <div className="rounded-2xl border border-gray-200/60 bg-white p-5 shadow-sm">
//           <p className="text-xs text-gray-500 font-medium">সর্বনিম্ন দাম</p>
//           <p className="mt-1 text-xl font-extrabold text-emerald-600">
//             {toBanglaNumber(minPrice)} টাকা
//           </p>
//           <p className="mt-1 text-[11px] text-gray-400">
//             সবচেয়ে কম দামের বাজার
//           </p>
//         </div>

//         <div className="rounded-2xl border border-gray-200/60 bg-white p-5 shadow-sm">
//           <p className="text-xs text-gray-500 font-medium">সর্বাধিক দাম</p>
//           <p className="mt-1 text-xl font-extrabold text-red-500">
//             {toBanglaNumber(maxPrice)} টাকা
//           </p>
//           <p className="mt-1 text-[11px] text-gray-400">
//             সবচেয়ে বেশি দামের বাজার
//           </p>
//         </div>

//         <div className="rounded-2xl border border-gray-200/60 bg-white p-5 shadow-sm">
//           <p className="text-xs text-gray-500 font-medium">গড় দাম</p>
//           <p className="mt-1 text-xl font-extrabold text-gray-900">
//             {toBanglaNumber(avgPrice)} টাকা
//           </p>
//           <p className="mt-1 text-[11px] text-gray-400">
//             প্রতি {product.unit === "kg" || !product.unit ? "কেজি" : product.unit}-এর হিসাবে
//           </p>
//         </div>
//       </div>
//     </section>
//   );
// }

import type { Product } from "@/type/product";

interface Props {
  product: Product;
}

const toBanglaNumber = (value: number) =>
  value.toLocaleString("bn-BD", {
    maximumFractionDigits: 0,
  });

export default function ProductPrice({ product }: Props) {
  const markets = product.markets ?? [];

  const prices = markets
    .flatMap((market) => [market.min, market.max])
    .filter((price) => Number.isFinite(price));

  const minPrice =
    prices.length > 0
      ? Math.min(...prices)
      : product.today;

  const maxPrice =
    prices.length > 0
      ? Math.max(...prices)
      : product.today;

  const avgPrice = product.today;

  const unit =
    product.unit === "kg" || !product.unit
      ? "কেজি"
      : product.unit;

  return (
    <section className="space-y-4">
      <h2 className="text-base font-bold text-gray-900">
        দামের সারসংক্ষেপ
      </h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {/* Minimum Price */}
        <div className="rounded-2xl border border-gray-200/60 bg-white p-5 shadow-sm">
          <p className="text-xs font-medium text-gray-500">
            সর্বনিম্ন দাম
          </p>

          <p className="mt-1 text-xl font-extrabold text-emerald-600">
            {minPrice != null
              ? `${toBanglaNumber(minPrice)} টাকা`
              : "দাম পাওয়া যায়নি"}
          </p>

          <p className="mt-1 text-[11px] text-gray-400">
            সবচেয়ে কম দামের বাজার
          </p>
        </div>

        {/* Maximum Price */}
        <div className="rounded-2xl border border-gray-200/60 bg-white p-5 shadow-sm">
          <p className="text-xs font-medium text-gray-500">
            সর্বাধিক দাম
          </p>

          <p className="mt-1 text-xl font-extrabold text-red-500">
            {maxPrice != null
              ? `${toBanglaNumber(maxPrice)} টাকা`
              : "দাম পাওয়া যায়নি"}
          </p>

          <p className="mt-1 text-[11px] text-gray-400">
            সবচেয়ে বেশি দামের বাজার
          </p>
        </div>

        {/* Average Price */}
        <div className="rounded-2xl border border-gray-200/60 bg-white p-5 shadow-sm">
          <p className="text-xs font-medium text-gray-500">
            গড় দাম
          </p>

          <p className="mt-1 text-xl font-extrabold text-gray-900">
            {avgPrice != null
              ? `${toBanglaNumber(avgPrice)} টাকা`
              : "দাম পাওয়া যায়নি"}
          </p>

          <p className="mt-1 text-[11px] text-gray-400">
            প্রতি {unit}-এর হিসাবে
          </p>
        </div>
      </div>
    </section>
  );
}
