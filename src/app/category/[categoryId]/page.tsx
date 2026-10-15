"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import ProductCard from "@/component/ProductCard";
import type { Product } from "@/type/product";

interface Category {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

interface PageProps {
  params: Promise<{ categoryId: string }>;
}

const toBanglaCount = (value: number) =>
  value.toLocaleString("bn-BD", {
    maximumFractionDigits: 0,
  });

export default function CategoryPage({ params }: PageProps) {
  const [categoryId, setCategoryId] = useState("");

  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sort, setSort] = useState("default");

 
  useEffect(() => {
    let active = true;

    params
      .then(({ categoryId }) => {
        if (active) {
          setCategoryId(categoryId);
        }
      })
      .catch((err) => {
        console.error("Category params error:", err);
        if (active) {
          setError("ক্যাটাগরি লোড করা যায়নি।");
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, [params]);

  useEffect(() => {
    if (!categoryId) return;

    const controller = new AbortController();

    async function fetchData() {
      setLoading(true);
      setError("");

      try {
        const [categoryRes, productRes] = await Promise.all([
          fetch(
            "https://api.api-store.workers.dev/api/bazardor/categories",
            { signal: controller.signal }
          ),
          fetch(
            `https://api.abcz.workers.dev/api/bazardor/products?category=${(categoryId)}`,
            { signal: controller.signal }
          ),
        ]);

        if (!categoryRes.ok || !productRes.ok) {
          throw new Error("API request failed");
        }

        const categoryData = await categoryRes.json();
        const productData = await productRes.json();

        const categoryList: Category[] = Array.isArray(categoryData)
          ? categoryData
          : Array.isArray(categoryData?.data)
            ? categoryData.data
            : [];

        const productList: Product[] = Array.isArray(productData)
          ? productData
          : Array.isArray(productData?.data)
            ? productData.data
            : [];

        setCategories(categoryList);
        setProducts(productList);
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") {
          return;
        }

        console.error("Data fetch error:", err);
        setCategories([]);
        setProducts([]);
        setError("পণ্যের তথ্য লোড করা যায়নি। আবার চেষ্টা করো।");
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchData();

    return () => {
      controller.abort();
    };
  }, [categoryId]);

  const category = categories.find(
    (item) => item.slug === categoryId || item.id === categoryId
  );

  const sortedProducts = useMemo(() => {
    const result = [...products];

    if (sort === "low-to-high") {
      result.sort((a, b) => Number(a.today) - Number(b.today));
    }

    if (sort === "high-to-low") {
      result.sort((a, b) => Number(b.today) - Number(a.today));
    }

    return result;
  }, [products, sort]);

  
  if (loading) {
    return (
      <main className="min-h-screen bg-[#f0f4ef] px-4 py-8 md:px-12">
        <div className="mx-auto max-w-7xl space-y-4">
          <div className="h-24 w-full animate-pulse rounded-2xl bg-white/70" />
          <div className="h-16 w-full animate-pulse rounded-2xl bg-white/70" />

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="h-36 animate-pulse rounded-2xl bg-white/70"
              />
            ))}
          </div>
        </div>
      </main>
    );
  }

 
  if (error) {
    return (
      <main className="flex min-h-[70vh] flex-col items-center justify-center bg-[#f0f4ef] px-6 text-center">
        <div className="mb-4 text-5xl">⚠️</div>

        <h1 className="text-xl font-bold text-gray-900">{error}</h1>

        <Link
          href="/"
          className="mt-6 rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white transition hover:bg-emerald-700"
        >
          হোম পেজে ফিরে যান
        </Link>
      </main>
    );
  }

 
  if (!category || products.length === 0) {
    return (
      <main className="flex min-h-[70vh] flex-col items-center justify-center bg-[#f0f4ef] px-6 text-center">
        <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-white text-4xl shadow-sm">
          🛒
        </div>

       

        <p className="mt-2 text-sm text-gray-500">
          অন্য পণ্য দেখতে হোম পেজে ফিরে যান।
        </p>

        <Link
          href="/"
          className="mt-6 rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-emerald-700"
        >
          হোম পেজে ফিরে যান
        </Link>
      </main>
    );
  }

  
  return (
    <main className="min-h-screen bg-[#f0f4ef] px-4 py-8 md:px-12">
      <div className="mx-auto max-w-7xl">
        {/* Category header */}
        <div className="mb-4 flex items-center gap-4 rounded-2xl border border-gray-200/60 bg-white p-6 shadow-sm">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gray-100 text-2xl">
            {category.icon || "🍚"}
          </div>

          <div>
            <h1 className="text-2xl font-black text-gray-900">
              {category.nameBn}
            </h1>

            <p className="mt-1 text-xs text-gray-500">
              {toBanglaCount(products.length)}টি পণ্যের আজকের দাম ও পরিবর্তন
            </p>
          </div>
        </div>

        <div className="mb-6 flex items-center justify-end rounded-2xl border border-gray-200/60 bg-white px-6 py-4 shadow-sm">
          <div className="flex items-center gap-2">
            <label
              htmlFor="sort"
              className="text-xs font-medium text-gray-600"
            >
              সাজান
            </label>

            <select
              id="sort"
              value={sort}
              onChange={(event) => setSort(event.target.value)}
              className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-800 outline-none focus:border-gray-400"
            >
              <option value="default">ডিফল্ট</option>
              <option value="low-to-high">দাম: কম থেকে বেশি</option>
              <option value="high-to-low">দাম: বেশি থেকে কম</option>
            </select>
          </div>
        </div>

       
        <div className="mb-4 text-xs font-medium text-gray-500">
          মোট {toBanglaCount(products.length)}টি পণ্য দেখানো হচ্ছে
        </div>

    
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <Link
          href="/"
          className="inline-block font-medium text-green-700 py-6 hover:text-green-900"
        >
          ← হোম পেজে ফিরে যাও
        </Link>
      </div>
       
    </main>
  );
}
