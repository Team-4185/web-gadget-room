import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';

import ExpandIcon from '/icons/ExpandMore.svg';
import RadioActive from '/icons/RadioActive.svg';
import RadioInactive from '/icons/RadioInactive.svg';

interface CatalogAccordionAvailabilityProps {
  inStockActive: boolean;
  preOrderActive: boolean;
  onToggleInStock: () => void;
  onTogglePreOrder: () => void;
  defaultExpanded?: boolean;
  className?: string;
}

export const CatalogAccordionAvailability = ({
  inStockActive,
  preOrderActive,
  onToggleInStock,
  onTogglePreOrder,
  defaultExpanded = true,
  className = 'catalog-accordion',
}: CatalogAccordionAvailabilityProps) => {
  return (
    <Accordion defaultExpanded={defaultExpanded} className={className}>
      <AccordionSummary
        expandIcon={<img src={ExpandIcon} alt="Expand" />}
        className="catalog-accordion-summary"
      >
        <span className="accordion-title">Availability</span>
      </AccordionSummary>

      <AccordionDetails className="catalog-accordion-details">
        <form className="filter-form" onClick={onToggleInStock}>
          <img src={inStockActive ? RadioActive : RadioInactive} alt="Radio button" />
          <span className="filter-label">In stock</span>
        </form>

        <form className="filter-form" onClick={onTogglePreOrder}>
          <img src={preOrderActive ? RadioActive : RadioInactive} alt="Radio button" />
          <span className="filter-label">Pre-order</span>
        </form>
      </AccordionDetails>
    </Accordion>
  );
};
