import { EMPTY_ADMIN_PRODUCT_VARIANT } from '@/core/constants';
import type {
  AdminProductFormErrors,
  ApiPhone,
  CreatePhonePayload,
  IAdminPanelManagedProduct,
  IAdminProductFormState,
} from '@/core/types';

import { buildProductSku } from './adminProductSku';
import { buildVariantPayloads, getDerivedProductTotals } from './adminProductVariants';

const getNumericPrice = (value: string) => {
  const parsed = Number(value.replace(/[^\d.,]/g, '').replace(/,/g, ''));
  return Number.isFinite(parsed) ? String(parsed) : '';
};

const getNumericStock = (value: string) => {
  const parsed = Number(value.replace(/[^\d]/g, ''));
  return Number.isFinite(parsed) ? String(parsed) : '';
};

const getNumberValue = (value: string) => {
  const parsed = Number(value.replace(/[^\d.,]/g, '').replace(/,/g, '.'));
  return Number.isFinite(parsed) ? parsed : 0;
};

const getIntegerValue = (value: string) => {
  const parsed = Number(value.replace(/[^\d]/g, ''));
  return Number.isFinite(parsed) ? parsed : 0;
};

export const formatAdminScreenSizeInput = (value: string) => {
  const cleaned = value.replace(/,/g, '.').replace(/[^\d.]/g, '');
  const firstDotIndex = cleaned.indexOf('.');
  const normalized =
    firstDotIndex === -1
      ? cleaned
      : `${cleaned.slice(0, firstDotIndex + 1)}${cleaned
          .slice(firstDotIndex + 1)
          .replace(/\./g, '')}`;

  const [integer = '', decimal] = normalized.split('.');
  const normalizedInteger = integer.replace(/^0+(?=\d)/, '');
  const trimmedInteger = normalizedInteger.slice(0, 2);
  const trimmedDecimal = decimal === undefined ? undefined : decimal.slice(0, 1);

  return trimmedDecimal === undefined ? trimmedInteger : `${trimmedInteger}.${trimmedDecimal}`;
};

export const formatAdminFrontCameraInput = (value: string) => {
  return value.replace(/\D/g, '').slice(0, 3);
};

export const formatAdminMainCameraInput = (value: string) => {
  const cleaned = value
    .replace(/MP/gi, '')
    .replace(/[^\d-]/g, '-')
    .replace(/-{2,}/g, '-');
  const parts = cleaned.split('-').slice(0, 4);
  const formatted = parts.map((part) => part.slice(0, 3)).join('-');
  return formatted.startsWith('-') ? formatted.slice(1) : formatted;
};

export const formatAdminBatteryCapacityInput = (value: string) => {
  return value.replace(/\D/g, '').slice(0, 5);
};

export const formatAdminCpuInput = (value: string) =>
  value
    .replace(/[^A-Za-z0-9\s-]/g, '')
    .replace(/\s+/g, ' ')
    .slice(0, 30);

const toBackendScreenSize = (value: string) => {
  const screenSize = formatAdminScreenSizeInput(value);
  return screenSize ? `${screenSize}"` : '';
};

const toBackendCamera = (value: string) => {
  const camera = formatAdminFrontCameraInput(value);
  return camera ? `${camera} MP` : '';
};

const toBackendMainCamera = (value: string) => {
  const camera = formatAdminMainCameraInput(value).split('-').filter(Boolean).join('-');
  return camera ? `${camera} MP` : '';
};

const toBackendBatteryCapacity = (value: string) => {
  const capacity = formatAdminBatteryCapacityInput(value);
  return capacity ? `${capacity} mAh` : '';
};

export const mapAdminProductToDraft = (
  product: IAdminPanelManagedProduct
): IAdminProductFormState => ({
  name: product.modelName ?? product.title,
  sku: product.sku,
  brand: product.brand,
  price: getNumericPrice(product.price),
  stock: getNumericStock(product.stock),
  releaseYear: '',
  cpu: '',
  coresNumber: '',
  screenSize: '',
  frontCamera: '',
  mainCamera: '',
  batteryCapacity: '',
  description: '',
  variants: [
    {
      ...EMPTY_ADMIN_PRODUCT_VARIANT,
      clientId: 'variant-1',
      price: getNumericPrice(product.price),
      stock: getNumericStock(product.stock),
    },
  ],
});

