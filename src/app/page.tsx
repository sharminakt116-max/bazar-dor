
import Banner from "@/component/Banner";
import AllProductsSection from "../component/AllProducts";
import type { Product } from "@/type/product";

async function getProducts(): Promise<Product[]> {
  try {
    const response = await fetch(
      "https://api.abcz.workers.dev/api/bazardor/products",
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error("Products fetch failed");
    }

    const data: Product[] = await response.json();

    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Products API Error:", error);
    return [];
  }
}

export default async function Home() {
  const products = await getProducts();

  return (
    <>
      <Banner />
      <AllProductsSection products={products} />
    </>
  );
}
