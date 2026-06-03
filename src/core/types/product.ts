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
  colors?: ApiPhoneColor[];
  storageCapacity?: ApiStorageCapacity[];
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
  sku?: string;
  stock?: number;
  status?: PhoneStockStatus;
  badge?: BadgeType;
  colors?: ApiPhoneColor[];
  storageCapacity?: ApiStorageCapacity[];
  images: ApiPhoneImage[];
};

export type PhoneStockStatus = 'IN_STOCK' | 'LOW_STOCK' | 'OUT_OF_STOCK';

export type ApiPhoneColor = {
  name: string;
  displayName: string;
  hexCode: string;
};

export type ApiStorageCapacity = {
  name: string;
  value: number;
  unit: string;
};

export type CreatePhonePayload = {
  releaseYear: number;
  batteryCapacity: string;
  brand: string;
  cpu: string;
  price: number;
  name: string;
  screenSize: string;
  frontCamera: string;
  mainCamera: string;
  status: PhoneStockStatus;
  stock: number;
  description: string;
  coresNumber: number;
  sku: string;
};

export type ApiPhoneImage = {
  id: number;
  name: string;
  url: string;
  size: number;
  mimeType: string;
};

export type BrandInfo = {
  id: number;
  name: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  descr: string;
};

export type CatalogApiSort =
  | 'name_asc'
  | 'name_desc'
  | 'price_asc'
  | 'price_desc'
  | 'popularity'
  | 'popularity_desc';
export type SortOption = CatalogApiSort;

export type CatalogProductsRequestParams = {
  page: number;
  size: number;
  brands?: string[];
  minPrice: number;
  maxPrice: number;
  sort: CatalogApiSort;
};

export type ApiCatalogProductsPage = {
  content: ApiPhone[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
};

export type UseProductResult = {
  product: IProduct;
  specs: { label: string; value: string }[];
  description: string;
  galleryImages: string[];
  loading: boolean;
  error: string | null;
};
