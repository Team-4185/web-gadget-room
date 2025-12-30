import { Accordion, AccordionDetails, AccordionSummary, Box } from '@mui/material';
import Rectangle from '/icons/greyRectangle.svg';
import RadioActive from '/icons/RadioActive.svg';
import RadioInactive from '/icons/RadioInactive.svg';

import { PaymentFields } from './PaymentFields';
import type { PaymentFieldIds, PaymentMethod } from '../../../core/types/Payment/payment';

type PaymentMethodAccordionProps = {
  method: PaymentMethod;
  title: string;
  iconCount: number;
  className?: string;

  selectedMethod: PaymentMethod;
  onSelect: (method: PaymentMethod) => void;

  ids: PaymentFieldIds;
  years: number[];

  values: {
    cardNumber: string;
    nameOnCard: string;
    month: string;
    year: string;
    cvv: string;
  };
  errors?: Partial<Record<'cardNumber' | 'nameOnCard' | 'month' | 'year' | 'cvv', string>>;
  onChange: (field: 'cardNumber' | 'nameOnCard' | 'month' | 'year' | 'cvv', value: string) => void;
};

export const PaymentMethodAccordion = ({
  method,
  title,
  iconCount,
  className,
  selectedMethod,
  onSelect,
  ids,
  years,
  values,
  errors,
  onChange,
}: PaymentMethodAccordionProps) => {
  const isActive = selectedMethod === method;

  return (
    <Accordion
      className={className}
      disableGutters
      expanded={isActive}
      onChange={() => onSelect(method)}
    >
      <AccordionSummary
        className="accordion-summary"
        aria-controls={`panel-${method}-content`}
        id={`panel-${method}-header`}
      >
        <Box className="accordion-header">
          <Box className="accordion-radio">
            <img src={isActive ? RadioActive : RadioInactive} alt="radio" />
            <span className="accordion-label">{title}</span>
          </Box>

          <Box className="accordion-icons">
            {Array.from({ length: iconCount }).map((_, idx) => (
              <img key={idx} src={Rectangle} alt="rectangle" />
            ))}
          </Box>
        </Box>
      </AccordionSummary>

      <AccordionDetails>
        <PaymentFields
          ids={ids}
          values={values}
          errors={errors}
          years={years}
          onChange={onChange}
        />
      </AccordionDetails>
    </Accordion>
  );
};
