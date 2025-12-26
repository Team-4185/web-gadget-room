import { Box } from '@mui/material';

import { CatalogAccordionBrands } from './CatalogAccordionBrands';
import { CatalogAccordionPrice } from './CatalogAccordionPrice';
import { CatalogAccordionAvailability } from './CatalogAccordionAvailability';

import type { Brand } from '../../../../core/types/Catalog/catalog.types';

interface CatalogFiltersProps {
  activeBrands: Record<Brand, boolean>;
  onToggleBrand: (brand: Brand) => void;

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
