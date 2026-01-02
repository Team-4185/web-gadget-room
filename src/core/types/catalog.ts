export interface Product {
  id: number;
  name: string;
  price: number;
  img: string;
  sale?: boolean;
  hit?: boolean;
  newProduct?: boolean;
  inStock?: boolean;
  preOrder?: boolean;
  reviews?: number;
}

export type Brand = 'apple' | 'samsung' | 'xiaomi' | 'oneplus' | 'honor' | 'poco';

export type SortOption =
  | 'popularity'
  | 'name A to Z'
  | 'name Z to A'
  | 'price decreasing'
  | 'price increasing'
  | 'number of reviews';
