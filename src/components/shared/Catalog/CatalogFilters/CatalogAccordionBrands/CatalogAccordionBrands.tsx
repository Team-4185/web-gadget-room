import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';

import ExpandIcon from '/icons/ExpandMore.svg';
import { BRANDS } from '@/core/constants';
import type { BrandKey } from '@/core/types';
import { CheckBox } from '@/components/ui';

import './CatalogAccordionBrands.css';

interface CatalogAccordionBrandsProps {
  brands?: BrandKey[];
  active: Record<BrandKey, boolean>;
  onToggle: (brand: BrandKey) => void;
  defaultExpanded?: boolean;
  className?: string;
}

export const CatalogAccordionBrands = ({
  active,
  onToggle,
  defaultExpanded = true,
  className = 'catalog__accordion',
}: CatalogAccordionBrandsProps) => {
  return (
    <Accordion defaultExpanded={defaultExpanded} className={className}>
      <AccordionSummary
        expandIcon={<img src={ExpandIcon} alt="Expand" />}
        className="catalog__accordion-summary"
      >
        <span className="catalog__accordion-title">Brand</span>
      </AccordionSummary>

      <AccordionDetails
        className="catalog__accordion-details"
        onClickCapture={(e) => e.stopPropagation()}
      >
        {BRANDS.map((brand) => {
          const isActive = active[brand];

          return (
            <CheckBox
              key={brand}
              id={brand}
              name={brand}
              label={brand.charAt(0).toUpperCase() + brand.slice(1)}
              checked={isActive}
              className="checkbox_small"
              onChange={() => onToggle(brand)}
            />
          );
        })}
      </AccordionDetails>
    </Accordion>
  );
};
