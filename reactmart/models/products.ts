export type Category = 'beauty' | 'fragrances' | 'furniture' | 'groceries' | string;

export type AvailabilityStatus = 'In Stock' | 'Low Stock' | 'Out of Stock' | string;

export interface Dimensions {
  width?: number;
  height?: number;
  depth?: number;
}

export interface Review {
  reviewerEmail?: string;
  // extend with other review fields if needed (rating, comment, date, etc.)
  [key: string]: any;
}

export interface Meta {
  qrCode?: string;
  [key: string]: any;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  category: Category;
  price: number;
  discountPercentage?: number;
  rating?: number;
  stock?: number;
  tags?: string[];
  brand?: string;
  sku?: string;
  weight?: number;
  dimensions?: Dimensions;
  warrantyInformation?: string;
  shippingInformation?: string;
  availabilityStatus?: AvailabilityStatus;
  reviews?: Review[];
  returnPolicy?: string;
  minimumOrderQuantity?: number;
  meta?: Meta;
  images?: string[];
  thumbnail?: string;
  [key: string]: any;
}

export interface ProductsResponse {
  products: Product[];
  total?: number;
  skip?: number;
  limit?: number;
}