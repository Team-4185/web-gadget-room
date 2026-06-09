import { useCallback, useEffect, useState } from 'react';

import { CATALOG_DEFAULT_SORT, CATALOG_MAX_PRICE } from '@/core/constants';
import type { ICheckboxOption, SortOption } from '@/core/types';
import { buildCatalogActiveItems } from '@/core/utils';

type CatalogStateOptions = {
  brandOptions: ICheckboxOption[];
  colorOptions: ICheckboxOption[];
  storageOptions: ICheckboxOption[];
  maxPrice: number;
};

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

const areCatalogActiveItemsEqual = (
  firstItems: Record<string, boolean>,
  secondItems: Record<string, boolean>
) => {
  const firstKeys = Object.keys(firstItems);
  const secondKeys = Object.keys(secondItems);

  if (firstKeys.length !== secondKeys.length) return false;

  return firstKeys.every((key) => firstItems[key] === secondItems[key]);
};

export const useCatalogState = ({
  brandOptions,
  colorOptions,
  storageOptions,
  maxPrice,
}: CatalogStateOptions) => {
  const [sortBy, setSortBy] = useState<SortOption>(CATALOG_DEFAULT_SORT);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeItems, setActiveItems] = useState<Record<string, boolean>>(() =>
    buildCatalogActiveItems(brandOptions)
  );
  const [appliedActiveItems, setAppliedActiveItems] = useState<Record<string, boolean>>(() =>
    buildCatalogActiveItems(brandOptions)
  );
  const [activeColorItems, setActiveColorItems] = useState<Record<string, boolean>>(() =>
    buildCatalogActiveItems(colorOptions)
  );
  const [appliedActiveColorItems, setAppliedActiveColorItems] = useState<Record<string, boolean>>(
    () => buildCatalogActiveItems(colorOptions)
  );
  const [activeStorageItems, setActiveStorageItems] = useState<Record<string, boolean>>(() =>
    buildCatalogActiveItems(storageOptions)
  );
  const [appliedActiveStorageItems, setAppliedActiveStorageItems] = useState<
    Record<string, boolean>
  >(() => buildCatalogActiveItems(storageOptions));
  const [sliderValue, setSliderValue] = useState<number>(maxPrice || CATALOG_MAX_PRICE);
  const [appliedSliderValue, setAppliedSliderValue] = useState<number>(
    maxPrice || CATALOG_MAX_PRICE
  );

  useEffect(() => {
    setActiveItems((prev) => {
      const next = reconcileCatalogActiveItems(brandOptions, prev);
      return areCatalogActiveItemsEqual(prev, next) ? prev : next;
    });
    setAppliedActiveItems((prev) => {
      const next = reconcileCatalogActiveItems(brandOptions, prev);
      return areCatalogActiveItemsEqual(prev, next) ? prev : next;
    });
  }, [brandOptions]);

  useEffect(() => {
    setActiveColorItems((prev) => {
      const next = reconcileCatalogActiveItems(colorOptions, prev);
      return areCatalogActiveItemsEqual(prev, next) ? prev : next;
    });
    setAppliedActiveColorItems((prev) => {
      const next = reconcileCatalogActiveItems(colorOptions, prev);
      return areCatalogActiveItemsEqual(prev, next) ? prev : next;
    });
  }, [colorOptions]);

  useEffect(() => {
    setActiveStorageItems((prev) => {
      const next = reconcileCatalogActiveItems(storageOptions, prev);
      return areCatalogActiveItemsEqual(prev, next) ? prev : next;
    });
    setAppliedActiveStorageItems((prev) => {
      const next = reconcileCatalogActiveItems(storageOptions, prev);
      return areCatalogActiveItemsEqual(prev, next) ? prev : next;
    });
  }, [storageOptions]);

  useEffect(() => {
    setSliderValue((prev) => (prev === CATALOG_MAX_PRICE || prev > maxPrice ? maxPrice : prev));
    setAppliedSliderValue((prev) =>
      prev === CATALOG_MAX_PRICE || prev > maxPrice ? maxPrice : prev
    );
  }, [maxPrice]);

  const toggleItems = useCallback((item: string) => {
    setActiveItems((prev) => ({ ...prev, [item]: !prev[item] }));
  }, []);

  const toggleColorItems = useCallback((item: string) => {
    setActiveColorItems((prev) => ({ ...prev, [item]: !prev[item] }));
  }, []);

  const toggleStorageItems = useCallback((item: string) => {
    setActiveStorageItems((prev) => ({ ...prev, [item]: !prev[item] }));
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
    setAppliedActiveColorItems(activeColorItems);
    setAppliedActiveStorageItems(activeStorageItems);
    setAppliedSliderValue(sliderValue);
    setCurrentPage(1);
  }, [activeColorItems, activeItems, activeStorageItems, sliderValue]);

  const resetFilters = useCallback(() => {
    const defaultActiveItems = buildCatalogActiveItems(brandOptions);
    const defaultActiveColorItems = buildCatalogActiveItems(colorOptions);
    const defaultActiveStorageItems = buildCatalogActiveItems(storageOptions);

    setActiveItems(defaultActiveItems);
    setAppliedActiveItems(defaultActiveItems);
    setActiveColorItems(defaultActiveColorItems);
    setAppliedActiveColorItems(defaultActiveColorItems);
    setActiveStorageItems(defaultActiveStorageItems);
    setAppliedActiveStorageItems(defaultActiveStorageItems);
    setSliderValue(maxPrice);
    setAppliedSliderValue(maxPrice);
    setCurrentPage(1);
  }, [brandOptions, colorOptions, maxPrice, storageOptions]);

  return {
    sortBy,
    currentPage,
    activeItems,
    appliedActiveItems,
    activeColorItems,
    appliedActiveColorItems,
    activeStorageItems,
    appliedActiveStorageItems,
    sliderValue,
    appliedSliderValue,

    toggleItems,
    toggleColorItems,
    toggleStorageItems,
    handleSliderChange,
    handleSortChange,
    applyFilters,
    resetFilters,
    setCurrentPage,
  };
};
