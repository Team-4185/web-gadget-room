import { api } from '@/core/config';
import { FALLBACK_IMAGE } from '@/core/constants';
import { phonesService } from '@/core/services';
import { formatProductDisplayName } from './products';
import type {
  AdminProductStatus,
  ApiAdminProduct,
  ApiAdminProductsPage,
  IAdminPanelManagedProduct,
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
    title: formatProductDisplayName(item.brand, item.name),
    modelName: item.name,
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

export * from './adminProductForm';
export * from './adminProductSku';
export * from './adminProductVariants';
