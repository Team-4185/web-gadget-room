import { useEffect, useMemo, useState } from 'react';
import { useLocation, useParams } from 'react-router';

import { FALLBACK_IMAGE, PRODUCTS, SPECS } from '@/core/constants';
import { phonesService } from '@/core/services';
import type { IProduct, UseProductResult } from '@/core/types';
import {
  buildSpecs,
  getFallbackProductDetails,
  isDemoFallbackEnabled,
  isForcedTestingFallback,
  mapApiPhoneToProduct,
  normalizeProductGalleryImages,
} from '@/core/utils';

export const useProduct = (): UseProductResult => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const demoFallbackEnabled = isDemoFallbackEnabled();
  const forcedTestingFallback = isForcedTestingFallback();

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
    normalizeProductGalleryImages([fallbackProduct.img || FALLBACK_IMAGE])
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (forcedTestingFallback) return;

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
        const resolvedImages = normalizeProductGalleryImages(resolvedObjectUrls);
        const previewImageUrl = phone.previewImage?.url
          ? await phonesService.getImageObjectUrl(phone.previewImage.url, controller.signal)
          : null;

        setProduct(mapApiPhoneToProduct(phone, previewImageUrl ?? resolvedImages[0]));
        setSpecs(buildSpecs(phone));
        setDescription(phone.description ?? '');
        setGalleryImages(resolvedImages);
      } catch {
        if (controller.signal.aborted) return;
        if (demoFallbackEnabled) {
          const fallback = getFallbackProductDetails(fallbackProduct);
          setError(null);
          setProduct(fallback.product);
          setSpecs(fallback.specs);
          setDescription(fallback.description);
          setGalleryImages(fallback.galleryImages);
        } else {
          setError('Failed to load product');
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };

    run();

    return () => {
      controller.abort();
    };
  }, [demoFallbackEnabled, fallbackProduct, forcedTestingFallback, id]);

  return { product, specs, description, galleryImages, loading, error };
};
