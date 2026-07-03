import type {
  ApiPhoneColor,
  ApiPhoneColorName,
  ApiProductVariant,
  ApiStorageCapacity,
  ApiStorageCapacityName,
  IProduct,
} from '@/core/types';

export const DEFAULT_PHONE_COLOR: ApiPhoneColor = {
  name: 'BLACK',
  displayName: 'Black',
  hexCode: 'var(--phone-color-black)',
};

const PHONE_COLOR_BY_NAME: Record<ApiPhoneColorName, ApiPhoneColor> = {
  BLACK: DEFAULT_PHONE_COLOR,
  WHITE: { name: 'WHITE', displayName: 'White', hexCode: 'var(--phone-color-white)' },
  GRAY: { name: 'GRAY', displayName: 'Gray', hexCode: 'var(--phone-color-gray)' },
  SILVER: { name: 'SILVER', displayName: 'Silver', hexCode: 'var(--phone-color-silver)' },
  GOLD: { name: 'GOLD', displayName: 'Gold', hexCode: 'var(--phone-color-gold)' },
  RED: { name: 'RED', displayName: 'Red', hexCode: 'var(--phone-color-red)' },
  BLUE: { name: 'BLUE', displayName: 'Blue', hexCode: 'var(--phone-color-blue)' },
  GREEN: { name: 'GREEN', displayName: 'Green', hexCode: 'var(--phone-color-green)' },
  YELLOW: { name: 'YELLOW', displayName: 'Yellow', hexCode: 'var(--phone-color-yellow)' },
  PINK: { name: 'PINK', displayName: 'Pink', hexCode: 'var(--phone-color-pink)' },
};

export const getDefaultPhoneColor = (colors: ApiPhoneColor[] = []) =>
  colors.find((color) => color.name === DEFAULT_PHONE_COLOR.name) ??
  colors.find((color) => color.displayName.toLowerCase() === 'black') ??
  colors[0] ??
  DEFAULT_PHONE_COLOR;

export const getPhoneColorByName = (colors: ApiPhoneColor[] = [], colorName?: string) =>
  colors.find((color) => color.name === colorName) ?? getDefaultPhoneColor(colors);

export const DEFAULT_STORAGE_CAPACITY: ApiStorageCapacity = {
  name: 'CAPACITY_128GB',
  value: 128,
  unit: 'GB',
};

const STORAGE_CAPACITY_BY_NAME: Record<ApiStorageCapacityName, ApiStorageCapacity> = {
  CAPACITY_64GB: { name: 'CAPACITY_64GB', value: 64, unit: 'GB' },
  CAPACITY_128GB: DEFAULT_STORAGE_CAPACITY,
  CAPACITY_256GB: { name: 'CAPACITY_256GB', value: 256, unit: 'GB' },
  CAPACITY_512GB: { name: 'CAPACITY_512GB', value: 512, unit: 'GB' },
  CAPACITY_1TB: { name: 'CAPACITY_1TB', value: 1, unit: 'TB' },
  CAPACITY_2TB: { name: 'CAPACITY_2TB', value: 2, unit: 'TB' },
};

const STORAGE_CAPACITY_RANK: Record<ApiStorageCapacityName, number> = {
  CAPACITY_64GB: 64,
  CAPACITY_128GB: 128,
  CAPACITY_256GB: 256,
  CAPACITY_512GB: 512,
  CAPACITY_1TB: 1024,
  CAPACITY_2TB: 2048,
};

export const getDefaultStorageCapacity = (storageCapacity: ApiStorageCapacity[] = []) =>
  storageCapacity.find((storage) => storage.name === DEFAULT_STORAGE_CAPACITY.name) ??
  storageCapacity.find(
    (storage) => storage.value === DEFAULT_STORAGE_CAPACITY.value && storage.unit === 'GB'
  ) ??
  storageCapacity[0] ??
  DEFAULT_STORAGE_CAPACITY;

