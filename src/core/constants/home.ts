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
  imageSrc: 'Home/heroImg.png',
} as const;

export const HOME_PROMO_LEAD = {
  productId: 1,
  title: {
    regular: 'iPhone 17',
    bold: 'Pro',
  },
  subtitle: 'An incredible camera, a titanium body, and the most powerful A19 Pro chip.',
  imageSrc: 'Home/promoWideBox.png',
} as const;

export const HOME_PROMO_LEFT_SMALL = {
  productId: 2,
  title: {
    regular: 'Xiaomi 15',
    bold: 'Pro',
  },
  subtitle: 'Leica camera, 120W fast charging and premium design at an affordable price.',
  imageSrc: 'Home/promoLeftDoubleBoxLeft.png',
} as const;

export const HOME_PROMO_RIGHT_SMALL = {
  productId: 3,
  title: {
    regular: 'Google Pixel 10',
    bold: 'Pro',
  },
  subtitle: 'Pure Android, the best AI from Google, and a camera that works magic at night.',
  imageSrc: 'Home/promoLeftDoubleBoxRight.png',
} as const;

export const HOME_PROMO_RIGHT_BIG = {
  productId: 1,
  title: {
    regular: 'iPhone 17',
    bold: 'Pro',
  },
  subtitle: 'The new iPhone 17 arrives in colors that capture every side of you.',
  imageSrc: 'Home/promoRight.png',
} as const;

export const HOME_BANNER_LEFT_IMAGE = 'Home/phoneFront.png';
export const HOME_BANNER_RIGHT_IMAGE = 'Home/phoneBack.png';
