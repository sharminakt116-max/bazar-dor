export interface Product {
  id: string | number;
  slug: string;
  nameBn: string;
  name?: string;
  image?: string;
  unit?: string;
  categoryNameBn?: string;
  today?: number;
  yesterday?: number;
  lastWeek?: number;
  lastMonth?: number;
  categoryIcon?: string;

  change?: {
    dir?: "up" | "down" | "flat";
    pct?: number;
  };

  markets: {
    market: string;
    division: string;
    min: number;
    max: number;
  }[];
}

export interface ProductProps {
  products: Product[];
}