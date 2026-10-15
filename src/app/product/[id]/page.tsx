
"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-toastify";

import { authClient } from "@/lib/auth-client";
import type { Product } from "@/type/product";

import ProductInfo from "@/component/ProductInfo";
import ProductPrice from "@/component/ProductPrice";

const toBanglaNumber = (value: number) =>
  value.toLocaleString("bn-BD");

function ProductDetailContent() {
  const params = useParams();
  const id = String(params.id);
  const router = useRouter();

  const redirectedRef = useRef(false);

  const { data: session, isPending } = authClient.useSession();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isPending || session || redirectedRef.current) return;

    redirectedRef.current = true;

    toast.info("পণ্যের বিস্তারিত দেখতে আগে সাইন ইন করুন!");
    router.replace("/sign-in");
  }, [isPending, session, router]);

  useEffect(() => {
    if (isPending || !session || !id) return;

    let cancelled = false;

    async function getProduct() {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(
          `https://api.abcz.workers.dev/api/bazardor/products/${id}`,
          { cache: "no-store" }
        );

        if (!response.ok) {
          throw new Error(`API Error: ${response.status}`);
        }

        const data = await response.json();

        console.log("Product ID:", id);
        console.log("API Response:", data);

        const result = data.product ?? data.data ?? data;

        if (!result || !result.nameBn) {
          throw new Error("পণ্যের তথ্য পাওয়া যায়নি");
        }

        if (!cancelled) {
          setProduct(result as Product);
        }
      } catch (err) {
        console.error("Product fetch error:", err);

        if (!cancelled) {
          setError(
            err instanceof Error
              ? err.message
              : "পণ্য লোড করা যায়নি"
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    getProduct();

    return () => {
      cancelled = true;
    };
  }, [id, session, isPending]);

  if (isPending) {
    return (
      <main className="min-h-screen bg-gray-50 p-6">
        <p className="animate-pulse text-center text-gray-500">
          যাচাই করা হচ্ছে...
        </p>
      </main>
    );
  }

  if (!session) {
    return null;
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 p-6">
        <p className="animate-pulse text-center text-gray-500">
          পণ্যের তথ্য লোড হচ্ছে...
        </p>
      </main>
    );
  }

  if (error || !product) {
    return (
      <main className="min-h-screen bg-gray-50 p-6">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-xl font-bold text-red-600">
            {error || "পণ্য পাওয়া যায়নি"}
          </h1>

          <Link
            href="/"
            className="mt-4 inline-block text-green-700 underline"
          >
            হোম পেজে ফিরে যাও
          </Link>
        </div>
      </main>
    );
  }

  const markets = product.markets ?? [];

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="mx-auto max-w-5xl space-y-6">
        <nav className="flex flex-wrap items-center gap-2 text-xs text-gray-500">
          <Link href="/" className="hover:text-green-700">
            হোম
          </Link>

          <span>›</span>

          <Link
            href={`/category/${product.category ?? "chal"}`}
            className="hover:text-green-700"
          >
            {product.categoryNameBn ?? "পণ্যের বিভাগ"}
          </Link>

          <span>›</span>

          <span className="font-medium text-gray-900">
            {product.nameBn}
          </span>
        </nav>

        <ProductInfo product={product} />

        <ProductPrice product={product} />

        <section className="overflow-hidden rounded-2xl border bg-white p-5">
          <h2 className="mb-4 text-xl font-bold">
            বাজারভিত্তিক আজকের দাম
          </h2>

          {markets.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px] text-left">
                <thead>
                  <tr className="border-b bg-gray-50 text-xs font-medium text-gray-500">
                    <th className="p-3">বাজার</th>
                    <th className="p-3">বিভাগ</th>
                    <th className="p-3">সর্বনিম্ন</th>
                    <th className="p-3">সর্বাধিক</th>
                    <th className="p-3">গড়</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100 text-sm">
                  {markets.map((market, index) => {
                    const avgMarketPrice =
                      (market.min + market.max) / 2;

                    return (
                      <tr
                        key={`${market.market}-${index}`}
                        className="transition hover:bg-gray-50"
                      >
                        <td className="p-3 font-semibold text-gray-900">
                          {market.market}
                        </td>

                        <td className="p-3 text-gray-600">
                          {market.division ?? "—"}
                        </td>

                        <td className="p-3 text-gray-800">
                          {toBanglaNumber(market.min)} টাকা
                        </td>

                        <td className="p-3 text-gray-800">
                          {toBanglaNumber(market.max)} টাকা
                        </td>

                        <td className="p-3 font-bold text-gray-900">
                          {toBanglaNumber(avgMarketPrice)} টাকা
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500">
              বাজারভিত্তিক দামের তথ্য পাওয়া যায়নি।
            </p>
          )}
        </section>
      </div>
    </main>
  );
}

export default function ProductDetailPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-gray-50 p-6">
          <p className="animate-pulse text-center text-gray-500">
            পণ্যের পেজ লোড হচ্ছে...
          </p>
        </main>
      }
    >
      <ProductDetailContent />
    </Suspense>
  );
}
