import { Typography } from '@mui/material';
import type { FieldError } from 'react-hook-form';

import { Input, Select } from '@/components';
import { PROFILE_NAME_TOOLTIP, PROFILE_PHONE_TOOLTIP, UKRAINE_REGIONS } from '@/core/constants';
import type { DeliveryCheckoutErrors, RecipientForm } from '@/core/types';

import './RecipientSection.css';

type RecipientSectionProps = {
  recipient: RecipientForm;
  errors?: DeliveryCheckoutErrors['recipient'];
  onRecipientChange: (field: keyof RecipientForm, value: string) => void;
};

const toFieldError = (message?: string): FieldError | undefined =>
  message ? { type: 'manual', message } : undefined;

export const RecipientSection = ({
  recipient,
  errors,
  onRecipientChange,
}: RecipientSectionProps) => {
  return (
    <div className="recipient-section">
      <Typography variant="h6" component="h2" sx={{ fontSize: '24px', fontWeight: 600 }}>
        Recipient
      </Typography>

      <div className="recipient-section__fields">
        <div className="recipient-section__row">
          <Input
            value={recipient.firstName}
            onChange={(e) => onRecipientChange('firstName', e.target.value)}
            label="First Name"
            tooltipText={PROFILE_NAME_TOOLTIP}
            sx={{ maxWidth: '100%' }}
            error={toFieldError(errors?.firstName)}
            required
          />
          <Input
            value={recipient.lastName}
            onChange={(e) => onRecipientChange('lastName', e.target.value)}
            label="Last Name"
            tooltipText={PROFILE_NAME_TOOLTIP}
            sx={{ maxWidth: '100%' }}
            error={toFieldError(errors?.lastName)}
            required
          />
        </div>

        <div className="recipient-section__row">
          <Input
            value={recipient.email}
            onChange={(e) => onRecipientChange('email', e.target.value)}
            label="Email"
            type="email"
            sx={{ maxWidth: '100%' }}
            error={toFieldError(errors?.email)}
            required
          />
          <Input
            value={recipient.phone}
            onChange={(e) => onRecipientChange('phone', e.target.value)}
            label="Phone"
            tooltipText={PROFILE_PHONE_TOOLTIP}
            sx={{ maxWidth: '100%' }}
            error={toFieldError(errors?.phone)}
            required
          />
        </div>

        <Select
          data={UKRAINE_REGIONS}
          maxWidth="100%"
          height="46px"
          color="var(--black)"
          fontSize="16px"
          selectPadding="12px"
          value={recipient.region}
          styleVariant="subtleBorder"
          onChange={(value) => onRecipientChange('region', value)}
          placeholder="Select region"
          error={Boolean(errors?.region)}
        />
      </div>
    </div>
  );
};
