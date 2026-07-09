import { api } from '@/core/config';
import type {
  ApiCatalogProductsPage,
  ApiCatalogFilterMetadata,
  ApiPhone,
  ApiPhoneImage,
  CatalogProductsRequestParams,
  CreatePhonePayload,
} from '@/core/types';
import { buildPhoneFormData } from '@/core/utils';

const imageObjectUrlCache = new Map<string, string>();
const catalogRequestCache = new Map<string, Promise<ApiCatalogProductsPage>>();

const getCatalogRequestKey = (params: CatalogProductsRequestParams) =>
  JSON.stringify({
    page: params.page,
    size: params.size,
    brands: params.brands ?? [],
    inStock: params.inStock,
    preOrder: params.preOrder,
    minPrice: params.minPrice,
    maxPrice: params.maxPrice,
    sort: params.sort,
  });

export const phonesService = {
  async create(payload: CreatePhonePayload, imageFile?: File | null) {
    const formData = buildPhoneFormData(payload, imageFile);
    const { data } = await api.post<ApiPhone>('/api/v1/phones', formData);
    return data;
  },
  async update(id: number, payload: CreatePhonePayload) {
    const { data } = await api.put<ApiPhone>(`/api/v1/phones/${id}`, payload);
    return data;
  },
  async delete(id: number) {
    await api.delete(`/api/v1/phones/${id}`);
  },
  async addImage(id: number, imageFile: File) {
    const formData = new FormData();
    formData.append('image', imageFile);

    const { data } = await api.post<ApiPhoneImage>(`/api/v1/phones/${id}/add-image`, formData);
    return data;
  },
  async getImages(id: number, signal?: AbortSignal) {
    const { data } = await api.get<ApiPhoneImage[]>(`/api/v1/phones/${id}/images`, { signal });
    return data;
  },
  async deleteImage(phoneId: number, imageId: number) {
    await api.delete(`/api/v1/phones/${phoneId}/images/${imageId}`);
  },
  async getAll(signal?: AbortSignal) {
    const { data } = await api.get<ApiPhone[]>('/api/v1/phones', { signal });
    return data;
  },
  async getBrands(signal?: AbortSignal) {
    const { data } = await api.get<string[]>('/api/v1/phones/brands', { signal });
    return data;
  },
  async getFilterMetadata(signal?: AbortSignal) {
    const { data } = await api.get<ApiCatalogFilterMetadata>('/api/v1/filter/metadata', {
      signal,
    });
    return data;
  },
  async getCatalog(params: CatalogProductsRequestParams, signal?: AbortSignal) {
    const requestKey = signal ? null : getCatalogRequestKey(params);
    const cachedRequest = requestKey ? catalogRequestCache.get(requestKey) : null;

    if (cachedRequest) return cachedRequest;

    const request = api
      .get<ApiCatalogProductsPage>('/api/v1/filter/by', {
        params: {
          page: params.page,
          size: params.size,
          brands: params.brands?.join(', ') ?? '',
          inStock: params.inStock,
          preOrder: params.preOrder,
          minPrice: params.minPrice,
          maxPrice: params.maxPrice,
          sort: params.sort,
        },
        signal,
      })
      .then(({ data }) => data)
      .finally(() => {
        if (requestKey) {
          catalogRequestCache.delete(requestKey);
        }
      });

    if (requestKey) {
      catalogRequestCache.set(requestKey, request);
    }

    return request;
  },
  async getNewArrivals(signal?: AbortSignal) {
    const { data } = await api.get<ApiPhone[]>('/api/v1/phones/new-arrivals', { signal });
    return data;
  },
  async getById(id: number, signal?: AbortSignal) {
    const { data } = await api.get<ApiPhone>(`/api/v1/phones/${id}`, { signal });
    return data;
  },
  async getImageObjectUrls(images: ApiPhoneImage[], signal?: AbortSignal) {
    const results = await Promise.allSettled(
      images.map((image) => this.getImageObjectUrl(image.url, signal))
    );

    return results.flatMap((result) => (result.status === 'fulfilled' ? [result.value] : []));
  },
  async getImageObjectUrl(url: string, signal?: AbortSignal) {
    const cachedUrl = imageObjectUrlCache.get(url);
    if (cachedUrl) return cachedUrl;

    const { data } = await api.get<Blob>(url, { responseType: 'blob', signal });
    const objectUrl = URL.createObjectURL(data);
    imageObjectUrlCache.set(url, objectUrl);

    return objectUrl;
  },
  clearImageCache() {
    imageObjectUrlCache.forEach((objectUrl) => URL.revokeObjectURL(objectUrl));
    imageObjectUrlCache.clear();
  },
};
