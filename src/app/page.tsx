
import Banner from "@/component/Banner";
import AllProductsSection from "@/component/AllProducts";
import type { Product } from "@/type/product";
import { Suspense } from "react";
import { connection } from "next/server";

async function getProducts(): Promise<Product[]> {
  try {
    const response = await fetch(
      "https://api.abcz.workers.dev/api/bazardor/products",
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error(`Products fetch failed: ${response.status}`);
    }

    const data = await response.json();

    return Array.isArray(data)
      ? (data as Product[])
      : [];
  } catch (error) {
    console.error("Products API Error:", error);
    return [];
  }
}

async function ProductsContent() {
  await connection();

  const products = await getProducts();

  return <AllProductsSection products={products} />;
}

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f0f4ef] ">
     
      <Banner/>

      <Suspense
        fallback={
          <div className="py-10 text-center text-gray-600">
            পণ্য লোড হচ্ছে...
          </div>
        }
      >
        <ProductsContent />
      </Suspense>
    </main>
  );
}
