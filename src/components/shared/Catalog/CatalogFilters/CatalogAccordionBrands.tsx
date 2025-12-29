import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';

import ExpandIcon from '/icons/ExpandMore.svg';
import RadioActive from '/icons/RadioActive.svg';
import RadioInactive from '/icons/RadioInactive.svg';

import type { Brand } from '../../../../core/types/Catalog/catalog';

interface CatalogAccordionBrandsProps {
  brands?: Brand[];
  active: Record<Brand, boolean>;
  onToggle: (brand: Brand) => void;
  defaultExpanded?: boolean;
  className?: string;
}

export const CatalogAccordionBrands = ({
  brands = ['apple', 'samsung', 'xiaomi', 'oneplus', 'honor', 'poco'],
  active,
  onToggle,
  defaultExpanded = true,
  className = 'catalog-accordion',
}: CatalogAccordionBrandsProps) => {
  return (
    <Accordion defaultExpanded={defaultExpanded} className={className}>
      <AccordionSummary
        expandIcon={<img src={ExpandIcon} alt="Expand" />}
        className="catalog-accordion-summary"
      >
        <span className="accordion-title">Brand</span>
      </AccordionSummary>

      <AccordionDetails className="catalog-accordion-details">
        {brands.map((brand) => {
          const isActive = active[brand];

          return (
            <form
              key={brand}
              className="filter-form"
              onClick={() => onToggle(brand)}
              onSubmit={(e) => e.preventDefault()}
            >
              <img src={isActive ? RadioActive : RadioInactive} alt="Radio button" />
              <span className="filter-label">{brand.charAt(0).toUpperCase() + brand.slice(1)}</span>
            </form>
          );
        })}
      </AccordionDetails>
    </Accordion>
  );
};
