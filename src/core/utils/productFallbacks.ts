import { FALLBACK_IMAGE, PRODUCT_GALLERY_SIZE, SPECS } from '@/core/constants';
import type { IProduct } from '@/core/types';

export const normalizeProductGalleryImages = (images: string[]): string[] => {
  const limited = images.slice(0, PRODUCT_GALLERY_SIZE);
  while (limited.length < PRODUCT_GALLERY_SIZE) {
    limited.push(FALLBACK_IMAGE);
  }
  return limited;
};

export const getFallbackProductDetails = (product: IProduct) => ({
  product: { ...product, img: product.img || FALLBACK_IMAGE },
  specs: SPECS.map(({ label, value }) => ({ label, value })),
  description: 'Enhanced capabilities thanks to an enlarged display and all-day battery life.',
  galleryImages: normalizeProductGalleryImages([product.img || FALLBACK_IMAGE]),
});
