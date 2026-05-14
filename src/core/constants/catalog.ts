import { BRANDS } from './checkbox';
import type { SortOption } from '@/core/types';

export const CATALOG_PAGE_SIZE = 12;
export const CATALOG_MIN_PRICE = 0;
export const CATALOG_MAX_PRICE = 50000;
export const CATALOG_DEFAULT_SORT: SortOption = 'price_asc';

export const CATALOG_DEFAULT_ACTIVE_ITEMS = BRANDS.reduce<Record<string, boolean>>((acc, item) => {
  acc[item.value] = false;
  return acc;
}, {});
