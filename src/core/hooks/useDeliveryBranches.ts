import { useCallback, useEffect, useState } from 'react';

import { UKRAINE_REGION_MAP_CONFIG } from '@/core/constants';
import { deliveryMapService } from '@/core/services';
import type {
  DeliveryBranchesMap,
  DeliveryBranchOption,
  DeliveryBranchProvider,
  DeliveryMethod,
  DeliveryOptionConfig,
} from '@/core/types';

const PROVIDER_BY_METHOD: Partial<Record<DeliveryMethod, DeliveryBranchProvider>> = {
  nova: 'NOVA_POSHTA',
  ukr: 'UKR_POSHTA',
};

type UseDeliveryBranchesOptions = {
  region: string;
  options: DeliveryOptionConfig[];
  fallbackBranchesByMethod: DeliveryBranchesMap;
};

export const useDeliveryBranches = ({
  region,
  options,
  fallbackBranchesByMethod,
}: UseDeliveryBranchesOptions) => {
  const [loadedBranches, setLoadedBranches] = useState<
    Partial<Record<DeliveryMethod, DeliveryBranchOption[]>>
  >({});
  const [loadingMethods, setLoadingMethods] = useState<Partial<Record<DeliveryMethod, boolean>>>(
    {}
  );
  const [failedMethods, setFailedMethods] = useState<Partial<Record<DeliveryMethod, boolean>>>({});

  useEffect(() => {
    setLoadedBranches({});

    if (!region) {
      setFailedMethods({});
      return;
    }

    const controller = new AbortController();
    const methods = options
      .map((option) => option.id)
      .filter((method): method is 'nova' | 'ukr' => method === 'nova' || method === 'ukr');

    methods.forEach((method) => {
      const provider = PROVIDER_BY_METHOD[method];
      const regionConfig = UKRAINE_REGION_MAP_CONFIG[region];

      if (!provider || !regionConfig) return;

      setLoadingMethods((prev) => ({ ...prev, [method]: true }));
      setFailedMethods((prev) => ({ ...prev, [method]: false }));

      deliveryMapService
        .getBranches(provider, regionConfig, controller.signal)
        .then((branches) => {
          if (controller.signal.aborted) return;

          setLoadedBranches((prev) => ({ ...prev, [method]: branches }));
          setFailedMethods((prev) => ({ ...prev, [method]: !branches.length }));
        })
        .catch(() => {
          if (controller.signal.aborted) return;

          setFailedMethods((prev) => ({ ...prev, [method]: true }));
        })
        .finally(() => {
          if (controller.signal.aborted) return;

          setLoadingMethods((prev) => ({ ...prev, [method]: false }));
        });
    });

    return () => {
      controller.abort();
    };
  }, [options, region]);

  const getBranchesForMethod = useCallback(
    (method: DeliveryMethod) =>
      loadedBranches[method]?.length ? loadedBranches[method] : fallbackBranchesByMethod[method],
    [fallbackBranchesByMethod, loadedBranches]
  );

  return {
    failedMethods,
    getBranchesForMethod,
    loadingMethods,
  };
};
