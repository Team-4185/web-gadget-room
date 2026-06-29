import { api } from '@/core/config';
import type {
  AdminProductVariantPayload,
  AdminProductsRequestParams,
  ApiPhone,
  ApiPhoneImage,
  ApiProductVariant,
  CreatePhonePayload,
} from '@/core/types';
import {
  fetchAdminProductsPage,
  mapAdminProductsResponse,
  resolveAdminProductImages,
  type IAdminProductsPageData,
} from '@/core/utils';

const addAdminProductImage = async (id: number, imageFile: File) => {
  const formData = new FormData();
  formData.append('images', imageFile);

  const { data } = await api.post<ApiPhoneImage>(`/api/v1/admin/products/${id}/images`, formData);
  return data;
};

export const adminProductsService = {
  async getById(id: number, signal?: AbortSignal) {
    const { data } = await api.get<ApiPhone>(`/api/v1/admin/products/${id}`, { signal });
    return data;
  },
  async create(payload: CreatePhonePayload, imageFile?: File | null) {
    const formData = new FormData();
    formData.append('product', new Blob([JSON.stringify(payload)], { type: 'application/json' }));
    if (imageFile) {
      formData.append('images', imageFile);
    }

    await api.post('/api/v1/admin/products', formData);
  },
  async update(id: number, payload: CreatePhonePayload) {
    const { data } = await api.put<ApiPhone>(`/api/v1/admin/products/${id}`, payload);
    return data;
  },
  async delete(id: number) {
    await api.delete(`/api/v1/admin/products/${id}`);
  },
  async getImages(id: number, signal?: AbortSignal) {
    const { data } = await api.get<ApiPhoneImage[]>(`/api/v1/admin/products/${id}/images`, {
      signal,
    });
    return data;
  },
  async addImage(id: number, imageFile: File) {
    return addAdminProductImage(id, imageFile);
  },
  async deleteImage(productId: number, imageId: number) {
    await api.delete(`/api/v1/admin/products/${productId}/images/${imageId}`);
  },
  async addVariant(productId: number, payload: AdminProductVariantPayload) {
    const { data } = await api.post<ApiProductVariant>(
      `/api/v1/admin/products/${productId}/variants`,
      payload
    );
    return data;
  },
  async updateVariant(
    productId: number,
    variantId: number,
    payload: Partial<AdminProductVariantPayload>
  ) {
    const { data } = await api.put<ApiProductVariant>(
      `/api/v1/admin/products/${productId}/variants/${variantId}`,
      payload
    );
    return data;
  },
  async deleteVariant(productId: number, variantId: number) {
    await api.delete(`/api/v1/admin/products/${productId}/variants/${variantId}`);
  },
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
