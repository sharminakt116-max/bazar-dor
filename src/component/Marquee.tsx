import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";
import type { Product } from "../type/product";

const Marquee = async () => {
  const response = await fetch(
    "https://api.abcz.workers.dev/api/bazardor/products",
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    return <p className="py-3 text-center">দাম লোড করা যায়নি।</p>;
  }

  const result = await response.json();

  const data: Product[] = Array.isArray(result)
    ? result
    : result.data ?? [];

  const products = data
    .filter(
      (product) =>
        product.change?.pct !== 0 &&
        product.change?.dir !== "flat"
    )
    .slice(0, 10);

  if (products.length === 0) {
    return null;
  }

  return (
    <MarqueeText direction="right" duration={20}>
      <div className="flex items-center border-y border-gray-300 py-3 shadow-sm">
        {products.map((product) => {
          const isDown = product.change?.dir === "down";

          return (
            <div
              key={product.id}
              className="flex shrink-0 items-center gap-1 px-6 text-sm"
            >
              <span>{product.image}</span>

              <span>{product.nameBn}</span>

              <span className="font-semibold">
                {product.today?.toLocaleString("bn-BD") ?? "—"} টাকা/
                {product.unit === "kg"
                  ? "কেজি"
                  : product.unit === "litre"
                    ? "লিটার"
                    : product.unit}
              </span>

              <span
                className={`font-bold ${
                  isDown ? "text-emerald-600" : "text-red-600"
                }`}
              >
                {isDown ? "▼" : "▲"}{" "}
                {Math.abs(product.change?.pct ?? 0).toLocaleString(
                  "bn-BD"
                )}
                %
              </span>
            </div>
          );
        })}
      </div>
    </MarqueeText>
  );
};

export default Marquee;