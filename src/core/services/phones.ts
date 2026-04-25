import { api } from '@/core/config';
import type { ApiPhone, ApiPhoneImage, CreatePhonePayload } from '@/core/types';

const imageObjectUrlCache = new Map<string, string>();
const buildPhoneFormData = (payload: CreatePhonePayload, imageFile?: File | null) => {
  const formData = new FormData();
  formData.append('phone', new Blob([JSON.stringify(payload)], { type: 'application/json' }));

  if (imageFile) {
    formData.append('image', imageFile);
  }

  return formData;
};

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
