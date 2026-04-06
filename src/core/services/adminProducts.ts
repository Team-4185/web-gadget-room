import { api } from '@/core/config';
import type {
  AdminProductStatus,
  AdminProductsRequestParams,
  ApiAdminProduct,
  ApiAdminProductsPage,
  IAdminPanelManagedProduct,
} from '@/core/types';

interface IAdminProductsPageData {
  products: IAdminPanelManagedProduct[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
}

const FALLBACK_IMAGE = '/icons/GraySquare.svg';
const MAX_PRICE_FILTER = 1_000_000;

const formatPrice = (value: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);

const getFallbackStock = (id: number) => 10 + (id % 40);

const getStatus = (stock: number): AdminProductStatus => {
  if (stock <= 0) return 'no_stock';
  if (stock < 10) return 'low_stock';
  return 'in_stock';
};

const mapProduct = (item: ApiAdminProduct): IAdminPanelManagedProduct => {
  const stockNumber = item.stock ?? getFallbackStock(item.id);
  const status = item.status ?? getStatus(stockNumber);

  return {
    id: String(item.id),
    title: item.name,
    sku: item.sku ?? `SKU-${item.id}`,
    brand: item.brand,
    price: formatPrice(item.price),
    stock: `${stockNumber} pcs`,
    status,
    image: item.previewImage ?? FALLBACK_IMAGE,
  };
};

const mapResponse = (payload: ApiAdminProductsPage): IAdminProductsPageData => ({
  products: payload.content.map(mapProduct),
  page: payload.page,
  size: payload.size,
  totalElements: payload.totalElements,
  totalPages: payload.totalPages,
  first: payload.first,
  last: payload.last,
});

export const adminProductsService = {
  async getProducts({
    page,
    size,
    search,
    brand,
    signal,
  }: AdminProductsRequestParams & { signal?: AbortSignal }): Promise<IAdminProductsPageData> {
    const { data } = await api.get<ApiAdminProductsPage>('/api/v1/admin/products', {
      params: {
        page,
        size,
        search,
        brand,
        minPrice: 0,
        maxPrice: MAX_PRICE_FILTER,
        sort: 'releaseYear_desc',
      },
      signal,
    });

    return mapResponse(data);
  },
};
