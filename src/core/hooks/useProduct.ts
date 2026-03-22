import { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import { api } from '@/core/config';
import { PRODUCTS, SPECS } from '@/core/constants';
import { phonesService } from '@/core/services';
import type { IProduct, UseProductResult } from '@/core/types';
import { buildSpecs, mapApiPhoneToProduct } from '@/core/utils';

const FALLBACK_IMAGE = '/icons/GraySquare.svg';
const GALLERY_SIZE = 4;

const normalizeGalleryImages = (images: string[]): string[] => {
  const limited = images.slice(0, GALLERY_SIZE);
  while (limited.length < GALLERY_SIZE) {
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
  const objectUrlsRef = useRef<string[]>([]);

  const revokeObjectUrls = () => {
    objectUrlsRef.current.forEach((url) => URL.revokeObjectURL(url));
    objectUrlsRef.current = [];
  };

  useEffect(() => {
    // TESTING ONLY: force local constants and skip backend calls when no backend is available.
    if (useTestingFallback) return;

    const numericId = Number(id);
    if (!numericId || Number.isNaN(numericId)) return;

    let cancelled = false;

    const run = async () => {
      setLoading(true);
      setError(null);
      try {
        const phone = await phonesService.getById(numericId);
        if (cancelled) return;

        const imageFetchResults = await Promise.allSettled(
          (phone.images ?? []).map(async (image) => {
            const { data } = await api.get<Blob>(image.url, { responseType: 'blob' });
            return URL.createObjectURL(data);
          })
        );

        const resolvedObjectUrls = imageFetchResults.flatMap((result) =>
          result.status === 'fulfilled' ? [result.value] : []
        );

        if (cancelled) {
          resolvedObjectUrls.forEach((url) => URL.revokeObjectURL(url));
          return;
        }

        revokeObjectUrls();
        objectUrlsRef.current = resolvedObjectUrls;

        const resolvedImages = normalizeGalleryImages(resolvedObjectUrls);

        setProduct({ ...mapApiPhoneToProduct(phone), img: resolvedImages[0] });
        setSpecs(buildSpecs(phone));
        setDescription(phone.description ?? '');
        setGalleryImages(resolvedImages);
      } catch {
        if (cancelled) return;
        revokeObjectUrls();
        // TESTING ONLY: fallback to local constants if backend call fails, to allow testing without a backend.
        setError(null);
        setProduct({ ...fallbackProduct, img: fallbackProduct.img || FALLBACK_IMAGE });
        setSpecs(SPECS.map(({ label, value }) => ({ label, value })));
        setDescription(
          'Enhanced capabilities thanks to an enlarged display and all-day battery life.'
        );
        setGalleryImages(
          normalizeGalleryImages([fallbackProduct.img || FALLBACK_IMAGE])
        );
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    run();

    return () => {
      cancelled = true;
      revokeObjectUrls();
    };
  }, [id, useTestingFallback]);

  return { product, specs, description, galleryImages, loading, error };
};
