export interface ProductMarket {
  market: string;
  division: string;
  min: number;
  max: number;
}

export interface ProductChange {
  dir: "up" | "down" | "flat";
  pct: number;
}

export interface Product {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change?: ProductChange;
  markets: ProductMarket[];
}

export interface ProductProps {
  products: Product[];
}
