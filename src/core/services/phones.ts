import { api } from '@/core/config';
import type { ApiPhone, ApiPhoneImage, CreatePhonePayload } from '@/core/types';

const imageObjectUrlCache = new Map<string, string>();

export const phonesService = {
  async create(payload: CreatePhonePayload) {
    const { data } = await api.post<ApiPhone>('/api/v1/phones', payload);
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
