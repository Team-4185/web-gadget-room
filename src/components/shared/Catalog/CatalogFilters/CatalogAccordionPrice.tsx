import { Accordion, AccordionDetails, AccordionSummary, Box, Slider } from '@mui/material';

import ExpandIcon from '/icons/ExpandMore.svg';

interface CatalogAccordionPriceProps {
  value: number;
  min?: number;
  max?: number;
  step?: number;
  onChange: (_event: Event, value: number | number[]) => void;
  defaultExpanded?: boolean;
  className?: string;
}

export const CatalogAccordionPrice = ({
  value,
  min = 299,
  max = 2000,
  step = 10,
  onChange,
  defaultExpanded = true,
  className = 'catalog-accordion',
}: CatalogAccordionPriceProps) => {
  return (
    <Accordion defaultExpanded={defaultExpanded} className={className}>
      <AccordionSummary
        expandIcon={<img src={ExpandIcon} alt="Expand" />}
        className="catalog-accordion-summary"
      >
        <span className="accordion-title">Price</span>
      </AccordionSummary>

      <AccordionDetails className="catalog-accordion-details price-details">
        <Box className="price-values">
          <span>€ {value}</span>
          <span>€ {max}</span>
        </Box>

        <Slider
          value={value}
          onChange={onChange}
          min={min}
          max={max}
          step={step}
          size="small"
          valueLabelDisplay="auto"
          className="price-slider"
        />
      </AccordionDetails>
    </Accordion>
  );
};
