import type { CreatePhonePayload } from '@/core/types';

export const buildPhoneFormData = (payload: CreatePhonePayload, imageFile?: File | null) => {
  const formData = new FormData();
  formData.append('phone', new Blob([JSON.stringify(payload)], { type: 'application/json' }));

  if (imageFile) {
    formData.append('image', imageFile);
  }

  return formData;
};
