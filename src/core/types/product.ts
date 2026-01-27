export interface IProduct {
  id: number;
  name: string;
  price: number;
  img?: string;
  sale?: boolean;
  hit?: boolean;
  newProduct?: boolean;
  inStock?: boolean;
  preOrder?: boolean;
  reviews?: number;
  amount: number;
}

export type BrandKey = 'apple' | 'samsung' | 'xiaomi' | 'oneplus' | 'honor' | 'poco';

export type Availability = 'pre-order' | 'in stock';

export type BrandInfo = {
  id: number;
  name: string;
  icon: string;
  descr: string;
};

export type SortOption =
  | 'popularity'
  | 'name A to Z'
  | 'name Z to A'
  | 'price decreasing'
  | 'price increasing'
  | 'number of reviews';
