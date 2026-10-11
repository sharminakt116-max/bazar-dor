
import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";

interface Product {
  id: number;
  nameBn: string;
  image: string;
  today: number;
  unit: string;
  change: {
    pct: number;
    dir: "up" |"down" |"flat";
  };
}

const Marquee = async () => {
  const response = await fetch(
    "https://api.abcz.workers.dev/api/bazardor/products"
  );

  const data: Product[] = await response.json();

  const products = data
    .filter(
      (product) =>
        product.change.pct !== 0 &&
        product.change.dir !== "flat"
    )
    .slice(0, 10);

  return (
    <MarqueeText direction="right" duration={20}>
      <div className="flex items-center border-y border-gray-300 py-3 shadow-sm">
        {products.map((product) => {
          const isDown = product.change.dir === "down";

          return (
            <div
              key={product.id}
              className="flex shrink-0 items-center gap-1 px-6 text-sm"
            >
              <span>{product.image}</span>

              <span>{product.nameBn}</span>

              <span className="font-semibold">
                {product.today.toLocaleString("bn-BD")} টাকা/
                {product.unit === "kg"
                  ? "কেজি"
                  : product.unit === "litre" ||
                      product.unit === "litre"
                    ? "লিটার"
                    : product.unit}
              </span>

              <span
                className={`font-bold ${
                  isDown ? "text-emerald-600" : "text-red-600"
                }`}
              >
                {isDown ? "▼" : "▲"}{" "}
                {Math.abs(product.change.pct).toLocaleString("bn-BD")}%
              </span>
            </div>
          );
        })}
      </div>
    </MarqueeText>
  );
};

export default Marquee;