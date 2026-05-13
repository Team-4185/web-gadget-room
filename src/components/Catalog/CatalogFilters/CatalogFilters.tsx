import type { FC } from 'react';
import { Box } from '@mui/material';

import { Accordion, SliderPrice, Button } from '@/components';
import { BRANDS, AVAILABILITY } from '@/core/constants';

import './CatalogFilters.css';

interface ICatalogFiltersProps {
  activeItems: Record<string, boolean>;
  sliderValue: number;
  onSliderChange: (_event: Event, newValue: number | number[]) => void;
  onToggle: (item: string) => void;
  onApply: () => void;
  onReset: () => void;
}

export const CatalogFilters: FC<ICatalogFiltersProps> = ({
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
        <Accordion title="Brand" items={BRANDS} active={activeItems} onToggle={onToggle} />

        <SliderPrice
          className="catalog__slider"
          value={sliderValue}
          min={200}
          max={250000}
          onChange={onSliderChange}
        />

        <Accordion
          title="Availability"
          items={AVAILABILITY}
          active={activeItems}
          onToggle={onToggle}
        />

        <div className="catalog__filters-buttons">
          <Button
            maxWidth="145px"
            height="40px"
            fontSize="20px"
            fontWeight={400}
            textTransform="uppercase"
            onClick={onReset}
          >
            Reset
          </Button>
          <Button
            maxWidth="145px"
            height="40px"
            fontSize="20px"
            fontWeight={400}
            textTransform="uppercase"
            onClick={onApply}
          >
            Apply
          </Button>
        </div>
      </Box>
    </aside>
  );
};
