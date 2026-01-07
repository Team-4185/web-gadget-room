import { Box } from '@mui/material';

import type { BrandKey } from '@/core/types';
import {
  CatalogAccordionAvailability,
  CatalogAccordionBrands,
  CatalogAccordionPrice,
} from '@/components';

interface CatalogFiltersProps {
  activeBrands: Record<BrandKey, boolean>;
  onToggleBrand: (brand: BrandKey) => void;
  sliderValue: number;
  onSliderChange: (_event: Event, newValue: number | number[]) => void;
  inStockActive: boolean;
  preOrderActive: boolean;
  onToggleInStock: () => void;
  onTogglePreOrder: () => void;
}

export const CatalogFilters = ({
  activeBrands,
  onToggleBrand,
  sliderValue,
  onSliderChange,
  inStockActive,
  preOrderActive,
  onToggleInStock,
  onTogglePreOrder,
}: CatalogFiltersProps) => {
  return (
    <Box className="catalog-filters">
      <span className="catalog-filter-title">Filter:</span>

      <Box className="catalog-accordion-list">
        <CatalogAccordionBrands active={activeBrands} onToggle={onToggleBrand} />

        <CatalogAccordionPrice value={sliderValue} onChange={onSliderChange} />

        <CatalogAccordionAvailability
          inStockActive={inStockActive}
          preOrderActive={preOrderActive}
          onToggleInStock={onToggleInStock}
          onTogglePreOrder={onTogglePreOrder}
        />
      </Box>
    </Box>
  );
};
