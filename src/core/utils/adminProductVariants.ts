import type {
  AdminProductVariantDraft,
  AdminProductVariantErrors,
  ApiStorageCapacityName,
  CreatePhonePayload,
  IAdminProductFormState,
  PhoneStockStatus,
} from '@/core/types';

const normalizeSkuPart = (value: string) =>
  value
    .trim()
    .toUpperCase()
    .replace(/[^A-Z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const getNumberValue = (value: string) => {
  const parsed = Number(value.replace(/[^\d.,]/g, '').replace(/,/g, '.'));
  return Number.isFinite(parsed) ? parsed : 0;
};

const getIntegerValue = (value: string) => {
  const parsed = Number(value.replace(/[^\d]/g, ''));
  return Number.isFinite(parsed) ? parsed : 0;
};

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

export const resolveProductStatus = (stock: number): PhoneStockStatus => {
  if (stock <= 0) return 'OUT_OF_STOCK';
  if (stock < 10) return 'LOW_STOCK';
  return 'IN_STOCK';
};

export const getVariantKey = (
  variant: Pick<AdminProductVariantDraft, 'color' | 'storageCapacity'>
) => `${variant.color}|${variant.storageCapacity}`;

export const createAdminProductVariantDraft = (
  index: number,
  overrides: Partial<AdminProductVariantDraft> = {}
): AdminProductVariantDraft => ({
  clientId: `variant-${Date.now()}-${index}`,
  color: 'BLACK',
  storageCapacity: 'CAPACITY_128GB',
  price: '',
  stock: '',
  ...overrides,
});

export const getDerivedProductTotals = (variants: AdminProductVariantDraft[]) => {
  const prices = variants
    .map((variant) => getNumberValue(variant.price))
    .filter((price) => price >= 0);
  const stock = variants.reduce((sum, variant) => sum + getIntegerValue(variant.stock), 0);

  return {
    price: prices.length ? Math.min(...prices) : 0,
    stock,
    status: resolveProductStatus(stock),
  };
};

export const buildVariantPayloads = (
  draft: IAdminProductFormState
): NonNullable<CreatePhonePayload['variants']> => {
  const productSku = buildProductSku(draft.brand, draft.name);

  return draft.variants.map((variant) => {
    const stock = getIntegerValue(variant.stock);

    return {
      sku: buildVariantSku(productSku, variant.color, variant.storageCapacity),
      color: variant.color,
      storageCapacity: variant.storageCapacity,
      price: getNumberValue(variant.price),
      stock,
    };
  });
};

export const validateAdminProductVariants = (
  variants: AdminProductVariantDraft[]
): AdminProductVariantErrors => {
  const errors: AdminProductVariantErrors = {};
  const seen = new Set<string>();

  variants.forEach((variant) => {
    const rowErrors: AdminProductVariantErrors[string] = {};
    const key = getVariantKey(variant);

    if (seen.has(key)) {
      rowErrors.color = 'This color and storage combination already exists.';
      rowErrors.storageCapacity = 'This color and storage combination already exists.';
    } else {
      seen.add(key);
    }

    if (!variant.price.trim()) {
      rowErrors.price = 'Price is required.';
    } else if (!/^\d+(?:[.,]\d+)?$/.test(variant.price.trim())) {
      rowErrors.price = 'Price must be a valid number.';
    }

    if (!variant.stock.trim()) {
      rowErrors.stock = 'Stock is required.';
    } else if (!/^\d+$/.test(variant.stock.trim())) {
      rowErrors.stock = 'Stock must be a whole number.';
    }

    if (Object.keys(rowErrors).length) {
      errors[variant.clientId] = rowErrors;
    }
  });

  return errors;
};
