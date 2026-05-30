import { useCallback, useEffect, useState } from 'react';

import { CATALOG_DEFAULT_SORT, CATALOG_MAX_PRICE } from '@/core/constants';
import type { ICheckboxOption, SortOption } from '@/core/types';
import { buildCatalogActiveItems } from '@/core/utils';

const reconcileCatalogActiveItems = (
  brandOptions: ICheckboxOption[],
  currentItems: Record<string, boolean>
) =>
  brandOptions.reduce<Record<string, boolean>>((acc, item) => {
    acc[item.value] =
      currentItems[item.value] ??
      currentItems[item.label] ??
      currentItems[item.value.toLowerCase()] ??
      false;
    return acc;
  }, {});

export const useCatalogState = (brandOptions: ICheckboxOption[]) => {
  const [sortBy, setSortBy] = useState<SortOption>(CATALOG_DEFAULT_SORT);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeItems, setActiveItems] = useState<Record<string, boolean>>(() =>
    buildCatalogActiveItems(brandOptions)
  );
  const [appliedActiveItems, setAppliedActiveItems] = useState<Record<string, boolean>>(() =>
    buildCatalogActiveItems(brandOptions)
  );
  const [sliderValue, setSliderValue] = useState<number>(CATALOG_MAX_PRICE);
  const [appliedSliderValue, setAppliedSliderValue] = useState<number>(CATALOG_MAX_PRICE);

  useEffect(() => {
    setActiveItems((prev) => reconcileCatalogActiveItems(brandOptions, prev));
    setAppliedActiveItems((prev) => reconcileCatalogActiveItems(brandOptions, prev));
  }, [brandOptions]);

  const toggleItems = useCallback((item: string) => {
    setActiveItems((prev) => ({ ...prev, [item]: !prev[item] }));
  }, []);

  const handleSliderChange = useCallback((_event: Event, newValue: number | number[]) => {
    setSliderValue(newValue as number);
  }, []);

  const handleSortChange = useCallback((value: string) => {
    setSortBy(value as SortOption);
    setCurrentPage(1);
  }, []);

  const applyFilters = useCallback(() => {
    setAppliedActiveItems(activeItems);
    setAppliedSliderValue(sliderValue);
    setCurrentPage(1);
  }, [activeItems, sliderValue]);

  const resetFilters = useCallback(() => {
    const defaultActiveItems = buildCatalogActiveItems(brandOptions);

    setActiveItems(defaultActiveItems);
    setAppliedActiveItems(defaultActiveItems);
    setSliderValue(CATALOG_MAX_PRICE);
    setAppliedSliderValue(CATALOG_MAX_PRICE);
    setCurrentPage(1);
  }, [brandOptions]);

  return {
    sortBy,
    currentPage,
    activeItems,
    appliedActiveItems,
    sliderValue,
    appliedSliderValue,

    toggleItems,
    handleSliderChange,
    handleSortChange,
    applyFilters,
    resetFilters,
    setCurrentPage,
  };
};
