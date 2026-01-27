import { useState } from 'react';
import type { SelectChangeEvent } from '@mui/material/Select';

import type { SortOption } from '@/core/types';
import { PRICE_MAX } from '@/core/constants';

export const useCatalogState = () => {
  const [sortBy, setSortBy] = useState<SortOption>('popularity');

  const [activeItems, setActiveItems] = useState<Record<string, boolean>>({
    apple: false,
    samsung: false,
    xiaomi: false,
    oneplus: false,
    honor: false,
    poco: false,
    'in stock': false,
    'pre-order': false,
  });
  console.log(activeItems);

  const [sliderValue, setSliderValue] = useState<number>(PRICE_MAX);

  const toggleItems = (item: string) => {
    setActiveItems((prev) => ({ ...prev, [item]: !prev[item] }));
  };

  //  handler for Slider
  const handleSliderChange = (_event: Event, newValue: number | number[]) => {
    setSliderValue(newValue as number);
  };

  // handler for Select
  const handleSortChange = (event: SelectChangeEvent<string>) => {
    setSortBy(event.target.value as SortOption);
  };

  return {
    // state
    sortBy,
    activeItems,
    sliderValue,

    // actions
    toggleItems,
    handleSliderChange,
    handleSortChange,
  };
};
