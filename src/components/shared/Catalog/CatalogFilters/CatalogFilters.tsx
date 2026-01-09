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
    <aside className="catalog__filters">
      <span className="catalog__filters-title">Filter:</span>

      <Box className="catalog__filters-layout">
        <CatalogAccordionBrands active={activeBrands} onToggle={onToggleBrand} />

        <CatalogAccordionPrice value={sliderValue} onChange={onSliderChange} />

        <CatalogAccordionAvailability
          inStockActive={inStockActive}
          preOrderActive={preOrderActive}
          onToggleInStock={onToggleInStock}
          onTogglePreOrder={onTogglePreOrder}
        />
      </Box>
    </aside>
  );
};
