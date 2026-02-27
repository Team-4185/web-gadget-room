import { useEffect, useMemo, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import { PRODUCTS, SPECS } from '@/core/constants';
import { phonesService } from '@/core/services';
import type { ApiPhone, IProduct } from '@/core/types';

const mapApiPhoneToProduct = (phone: ApiPhone): IProduct => ({
  id: phone.id,
  name: phone.name,
  price: phone.price,
  img: '/icons/GraySquare.svg',
  amount: 1,
});

const buildSpecs = (phone: ApiPhone) => [
  { label: 'Screen Size', value: phone.screenSize },
  { label: 'CPU', value: phone.cpu },
  { label: 'Cores', value: String(phone.coresNumber) },
  { label: 'Main camera', value: phone.mainCamera },
  { label: 'Front camera', value: phone.frontCamera },
  { label: 'Battery', value: phone.batteryCapacity },
];

type UseProductResult = {
  product: IProduct;
  specs: { label: string; value: string }[];
  description: string;
  loading: boolean;
  error: string | null;
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
        setProduct(mapApiPhoneToProduct(phone));
        setSpecs(buildSpecs(phone));
        setDescription(phone.description ?? '');
      } catch {
        if (cancelled) return;
        // TESTING ONLY: fallback to local constants if backend call fails, to allow testing without a backend.
        setError(null);
        setProduct(fallbackProduct);
        setSpecs(SPECS.map(({ label, value }) => ({ label, value })));
        setDescription(
          'Enhanced capabilities thanks to an enlarged display and all-day battery life.'
        );
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    run();

    return () => {
      cancelled = true;
    };
  }, [fallbackProduct, id, useTestingFallback]);

  return { product, specs, description, loading, error };
};
