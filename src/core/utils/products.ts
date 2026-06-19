import type { ApiPhone, ApiProductBadge, BadgeType, IProduct } from '@/core/types';
import { FALLBACK_IMAGE } from '@/core/constants';
import {
  applySelectedProductVariant,
  formatStorageCapacity,
  getDefaultPhoneColor,
  getDefaultStorageCapacity,
  getProductColorOptions,
  getProductStorageOptions,
} from './productVariants';

export const formatProductDisplayName = (brand: string | null | undefined, name: string) => {
  const normalizedBrand = brand?.trim() ?? '';
  const normalizedName = name.trim();

  if (!normalizedBrand) return normalizedName;

  return normalizedName.toLowerCase().startsWith(normalizedBrand.toLowerCase())
    ? normalizedName
    : `${normalizedBrand} ${normalizedName}`;
};

const BADGE_PRIORITY: BadgeType[] = ['Sale', 'Hit', 'New'];

const mapApiBadgeToProductBadge = (badge: ApiProductBadge): BadgeType => {
  if (badge === 'SALE') return 'Sale';
  if (badge === 'HIT') return 'Hit';
  return 'New';
};

const getPrimaryProductBadge = (badges: BadgeType[]) =>
  BADGE_PRIORITY.find((badge) => badges.includes(badge));

export const mapApiPhoneToProduct = (phone: ApiPhone, img: string = FALLBACK_IMAGE): IProduct => {
  const badges = phone.badges?.map(mapApiBadgeToProductBadge) ?? [];
  const primaryBadge = getPrimaryProductBadge(badges) ?? phone.badge;
  const baseProduct: IProduct = {
    id: phone.id,
    name: formatProductDisplayName(phone.brand, phone.name),
    price: phone.price,
    img,
    badge: primaryBadge,
    badges,
    discountPercent: phone.discountPercent ?? 0,
    amount: 1,
    colors: getProductColorOptions({
      colors: phone.colors ?? [],
      variants: phone.variants ?? [],
    }),
    storageCapacity: getProductStorageOptions({
      storageCapacity: phone.storageCapacity ?? [],
      variants: phone.variants ?? [],
    }),
    variants: phone.variants ?? [],
    selectedColor: getDefaultPhoneColor(phone.colors),
    selectedStorage: getDefaultStorageCapacity(phone.storageCapacity),
    stock: phone.stock,
    status: phone.status,
    inStock: phone.status ? phone.status !== 'OUT_OF_STOCK' : undefined,
  };

  return applySelectedProductVariant(
    baseProduct,
    baseProduct.selectedColor?.name,
    baseProduct.selectedStorage?.name
  );
};

const formatCameraValue = (value: string) =>
  value
    .split('+')
    .map((part) => part.trim())
    .filter(Boolean)
    .join('\n');

export const buildSpecs = (phone: ApiPhone) => [
  { label: 'Screen Size', value: phone.screenSize },
  { label: 'CPU', value: phone.cpu },
  { label: 'Cores', value: String(phone.coresNumber) },
  { label: 'Main camera', value: formatCameraValue(phone.mainCamera) },
  { label: 'Front camera', value: phone.frontCamera },
  { label: 'Battery', value: phone.batteryCapacity },
  { label: 'Release year', value: String(phone.releaseYear) },
  {
    label: 'Storage',
    value: phone.storageCapacity?.length
      ? phone.storageCapacity.map(formatStorageCapacity).join('\n')
      : 'Not specified',
  },
];