export const getStorageCapacityByName = (
  storageCapacity: ApiStorageCapacity[] = [],
  storageName?: string
) =>
  storageCapacity.find((storage) => storage.name === storageName) ??
  getDefaultStorageCapacity(storageCapacity);

export const formatStorageCapacity = (storage?: ApiStorageCapacity) =>
  storage ? `${storage.value}${storage.unit}` : '';

const uniqueByName = <T extends { name: string }>(items: T[]) =>
  Array.from(new Map(items.map((item) => [item.name, item])).values());

export const getPhoneColorFromVariant = (colorName: ApiPhoneColorName, colors: ApiPhoneColor[] = []) =>
  colors.find((color) => color.name === colorName) ?? PHONE_COLOR_BY_NAME[colorName] ?? DEFAULT_PHONE_COLOR;

export const getStorageCapacityFromVariant = (
  storageName: ApiStorageCapacityName,
  storageCapacity: ApiStorageCapacity[] = []
) =>
  storageCapacity.find((storage) => storage.name === storageName) ??
  STORAGE_CAPACITY_BY_NAME[storageName] ??
  DEFAULT_STORAGE_CAPACITY;

export const getProductColorOptions = (product: Pick<IProduct, 'colors' | 'variants'>) =>
  uniqueByName([
    ...(product.colors ?? []),
    ...(product.variants ?? []).map((variant) => getPhoneColorFromVariant(variant.color, product.colors)),
  ]);

export const getProductStorageOptions = (
  product: Pick<IProduct, 'storageCapacity' | 'variants'>
) =>
  uniqueByName([
    ...(product.storageCapacity ?? []),
    ...(product.variants ?? []).map((variant) =>
      getStorageCapacityFromVariant(variant.storageCapacity, product.storageCapacity)
    ),
  ]);

const sortBaseVariants = (variants: ApiProductVariant[]) =>
  [...variants].sort((first, second) => {
    const firstColorRank = first.color === DEFAULT_PHONE_COLOR.name ? 0 : 1;
    const secondColorRank = second.color === DEFAULT_PHONE_COLOR.name ? 0 : 1;

    if (firstColorRank !== secondColorRank) return firstColorRank - secondColorRank;

    return (
      STORAGE_CAPACITY_RANK[first.storageCapacity] - STORAGE_CAPACITY_RANK[second.storageCapacity]
    );
  });

export const getDefaultProductVariant = (variants: ApiProductVariant[] = []) => {
  const inStockVariants = variants.filter(
    (variant) => variant.status !== 'OUT_OF_STOCK' && variant.stock > 0
  );

  return sortBaseVariants(inStockVariants)[0] ?? sortBaseVariants(variants)[0];
};

export const findProductVariant = (
  variants: ApiProductVariant[] = [],
  colorName?: string,
  storageName?: string
) =>
  variants.find(
    (variant) => variant.color === colorName && variant.storageCapacity === storageName
  ) ??
  variants.find((variant) => variant.color === colorName) ??
  variants.find((variant) => variant.storageCapacity === storageName) ??
  getDefaultProductVariant(variants);

export const applySelectedProductVariant = (
  product: IProduct,
  colorName?: string,
  storageName?: string
): IProduct => {
  const variant = findProductVariant(product.variants, colorName, storageName);

  if (!variant) {
    return {
      ...product,
      selectedColor: getPhoneColorByName(product.colors, colorName),
      selectedStorage: getStorageCapacityByName(product.storageCapacity, storageName),
    };
  }

  return {
    ...product,
    selectedVariantId: variant.id,
    selectedColor: getPhoneColorFromVariant(variant.color, product.colors),
    selectedStorage: getStorageCapacityFromVariant(variant.storageCapacity, product.storageCapacity),
    price: variant.price,
    stock: variant.stock,
    status: variant.status,
    inStock: variant.status !== 'OUT_OF_STOCK' && variant.stock > 0,
  };
};
