import type {
  AdminProductStatus,
  AdminProductVariantDraft,
  IAdminPanelManagedProduct,
  IAdminProductFormState,
  ISelectOption,
} from '@/core/types';

import { FALLBACK_IMAGE } from './productMedia';

export const ADMIN_PANEL_MANAGED_PRODUCTS: IAdminPanelManagedProduct[] = [
  {
    id: '1',
    title: 'iPhone 15 Pro Max',
    sku: 'IPH-15-PM-256',
    brand: 'Apple',
    price: '$1,299',
    stock: '45 pcs',
    status: 'IN_STOCK',
    image: FALLBACK_IMAGE,
  },
  {
    id: '2',
    title: 'Samsung Galaxy S24 Ultra',
    sku: 'SAM-S24-U-512',
    brand: 'Samsung',
    price: '$1,199',
    stock: '62 pcs',
    status: 'IN_STOCK',
    image: FALLBACK_IMAGE,
  },
  {
    id: '3',
    title: 'Google Pixel 8 Pro',
    sku: 'GOO-P8-P-256',
    brand: 'Google',
    price: '$999',
    stock: '38 pcs',
    status: 'IN_STOCK',
    image: FALLBACK_IMAGE,
  },
  {
    id: '4',
    title: 'Xiaomi 14 Pro',
    sku: 'XIA-14-P-256',
    brand: 'Xiaomi',
    price: '$849',
    stock: '89 pcs',
    status: 'IN_STOCK',
    image: FALLBACK_IMAGE,
  },
  {
    id: '5',
    title: 'OnePlus 11',
    sku: 'ONE-12-256',
    brand: 'OnePlus',
    price: '$799',
    stock: '54 pcs',
    status: 'IN_STOCK',
    image: FALLBACK_IMAGE,
  },
  {
    id: '6',
    title: 'iPhone 14',
    sku: 'IPH-14-128',
    brand: 'Apple',
    price: '$699',
    stock: '8 pcs',
    status: 'LOW_STOCK',
    image: FALLBACK_IMAGE,
  },
];

export const ADMIN_PRODUCT_COLOR_OPTIONS = [
  { value: 'BLACK', name: 'Black' },
  { value: 'WHITE', name: 'White' },
  { value: 'GRAY', name: 'Gray' },
  { value: 'SILVER', name: 'Silver' },
  { value: 'GOLD', name: 'Gold' },
  { value: 'RED', name: 'Red' },
  { value: 'BLUE', name: 'Blue' },
  { value: 'GREEN', name: 'Green' },
  { value: 'YELLOW', name: 'Yellow' },
  { value: 'PINK', name: 'Pink' },
] as const;

export const ADMIN_PRODUCT_STORAGE_OPTIONS = [
  { value: 'CAPACITY_64GB', name: '64GB' },
  { value: 'CAPACITY_128GB', name: '128GB' },
  { value: 'CAPACITY_256GB', name: '256GB' },
  { value: 'CAPACITY_512GB', name: '512GB' },
  { value: 'CAPACITY_1TB', name: '1TB' },
  { value: 'CAPACITY_2TB', name: '2TB' },
] as const;

export const EMPTY_ADMIN_PRODUCT_VARIANT: AdminProductVariantDraft = {
  clientId: 'new-variant',
  color: 'BLACK',
  storageCapacity: 'CAPACITY_128GB',
  price: '',
  stock: '',
};

export const EMPTY_ADMIN_PRODUCT_FORM: IAdminProductFormState = {
  name: '',
  sku: '',
  brand: '',
  price: '',
  stock: '',
  releaseYear: '',
  cpu: '',
  coresNumber: '',
  screenSize: '',
  frontCamera: '',
  mainCamera: '',
  batteryCapacity: '',
  description: '',
  variants: [{ ...EMPTY_ADMIN_PRODUCT_VARIANT, clientId: 'variant-1' }],
};

export const ADMIN_PRODUCT_STATUS_LABELS: Record<AdminProductStatus, string> = {
  IN_STOCK: 'In Stock',
  LOW_STOCK: 'Low Stock',
  OUT_OF_STOCK: 'Out of stock',
};

export const ADMIN_PRODUCT_STATUS_OPTIONS: ISelectOption[] = [
  { value: '', name: 'All statuses' },
  { value: 'IN_STOCK', name: 'In Stock' },
  { value: 'LOW_STOCK', name: 'Low Stock' },
  { value: 'OUT_OF_STOCK', name: 'Out of stock' },
];

export const ADMIN_PRODUCT_FIELD_TOOLTIPS: Partial<Record<keyof IAdminProductFormState, string>> = {
  releaseYear: 'Format: 2026 (4 digits)',
  coresNumber: 'Whole number, 1 to 32',
  screenSize: 'Enter number with optional decimal point. Inch mark is added on save.',
  frontCamera: 'Enter megapixels only. MP is added on save.',
  mainCamera: 'Enter camera values separated by hyphen. MP is added on save.',
  batteryCapacity: 'Enter number only. mAh is added on save.',
};
