export type ShoeCategory = 'All' | 'Running' | 'Basketball' | 'Lifestyle' | 'Trail' | 'Training' | 'Skate';

export type ShoeBrand = 'All' | 'Nike' | 'Adidas' | 'Air Jordan' | 'New Balance' | 'Asics' | 'Salomon' | 'Puma' | 'On Running';

export interface ShoeColor {
  name: string;
  hex: string;
  image: string;
}

export interface ShoeReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
  fitRating: 'True to Size' | 'Runs Small' | 'Runs Large';
  helpfulCount?: number;
}

export interface Shoe {
  id: string;
  name: string;
  brand: ShoeBrand;
  slug: string;
  price: number;
  originalPrice?: number;
  category: ShoeCategory;
  gender: 'Men' | 'Women' | 'Unisex';
  rating: number;
  reviewsCount: number;
  badge?: string;
  isFeatured?: boolean;
  isTrending?: boolean;
  stock: number;
  releaseYear: number;
  description: string;
  technology: string[];
  weight: string;
  cushioning: 'Maximum' | 'Responsive' | 'Firm' | 'Balanced';
  drop: string;
  sizes: number[];
  colors: ShoeColor[];
  images: string[];
  reviews: ShoeReview[];
}

export interface CartItem {
  cartItemId: string;
  shoe: Shoe;
  selectedSize: number;
  selectedColor: ShoeColor;
  quantity: number;
}

export interface FilterState {
  searchQuery: string;
  category: ShoeCategory;
  brand: ShoeBrand;
  minPrice: number;
  maxPrice: number;
  selectedSizes: number[];
  selectedColors: string[];
  cushioning: string;
  sortBy: 'featured' | 'newest' | 'price-asc' | 'price-desc' | 'rating';
  inStockOnly: boolean;
  badgeFilter: string;
}

export interface CustomShoeConfig {
  baseShoeId: string;
  upperColor: string;
  soleColor: string;
  accentColor: string;
  lacesColor: string;
  customText: string;
  size: number;
}
