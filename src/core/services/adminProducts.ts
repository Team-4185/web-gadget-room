import { api } from '@/core/config';
import { phonesService } from './phones';
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
  if (stock <= 0) return 'OUT_OF_STOCK';
  if (stock < 10) return 'LOW_STOCK';
  return 'IN_STOCK';
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
    image: item.previewImage?.url ?? FALLBACK_IMAGE,
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

const resolveProductImages = async (products: IAdminPanelManagedProduct[]) => {
  const imageResults = await Promise.allSettled(
    products.map((product) =>
      product.image === FALLBACK_IMAGE
        ? Promise.resolve(FALLBACK_IMAGE)
        : phonesService.getImageObjectUrl(product.image)
    )
  );

  return products.map((product, index) => ({
    ...product,
    image:
      imageResults[index]?.status === 'fulfilled'
        ? imageResults[index].value
        : FALLBACK_IMAGE,
  }));
};

const fetchProductsPage = async ({
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
      maxPrice: MAX_PRICE_FILTER,
      sort: 'releaseYear_desc',
      ...(trimmedSearch ? { search: trimmedSearch } : {}),
      ...(trimmedBrand ? { brand: trimmedBrand } : {}),
      ...(status ? { status } : {}),
    },
    signal,
  });

  return data;
};

export const adminProductsService = {
  async getProducts({
    page,
    size,
    search,
    brand,
    status,
    signal,
  }: AdminProductsRequestParams & { signal?: AbortSignal }): Promise<IAdminProductsPageData> {
    const data = await fetchProductsPage({ page, size, search, brand, status, signal });
    const response = mapResponse(data);
    const products = await resolveProductImages(response.products);

    return {
      ...response,
      products,
    };
  },
  async getAvailableBrands(signal?: AbortSignal) {
    const PAGE_SIZE = 100;
    const firstPage = await fetchProductsPage({ page: 1, size: PAGE_SIZE, signal });
    const uniqueBrands = new Set(
      firstPage.content.map((item) => item.brand.trim()).filter(Boolean)
    );

    if (firstPage.totalPages > 1) {
      const nextPagePromises = Array.from({ length: firstPage.totalPages - 1 }, (_, index) =>
        fetchProductsPage({ page: index + 2, size: PAGE_SIZE, signal })
      );
      const restPages = await Promise.all(nextPagePromises);

      restPages.forEach((pageData) => {
        pageData.content.forEach((item) => {
          const brand = item.brand.trim();
          if (brand) uniqueBrands.add(brand);
        });
      });
    }

    return Array.from(uniqueBrands).sort((a, b) => a.localeCompare(b));
  },
};
