import { useState } from 'react';

import type { SortOption } from '@/core/types';

const DEFAULT_ACTIVE_ITEMS: Record<string, boolean> = {
  apple: false,
  samsung: false,
  xiaomi: false,
  oneplus: false,
  honor: false,
  poco: false,
  'in-stock': false,
  'pre-order': false,
};

const DEFAULT_MAX_PRICE = 250000;

export const useCatalogState = () => {
  const [sortBy, setSortBy] = useState<SortOption>('popularity');
  const [activeItems, setActiveItems] = useState<Record<string, boolean>>(DEFAULT_ACTIVE_ITEMS);
  const [appliedActiveItems, setAppliedActiveItems] =
    useState<Record<string, boolean>>(DEFAULT_ACTIVE_ITEMS);
  const [sliderValue, setSliderValue] = useState<number>(DEFAULT_MAX_PRICE);
  const [appliedSliderValue, setAppliedSliderValue] = useState<number>(DEFAULT_MAX_PRICE);

  const toggleItems = (item: string) => {
    setActiveItems((prev) => ({ ...prev, [item]: !prev[item] }));
  };

  const handleSliderChange = (_event: Event, newValue: number | number[]) => {
    setSliderValue(newValue as number);
  };

  const handleSortChange = (value: string) => {
    setSortBy(value as SortOption);
  };

  const applyFilters = () => {
    setAppliedActiveItems(activeItems);
    setAppliedSliderValue(sliderValue);
  };

  const resetFilters = () => {
    setActiveItems(DEFAULT_ACTIVE_ITEMS);
    setAppliedActiveItems(DEFAULT_ACTIVE_ITEMS);
    setSliderValue(DEFAULT_MAX_PRICE);
    setAppliedSliderValue(DEFAULT_MAX_PRICE);
  };

  return {
    sortBy,
    activeItems,
    appliedActiveItems,
    sliderValue,
    appliedSliderValue,

    toggleItems,
    handleSliderChange,
    handleSortChange,
    applyFilters,
    resetFilters,
  };
};
