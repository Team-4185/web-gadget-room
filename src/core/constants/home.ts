import type { BrandInfo } from '@/core/types';

export const HOME_BRANDS: BrandInfo[] = [
  { id: 1, name: 'Apple', icon: '/icons/Brands/Apple.svg', descr: 'iphone 15 series' },
  { id: 2, name: 'Samsung', icon: '/icons/Brands/Samsung.svg', descr: 'Galaxy S24 Ultra' },
  { id: 3, name: 'Xiaomi', icon: '/icons/Brands/Xiaomi.svg', descr: '14T Pro' },
  { id: 4, name: 'Google', icon: '/icons/Brands/Google.svg', descr: 'Pixel 8 Pro' },
];

export const HOME_HERO = {
  productId: 1,
  title: {
    regular: 'iPhone 17',
    bold: 'Pro',
  },
  subtitle: 'Created to change everything for the better. For everyone.',
} as const;
