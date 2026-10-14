export interface Product {
  id: string | number;
  slug: string;
  nameBn: string;
  name?: string;
  image?: string;
  unit?: string;
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
