import { useEffect, useMemo, useState } from 'react';
import { useLocation, useParams } from 'react-router';

import { FALLBACK_IMAGE, PRODUCTS, PRODUCT_GALLERY_SIZE, SPECS } from '@/core/constants';
import { phonesService } from '@/core/services';
import type { IProduct, UseProductResult } from '@/core/types';
import { buildSpecs, mapApiPhoneToProduct } from '@/core/utils';

const normalizeGalleryImages = (images: string[]): string[] => {
  const limited = images.slice(0, PRODUCT_GALLERY_SIZE);
  while (limited.length < PRODUCT_GALLERY_SIZE) {
    limited.push(FALLBACK_IMAGE);
  }
  return limited;
};

export const useProduct = (): UseProductResult => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const useTestingFallback = import.meta.env.VITE_USE_TESTING_FALLBACK === 'true';

  const fallbackProduct = useMemo(() => {
    const productFromState = location.state as IProduct | undefined;
    return productFromState || PRODUCTS.find((p) => p.id === Number(id)) || PRODUCTS[0];
  }, [id, location.state]);

  const [product, setProduct] = useState<IProduct>(fallbackProduct);
  const [specs, setSpecs] = useState<{ label: string; value: string }[]>(
    SPECS.map(({ label, value }) => ({ label, value }))
  );
  const [description, setDescription] = useState('No description');
  const [galleryImages, setGalleryImages] = useState<string[]>(
    normalizeGalleryImages([fallbackProduct.img || FALLBACK_IMAGE])
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // TESTING ONLY: force local constants and skip backend calls when no backend is available.
    if (useTestingFallback) return;

    const numericId = Number(id);
    if (!numericId || Number.isNaN(numericId)) return;

    const controller = new AbortController();

    const run = async () => {
      setLoading(true);
      setError(null);
      try {
        const phone = await phonesService.getById(numericId, controller.signal);
        const resolvedObjectUrls = await phonesService.getImageObjectUrls(
          phone.images ?? [],
          controller.signal
        );
        const resolvedImages = normalizeGalleryImages(resolvedObjectUrls);

        setProduct(mapApiPhoneToProduct(phone, resolvedImages[0]));
        setSpecs(buildSpecs(phone));
        setDescription(phone.description ?? '');
        setGalleryImages(resolvedImages);
      } catch {
        if (controller.signal.aborted) return;
        // TESTING ONLY: fallback to local constants if backend call fails, to allow testing without a backend.
        setError(null);
        setProduct({ ...fallbackProduct, img: fallbackProduct.img || FALLBACK_IMAGE });
        setSpecs(SPECS.map(({ label, value }) => ({ label, value })));
        setDescription(
          'Enhanced capabilities thanks to an enlarged display and all-day battery life.'
        );
        setGalleryImages(normalizeGalleryImages([fallbackProduct.img || FALLBACK_IMAGE]));
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };

    run();

    return () => {
      controller.abort();
    };
  }, [id, useTestingFallback]);

  return { product, specs, description, galleryImages, loading, error };
};
