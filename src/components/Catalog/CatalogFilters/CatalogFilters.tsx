import type { FC } from 'react';
import { Box } from '@mui/material';

import { Accordion, SliderPrice, Button } from '@/components';
import { CATALOG_MAX_PRICE, CATALOG_MIN_PRICE } from '@/core/constants';
import type { ICheckboxOption } from '@/core/types';

import './CatalogFilters.css';

interface ICatalogFiltersProps {
  brandOptions: ICheckboxOption[];
  activeItems: Record<string, boolean>;
  sliderValue: number;
  onSliderChange: (_event: Event, newValue: number | number[]) => void;
  onToggle: (item: string) => void;
  onApply: () => void;
  onReset: () => void;
}

export const CatalogFilters: FC<ICatalogFiltersProps> = ({
  brandOptions,
  activeItems,
  sliderValue,
  onSliderChange,
  onToggle,
  onApply,
  onReset,
}) => {
  return (
    <aside className="catalog__filters">
      <span className="catalog__filters-title">Filter:</span>

      <Box className="catalog__filters-layout">
        <Accordion title="Brand" items={brandOptions} active={activeItems} onToggle={onToggle} />

        <SliderPrice
          className="catalog__slider"
          value={sliderValue}
          min={CATALOG_MIN_PRICE}
          max={CATALOG_MAX_PRICE}
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
