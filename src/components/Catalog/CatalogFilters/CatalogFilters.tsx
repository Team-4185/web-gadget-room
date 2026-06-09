import type { FC } from 'react';
import { Box } from '@mui/material';

import { Accordion, SliderPrice, Button } from '@/components';
import { CATALOG_MIN_PRICE } from '@/core/constants';
import type { ICheckboxOption } from '@/core/types';

import './CatalogFilters.css';

interface ICatalogFiltersProps {
  brandOptions: ICheckboxOption[];
  colorOptions: ICheckboxOption[];
  storageOptions: ICheckboxOption[];
  activeItems: Record<string, boolean>;
  activeColorItems: Record<string, boolean>;
  activeStorageItems: Record<string, boolean>;
  sliderValue: number;
  minPrice: number;
  maxPrice: number;
  onSliderChange: (_event: Event, newValue: number | number[]) => void;
  onToggle: (item: string) => void;
  onToggleColor: (item: string) => void;
  onToggleStorage: (item: string) => void;
  onApply: () => void;
  onReset: () => void;
}

export const CatalogFilters: FC<ICatalogFiltersProps> = ({
  brandOptions,
  colorOptions,
  storageOptions,
  activeItems,
  activeColorItems,
  activeStorageItems,
  sliderValue,
  minPrice,
  maxPrice,
  onSliderChange,
  onToggle,
  onToggleColor,
  onToggleStorage,
  onApply,
  onReset,
}) => {
  return (
    <aside className="catalog__filters">
      <span className="catalog__filters-title">Filter:</span>

      <Box className="catalog__filters-layout">
        <Accordion title="Brand" items={brandOptions} active={activeItems} onToggle={onToggle} />
        <Accordion
          title="Color"
          items={colorOptions}
          active={activeColorItems}
          onToggle={onToggleColor}
          defaultExpanded={false}
        />
        <Accordion
          title="Storage"
          items={storageOptions}
          active={activeStorageItems}
          onToggle={onToggleStorage}
          defaultExpanded={false}
        />

        <SliderPrice
          className="catalog__slider"
          value={sliderValue}
          min={minPrice || CATALOG_MIN_PRICE}
          max={maxPrice}
          onChange={onSliderChange}
        />

        <div className="catalog__filters-buttons">
          <Button maxWidth="145px" height="40px" fontSize="20px" fontWeight={400} onClick={onReset}>
            Reset
          </Button>
          <Button maxWidth="145px" height="40px" fontSize="20px" fontWeight={400} onClick={onApply}>
            Apply
          </Button>
        </div>
      </Box>
    </aside>
  );
};
