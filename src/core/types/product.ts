import type { ComponentType, SVGProps } from 'react';

export type BadgeType = 'New' | 'Hit' | 'Sale';

export interface IProduct {
  id: number;
  name: string;
  price: number;
  img: string;
  badge?: BadgeType;
  inStock?: boolean;
  preOrder?: boolean;
  reviews?: number;
  amount: number;
}

export type ApiPhone = {
  id: number;
  name: string;
  description: string | null;
  price: number;
  brand: string;
  releaseYear: number;
  cpu: string;
  coresNumber: number;
  screenSize: string;
  frontCamera: string;
  mainCamera: string;
  batteryCapacity: string;
};

export type BrandInfo = {
  id: number;
  name: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  descr: string;
};

export type SortOption =
  | 'popularity'
  | 'name A to Z'
  | 'name Z to A'
  | 'price decreasing'
  | 'price increasing'
  | 'number of reviews';

export type UseProductResult = {
    product: IProduct;
    specs: { label: string; value: string }[];
    description: string;
    loading: boolean;
    error: string | null;
  };