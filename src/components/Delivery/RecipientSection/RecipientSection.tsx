import { Typography } from '@mui/material';

import { Input, Select } from '@/components';
import { UKRAINE_REGIONS } from '@/core/constants';
import type { RecipientForm } from '@/core/types';

import './RecipientSection.css';

type RecipientSectionProps = {
  recipient: RecipientForm;
  onRecipientChange: (field: keyof RecipientForm, value: string) => void;
};

export const RecipientSection = ({ recipient, onRecipientChange }: RecipientSectionProps) => {
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
            sx={{ maxWidth: '100%' }}
          />
          <Input
            value={recipient.lastName}
            onChange={(e) => onRecipientChange('lastName', e.target.value)}
            label="Last Name"
            sx={{ maxWidth: '100%' }}
          />
        </div>

        <div className="recipient-section__row">
          <Input
            value={recipient.email}
            onChange={(e) => onRecipientChange('email', e.target.value)}
            label="Email"
            type="email"
            sx={{ maxWidth: '100%' }}
          />
          <Input
            value={recipient.phone}
            onChange={(e) => onRecipientChange('phone', e.target.value)}
            label="Phone"
            sx={{ maxWidth: '100%' }}
          />
        </div>

        <Select
          data={UKRAINE_REGIONS}
          maxWidth="100%"
          height="46x"
          color="var(--black)"
          fontSize="16px"
          value={recipient.region}
          onChange={(value) => onRecipientChange('region', value)}
          placeholder="Select Ukraine region"
        />
      </div>
    </div>
  );
};
