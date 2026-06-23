export type Condition = 'BNWT' | 'Good' | 'Fair' | 'Worn';

export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  condition: Condition;
  category: string;
  subcategory?: string;
  sizes: string[];
  images: string[];
  description: string;
  tags: string[];
  isNew?: boolean;
  isFeatured?: boolean;
  isBestSeller?: boolean;
  stock: number;
  rating: number;
  reviewCount: number;
}

export interface Category {
  id: string;
  name: string;
  image: string;
  count: number;
  emoji: string;
}

export interface Review {
  id: string;
  productId: string;
  author: string;
  location: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
}

export interface CartItem {
  product: Product;
  size: string;
  quantity: number;
}

export interface BundleDeal {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice: number;
  image: string;
  itemCount: number;
  tags: string[];
}

export interface FilterState {
  categories: string[];
  sizes: string[];
  conditions: Condition[];
  priceRange: [number, number];
  brands: string[];
  search: string;
  sortBy: 'newest' | 'price-asc' | 'price-desc' | 'rating' | 'popular';
}

export interface CheckoutAddress {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  region: string;
  province: string;
  city: string;
  barangay: string;
  street: string;
  zipCode: string;
}

export type PaymentMethod = 'gcash' | 'maya' | 'cod' | 'card';
