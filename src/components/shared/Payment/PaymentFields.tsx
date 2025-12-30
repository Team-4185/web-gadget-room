import { Box, MenuItem } from '@mui/material';

import { Input } from '../../ui/Input/Input';
import { MONTHS } from '../../../core/constants/Payment/payment';

type Fields = 'cardNumber' | 'nameOnCard' | 'month' | 'year' | 'cvv';

type PaymentFieldsProps = {
  values: Record<Fields, string>;
  errors?: Partial<Record<Fields, string>>;
  years: number[];
  onChange: (field: Fields, value: string) => void;
  ids: { cardNumber: string; nameOnCard: string };
};

export const PaymentFields = ({
  values,
  errors = {},
  years,
  onChange,
  ids,
}: PaymentFieldsProps) => {
  return (
    <Box className="accordion-content">
      <Input
        inherit
        id={ids.cardNumber}
        label="Card Number"
        value={values.cardNumber}
        onChange={(e) => onChange('cardNumber', e.target.value)}
        error={Boolean(errors.cardNumber)}
        helperText={errors.cardNumber}
        inputProps={{ inputMode: 'numeric' }}
      />

      <Input
        inherit
        id={ids.nameOnCard}
        label="Name on card"
        value={values.nameOnCard}
        onChange={(e) => onChange('nameOnCard', e.target.value)}
        error={Boolean(errors.nameOnCard)}
        helperText={errors.nameOnCard}
      />

      <Box className="accordion-row">
        <Input
          className="month"
          inherit
          select
          label="Month"
          value={values.month}
          onChange={(e) => onChange('month', String(e.target.value))}
          error={Boolean(errors.month)}
          helperText={errors.month}
        >
          {MONTHS.map((m) => (
            <MenuItem key={m.id} value={m.value}>
              {m.name}
            </MenuItem>
          ))}
        </Input>

        <Input
          className="year"
          inherit
          select
          label="Year"
          value={values.year}
          onChange={(e) => onChange('year', String(e.target.value))}
          error={Boolean(errors.year)}
          helperText={errors.year}
        >
          {years.map((y) => (
            <MenuItem key={y} value={String(y)}>
              {y}
            </MenuItem>
          ))}
        </Input>

        <Input
          inherit
          label="CVV"
          value={values.cvv}
          onChange={(e) => onChange('cvv', e.target.value)}
          error={Boolean(errors.cvv)}
          helperText={errors.cvv}
          inputProps={{ inputMode: 'numeric' }}
        />
      </Box>
    </Box>
  );
};
