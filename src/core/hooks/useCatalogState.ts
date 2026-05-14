import { useState } from 'react';

import {
  CATALOG_DEFAULT_ACTIVE_ITEMS,
  CATALOG_DEFAULT_SORT,
  CATALOG_MAX_PRICE,
} from '@/core/constants';
import type { SortOption } from '@/core/types';

export const useCatalogState = () => {
  const [sortBy, setSortBy] = useState<SortOption>(CATALOG_DEFAULT_SORT);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeItems, setActiveItems] = useState<Record<string, boolean>>(
    CATALOG_DEFAULT_ACTIVE_ITEMS
  );
  const [appliedActiveItems, setAppliedActiveItems] =
    useState<Record<string, boolean>>(CATALOG_DEFAULT_ACTIVE_ITEMS);
  const [sliderValue, setSliderValue] = useState<number>(CATALOG_MAX_PRICE);
  const [appliedSliderValue, setAppliedSliderValue] = useState<number>(CATALOG_MAX_PRICE);

  const toggleItems = (item: string) => {
    setActiveItems((prev) => ({ ...prev, [item]: !prev[item] }));
  };

  const handleSliderChange = (_event: Event, newValue: number | number[]) => {
    setSliderValue(newValue as number);
  };

  const handleSortChange = (value: string) => {
    setSortBy(value as SortOption);
    setCurrentPage(1);
  };

  const applyFilters = () => {
    setAppliedActiveItems(activeItems);
    setAppliedSliderValue(sliderValue);
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setActiveItems(CATALOG_DEFAULT_ACTIVE_ITEMS);
    setAppliedActiveItems(CATALOG_DEFAULT_ACTIVE_ITEMS);
    setSliderValue(CATALOG_MAX_PRICE);
    setAppliedSliderValue(CATALOG_MAX_PRICE);
    setCurrentPage(1);
  };

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
