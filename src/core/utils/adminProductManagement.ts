import { api } from '@/core/config';
import { FALLBACK_IMAGE } from '@/core/constants';
import { phonesService } from '@/core/services';
import type {
  AdminProductFormErrors,
  AdminProductStatus,
  ApiAdminProduct,
  ApiAdminProductsPage,
  ApiPhone,
  CreatePhonePayload,
  IAdminPanelManagedProduct,
  IAdminProductFormState,
  ISelectOption,
} from '@/core/types';

export interface IAdminProductsPageData {
  products: IAdminPanelManagedProduct[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
}

export const ADMIN_PRODUCTS_MAX_PRICE_FILTER = 1_000_000;

const formatAdminProductPrice = (value: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);

const getFallbackStock = (id: number) => 10 + (id % 40);

const getStatus = (stock: number): AdminProductStatus => {
  if (stock <= 0) return 'OUT_OF_STOCK';
  if (stock < 10) return 'LOW_STOCK';
  return 'IN_STOCK';
};

export const mapAdminProduct = (item: ApiAdminProduct): IAdminPanelManagedProduct => {
  const stockNumber = item.stock ?? getFallbackStock(item.id);
  const status = item.status ?? getStatus(stockNumber);

  return {
    id: String(item.id),
    title: item.name,
    sku: item.sku ?? `SKU-${item.id}`,
    brand: item.brand,
    price: formatAdminProductPrice(item.price),
    stock: `${stockNumber} pcs`,
    status,
    image: item.previewImage?.url ?? FALLBACK_IMAGE,
  };
};

export const mapAdminProductsResponse = (
  payload: ApiAdminProductsPage
): IAdminProductsPageData => ({
  products: payload.content.map(mapAdminProduct),
  page: payload.page,
  size: payload.size,
  totalElements: payload.totalElements,
  totalPages: payload.totalPages,
  first: payload.first,
  last: payload.last,
});

export const resolveAdminProductImages = async (products: IAdminPanelManagedProduct[]) => {
  const imageResults = await Promise.allSettled(
    products.map((product) =>
      product.image === FALLBACK_IMAGE
        ? Promise.resolve(FALLBACK_IMAGE)
        : phonesService.getImageObjectUrl(product.image)
    )
  );

  return products.map((product, index) => ({
    ...product,
    image: imageResults[index]?.status === 'fulfilled' ? imageResults[index].value : FALLBACK_IMAGE,
  }));
};

export const fetchAdminProductsPage = async ({
  page,
  size,
  search = '',
  brand = '',
  status = '',
  signal,
}: {
  page: number;
  size: number;
  search?: string;
  brand?: string;
  status?: AdminProductStatus | '';
  signal?: AbortSignal;
}) => {
  const trimmedSearch = search.trim();
  const trimmedBrand = brand.trim();

  const { data } = await api.get<ApiAdminProductsPage>('/api/v1/admin/products', {
    params: {
      page,
      size,
      minPrice: 0,
      maxPrice: ADMIN_PRODUCTS_MAX_PRICE_FILTER,
      sort: 'releaseYear_desc',
      ...(trimmedSearch ? { search: trimmedSearch } : {}),
      ...(trimmedBrand ? { brand: trimmedBrand } : {}),
      ...(status ? { status } : {}),
    },
    signal,
  });

  return data;
};

export const buildAdminProductBrandOptions = (brands: string[]): ISelectOption[] => [
  { value: '', name: 'All brands' },
  ...brands.map((brand) => ({
    value: brand,
    name: brand,
  })),
];

export const filterAdminProductsByStatus = (
  products: IAdminPanelManagedProduct[],
  selectedStatus: AdminProductStatus | ''
) => products.filter((product) => !selectedStatus || product.status === selectedStatus);

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

export const mapAdminProductToDraft = (
  product: IAdminPanelManagedProduct
): IAdminProductFormState => ({
  name: product.title,
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
  screenSize: phone.screenSize ?? '',
  frontCamera: phone.frontCamera ?? '',
  mainCamera: phone.mainCamera ?? '',
  batteryCapacity: phone.batteryCapacity ?? '',
  description: phone.description ?? '',
});

export const buildAdminPhonePayload = (
  draft: IAdminProductFormState,
  status: AdminProductStatus
): CreatePhonePayload => ({
  releaseYear: getIntegerValue(draft.releaseYear),
  batteryCapacity: draft.batteryCapacity.trim(),
  brand: draft.brand.trim(),
  cpu: draft.cpu.trim(),
  price: getNumberValue(draft.price),
  name: draft.name.trim(),
  screenSize: draft.screenSize.trim(),
  frontCamera: draft.frontCamera.trim(),
  mainCamera: draft.mainCamera.trim(),
  status,
  stock: getIntegerValue(draft.stock),
  description: draft.description.trim(),
  coresNumber: Math.max(1, getIntegerValue(draft.coresNumber)),
  sku: draft.sku.trim(),
});

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

  const hasValidPriceNumber = /^\d+(?:[.,]\d+)?$/.test(draft.price.trim());
  if (!draft.price.trim()) {
    errors.price = 'Price is required.';
  } else if (!hasValidPriceNumber) {
    errors.price = 'Price must be a valid number.';
  } else if (payload.price < 0) {
    errors.price = 'Price must be 0 or greater.';
  }

  const hasValidStockNumber = /^\d+$/.test(draft.stock.trim());
  if (!draft.stock.trim()) {
    errors.stock = 'Stock is required.';
  } else if (!hasValidStockNumber) {
    errors.stock = 'Stock must be a whole number.';
  } else if (payload.stock < 0) {
    errors.stock = 'Stock must be 0 or greater.';
  }

  const hasValidReleaseYear = /^\d{4}$/.test(draft.releaseYear.trim());
  if (!draft.releaseYear.trim()) {
    errors.releaseYear = 'Release year is required.';
  } else if (!hasValidReleaseYear) {
    errors.releaseYear = 'Release year must be 4 digits (e.g. 2026).';
  } else if (payload.releaseYear < 1970) {
    errors.releaseYear = 'Release year must be 1970 or newer.';
  }

  const hasValidCoresNumber = /^\d+$/.test(draft.coresNumber.trim());
  if (!draft.coresNumber.trim()) {
    errors.coresNumber = 'Cores number is required.';
  } else if (!hasValidCoresNumber) {
    errors.coresNumber = 'Cores number must be a whole number.';
  } else if (payload.coresNumber < 1) {
    errors.coresNumber = 'Cores number must be at least 1.';
  }

  if (!payload.description.trim()) errors.description = 'Description is required.';

  if (!/^\d+(?:\.\d+)?\smAh$/.test(payload.batteryCapacity)) {
    errors.batteryCapacity = 'Use format: 4323 mAh';
  }

  if (!/^\d+(?:\.\d+)?"$/.test(payload.screenSize)) {
    errors.screenSize = 'Use format: 6.7"';
  }

  if (!/^\d+\sMP$/.test(payload.frontCamera)) {
    errors.frontCamera = 'Use format: 12 MP';
  }

  if (!/^\d+-\d+-\d+\sMP$/.test(payload.mainCamera)) {
    errors.mainCamera = 'Use exact format: 48-12-12 MP';
  }

  return errors;
};
