import type { AdminProductsRequestParams } from '@/core/types';
import {
  fetchAdminProductsPage,
  mapAdminProductsResponse,
  resolveAdminProductImages,
  type IAdminProductsPageData,
} from '@/core/utils';

export const adminProductsService = {
  async getProducts({
    page,
    size,
    search,
    brand,
    status,
    signal,
  }: AdminProductsRequestParams & { signal?: AbortSignal }): Promise<IAdminProductsPageData> {
    const data = await fetchAdminProductsPage({ page, size, search, brand, status, signal });
    const response = mapAdminProductsResponse(data);
    const products = await resolveAdminProductImages(response.products);

    return {
      ...response,
      products,
    };
  },
  async getAvailableBrands(signal?: AbortSignal) {
    const PAGE_SIZE = 100;
    const firstPage = await fetchAdminProductsPage({ page: 1, size: PAGE_SIZE, signal });
    const uniqueBrands = new Set(
      firstPage.content.map((item) => item.brand.trim()).filter(Boolean)
    );

    if (firstPage.totalPages > 1) {
      const nextPagePromises = Array.from({ length: firstPage.totalPages - 1 }, (_, index) =>
        fetchAdminProductsPage({ page: index + 2, size: PAGE_SIZE, signal })
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
