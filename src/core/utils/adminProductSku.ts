import type { ApiStorageCapacityName } from '@/core/types';

const normalizeSkuPart = (value: string) =>
  value
    .trim()
    .toUpperCase()
    .replace(/[^A-Z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

export const getStorageSkuPart = (storage: ApiStorageCapacityName) =>
  storage.replace('CAPACITY_', '');

export const buildProductSku = (brand: string, name: string) => {
  const sku = [normalizeSkuPart(brand), normalizeSkuPart(name)].filter(Boolean).join('-');
  return sku.slice(0, 64);
};

export const buildVariantSku = (
  productSku: string,
  color: string,
  storageCapacity: ApiStorageCapacityName
) => `${productSku}-${normalizeSkuPart(color)}-${getStorageSkuPart(storageCapacity)}`.slice(0, 64);
