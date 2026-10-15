// import type { Product, ProductProps } from "@/type/product";
// import ProductCard from "@/component/ProductCard";

// const toBanglaNumber = (value: number) =>
//   value.toLocaleString("bn-BD", {
//     maximumFractionDigits: 2,
//   });

// export default function AllProducts({
//   products,
// }: ProductProps) {
 
//   const increasedProducts = [...products]
//     .filter((product) => product.change?.dir === "up")
//     .sort(
//       (a, b) =>
//         Math.abs(b.change?.pct ?? 0) -
//         Math.abs(a.change?.pct ?? 0)
//     )
//     .slice(0, 6);


//   const decreasedProducts = [...products]
//     .filter((product) => product.change?.dir === "down")
//     .sort(
//       (a, b) =>
//         Math.abs(b.change?.pct ?? 0) -
//         Math.abs(a.change?.pct ?? 0)
//     )
//     .slice(0, 6);

//   return (
//     <main className="mx-auto w-full max-w-7xl   space-y-8 px-4 py-6 md:px-8">
      
//       <section>
//         <h2 className="mb-4 text-lg font-extrabold text-gray-800">
//           <span className="text-red-600">▲</span>{" "}
//           আজ দাম বেড়েছে
//         </h2>

//         {increasedProducts.length > 0 ? (
//           <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
//             {increasedProducts.map((product) => (
//               <ProductCard
//                 key={product.id}
//                 product={product}
//               />
//             ))}
//           </div>
//         ) : (
//           <p className="text-sm text-gray-500">
//             দাম বেড়েছে এমন পণ্য পাওয়া যায়নি।
//           </p>
//         )}
//       </section>

  
//       <section>
//         <h2 className="mb-4 text-lg font-extrabold text-gray-800">
//           <span className="text-emerald-600">▼</span>{" "}
//           আজ দাম কমেছে
//         </h2>

//         {decreasedProducts.length > 0 ? (
//           <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
//             {decreasedProducts.map((product) => (
//               <ProductCard
//                 key={product.id}
//                 product={product}
//               />
//             ))}
//           </div>
//         ) : (
//           <p className="text-sm text-gray-500">
//             দাম কমেছে এমন পণ্য পাওয়া যায়নি।
//           </p>
//         )}
//       </section>

     
//       <section>
//         <h2 className="mb-2 text-lg font-extrabold text-gray-800">
//           সব পণ্য
//         </h2>

//         <p className="mb-4 text-xs text-gray-500">
//           মোট {toBanglaNumber(products.length)}টি পণ্য দেখানো হচ্ছে
//         </p>

//         {products.length > 0 ? (
//           <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
//             {products.map((product) => (
//               <ProductCard
//                 key={product.id}
//                 product={product}
//               />
//             ))}
//           </div>
//         ) : (
//           <p className="text-sm text-gray-500">
//             দেখানোর মতো কোনো পণ্য পাওয়া যায়নি।
//           </p>
//         )}
//       </section>
//     </main>
//   );
// }
import type { ProductProps } from "@/type/product";
import ProductCard from "@/component/ProductCard";

const toBanglaNumber = (value: number) =>
  value.toLocaleString("bn-BD", {
    maximumFractionDigits: 2,
  });

export default function AllProducts({ products }: ProductProps) {
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
    <main className="mx-auto w-full max-w-7xl space-y-8 px-4 py-6 md:px-8">
      <section>
        <h2 className="mb-4 text-lg font-extrabold text-gray-800">
          <span className="text-red-600">▲</span> আজ দাম বেড়েছে
        </h2>

        {increasedProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
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

      <section>
        <h2 className="mb-4 text-lg font-extrabold text-gray-800">
          <span className="text-emerald-600">▼</span> আজ দাম কমেছে
        </h2>

        {decreasedProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
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

      <section>
        <h2 className="mb-2 text-lg font-extrabold text-gray-800">
          সব পণ্য
        </h2>

        <p className="mb-4 text-xs text-gray-500">
          মোট {toBanglaNumber(products.length)}টি পণ্য দেখানো হচ্ছে
        </p>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
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