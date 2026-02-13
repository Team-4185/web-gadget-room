import type { BrandInfo } from '@/core/types';

import { AppleIcon, SamsungIcon, XiaomiIcon, GoogleIcon } from '@/assets';

export const HOME_BRANDS: BrandInfo[] = [
  { id: 1, name: 'Apple', icon: AppleIcon, descr: 'iphone 15 series' },
  { id: 2, name: 'Samsung', icon: SamsungIcon, descr: 'Galaxy S24 Ultra' },
  { id: 3, name: 'Xiaomi', icon: XiaomiIcon, descr: '14T Pro' },
  { id: 4, name: 'Google', icon: GoogleIcon, descr: 'Pixel 8 Pro' },
];

export const HOME_HERO = {
  productId: 1,
  title: {
    regular: 'iPhone 17',
    bold: 'Pro',
  },
  subtitle: 'Created to change everything for the better. For everyone.',
} as const;
