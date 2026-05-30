import type { ApiPhone, BadgeType, IProduct } from '@/core/types';
import { FALLBACK_IMAGE } from '@/core/constants';

export const formatProductDisplayName = (brand: string | null | undefined, name: string) => {
  const normalizedBrand = brand?.trim() ?? '';
  const normalizedName = name.trim();

  if (!normalizedBrand) return normalizedName;

  return normalizedName.toLowerCase().startsWith(normalizedBrand.toLowerCase())
    ? normalizedName
    : `${normalizedBrand} ${normalizedName}`;
};

const TEMP_PRODUCT_BADGES: Record<number, BadgeType> = {
  1: 'Sale',
  2: 'Hit',
  4: 'New',
  6: 'Hit',
  8: 'Sale',
  10: 'New',
};

export const mapApiPhoneToProduct = (phone: ApiPhone, img: string = FALLBACK_IMAGE): IProduct => ({
  id: phone.id,
  name: formatProductDisplayName(phone.brand, phone.name),
  price: phone.price,
  img,
  badge: phone.badge ?? TEMP_PRODUCT_BADGES[phone.id],
  amount: 1,
});

export const buildSpecs = (phone: ApiPhone) => [
  { label: 'Screen Size', value: phone.screenSize },
  { label: 'CPU', value: phone.cpu },
  { label: 'Cores', value: String(phone.coresNumber) },
  { label: 'Main camera', value: phone.mainCamera },
  { label: 'Front camera', value: phone.frontCamera },
  { label: 'Battery', value: phone.batteryCapacity },
];
