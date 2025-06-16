export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: string;
  material: string;
  colors: string[];
  sizes: string[];
  description: string;
  features: string[];
  inStock: boolean;
  stockCount: number;
  rating: number;
  reviews: number;
}

export interface FilterOptions {
  categories: string[];
  materials: string[];
  colors: string[];
  sizes: string[];
  priceRange: [number, number];
  inStockOnly: boolean;
}
