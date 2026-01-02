import { useState } from 'react';
import type { SelectChangeEvent } from '@mui/material/Select';

import type { Brand, SortOption } from '../types/catalog';
import { PRICE_MAX } from '../constants/catalog';

export const useCatalogState = () => {
  const [sortBy, setSortBy] = useState<SortOption>('popularity');

  const [activeBrands, setActiveBrands] = useState<Record<Brand, boolean>>({
    apple: false,
    samsung: false,
    xiaomi: false,
    oneplus: false,
    honor: false,
    poco: false,
  });

  const [inStockActive, setInStockActive] = useState(false);
  const [preOrderActive, setPreOrderActive] = useState(false);
  const [sliderValue, setSliderValue] = useState<number>(PRICE_MAX);

  const toggleBrand = (brand: Brand) => {
    setActiveBrands((prev) => ({ ...prev, [brand]: !prev[brand] }));
  };

  const toggleInStock = () => setInStockActive((prev) => !prev);
  const togglePreOrder = () => setPreOrderActive((prev) => !prev);

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
    activeBrands,
    inStockActive,
    preOrderActive,
    sliderValue,

    // actions
    toggleBrand,
    toggleInStock,
    togglePreOrder,
    handleSliderChange,
    handleSortChange,
  };
};