export const mapPhoneToAdminProductDraft = (
  phone: ApiPhone,
  product: IAdminPanelManagedProduct
): IAdminProductFormState => ({
  name: phone.name ?? product.title,
  sku: phone.sku ?? product.sku,
  brand: phone.brand ?? product.brand,
  price: String(phone.price ?? getNumberValue(getNumericPrice(product.price))),
  stock: String(phone.stock ?? getIntegerValue(getNumericStock(product.stock))),
  releaseYear: String(phone.releaseYear ?? ''),
  cpu: phone.cpu ?? '',
  coresNumber: String(phone.coresNumber ?? ''),
  screenSize: formatAdminScreenSizeInput(phone.screenSize ?? ''),
  frontCamera: formatAdminFrontCameraInput(phone.frontCamera ?? ''),
  mainCamera: formatAdminMainCameraInput(phone.mainCamera ?? ''),
  batteryCapacity: formatAdminBatteryCapacityInput(phone.batteryCapacity ?? ''),
  description: phone.description ?? '',
  variants: phone.variants?.length
    ? phone.variants.map((variant) => ({
        clientId: `persisted-${variant.id}`,
        id: variant.id,
        color: variant.color,
        storageCapacity: variant.storageCapacity,
        price: String(variant.price),
        stock: String(variant.stock),
        sku: variant.sku,
        isPersisted: true,
      }))
    : [
        {
          ...EMPTY_ADMIN_PRODUCT_VARIANT,
          clientId: 'variant-1',
          price: String(phone.price ?? getNumberValue(getNumericPrice(product.price))),
          stock: String(phone.stock ?? getIntegerValue(getNumericStock(product.stock))),
        },
      ],
});

export const buildAdminPhonePayload = (draft: IAdminProductFormState): CreatePhonePayload => {
  const totals = getDerivedProductTotals(draft.variants);

  return {
    releaseYear: getIntegerValue(draft.releaseYear),
    batteryCapacity: toBackendBatteryCapacity(draft.batteryCapacity),
    brand: draft.brand.trim(),
    cpu: formatAdminCpuInput(draft.cpu).trim(),
    price: totals.price,
    name: draft.name.trim(),
    screenSize: toBackendScreenSize(draft.screenSize),
    frontCamera: toBackendCamera(draft.frontCamera),
    mainCamera: toBackendMainCamera(draft.mainCamera),
    status: totals.status,
    stock: totals.stock,
    description: draft.description.trim(),
    coresNumber: Math.max(1, getIntegerValue(draft.coresNumber)),
    sku: buildProductSku(draft.brand, draft.name),
    variants: buildVariantPayloads(draft),
  };
};

export const validateAdminProductDraft = (
  draft: IAdminProductFormState,
  payload: CreatePhonePayload
) => {
  const errors: AdminProductFormErrors = {};

  if (!payload.name.trim()) {
    errors.name = 'Name is required.';
  } else if (payload.name.trim().length < 3 || payload.name.trim().length > 255) {
    errors.name = 'Name length must be 3 to 255 characters.';
  }

  if (!payload.brand.trim()) {
    errors.brand = 'Brand is required.';
  } else if (payload.brand.trim().length < 3 || payload.brand.trim().length > 255) {
    errors.brand = 'Brand length must be 3 to 255 characters.';
  }

  if (!payload.cpu.trim()) errors.cpu = 'CPU is required.';

  if (!payload.sku.trim()) {
    errors.sku = 'SKU is required.';
  } else if (payload.sku.trim().length < 3 || payload.sku.trim().length > 64) {
    errors.sku = 'SKU length must be 3 to 64 characters.';
  }

  const hasValidReleaseYear = /^\d{4}$/.test(draft.releaseYear.trim());
  if (!draft.releaseYear.trim()) {
    errors.releaseYear = 'Release year is required.';
  } else if (!hasValidReleaseYear) {
    errors.releaseYear = 'Release year must be 4 digits (e.g. 2026).';
  } else if (payload.releaseYear < 1970) {
    errors.releaseYear = 'Release year must be 1970 or newer.';
  } else if (payload.releaseYear > 2026) {
    errors.releaseYear = 'Release year must be 2026 or earlier.';
  }

  const hasValidCoresNumber = /^\d+$/.test(draft.coresNumber.trim());
  if (!draft.coresNumber.trim()) {
    errors.coresNumber = 'Cores number is required.';
  } else if (!hasValidCoresNumber) {
    errors.coresNumber = 'Cores number must be a whole number.';
  } else if (payload.coresNumber < 1) {
    errors.coresNumber = 'Cores number must be at least 1.';
  } else if (payload.coresNumber > 32) {
    errors.coresNumber = 'Cores number must be at most 32.';
  }

  if (!payload.description.trim()) errors.description = 'Description is required.';

  if (!/^[A-Za-z0-9\s-]+$/.test(payload.cpu)) {
    errors.cpu = 'CPU can contain only letters, numbers, spaces and hyphens.';
  } else if (payload.cpu.length > 30) {
    errors.cpu = 'CPU must be at most 30 characters.';
  }

  if (!/^\d+(?:\.\d+)?\smAh$/.test(payload.batteryCapacity)) {
    errors.batteryCapacity = 'Use format: 4323 mAh';
  }

  if (!/^\d+(?:\.\d+)?"$/.test(payload.screenSize)) {
    errors.screenSize = 'Use format: 6.7"';
  }

  if (!/^\d+\sMP$/.test(payload.frontCamera)) {
    errors.frontCamera = 'Use format: 12 MP';
  }

  if (!/^\d+(-\d+)*\sMP$/.test(payload.mainCamera)) {
    errors.mainCamera = 'Use format: 48-12-12 MP';
  }

  return errors;
};
