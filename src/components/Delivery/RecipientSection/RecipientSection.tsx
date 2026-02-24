import { Typography } from '@mui/material';

import { Input } from '@/components';

import './RecipientSection.css';

export const RecipientSection = () => {
  return (
    <div className="recipient-section">
      <Typography variant="h6" component="h2" sx={{ fontSize: '24px', fontWeight: 600 }}>
        Recipient
      </Typography>

      <div className="recipient-section__fields">
        <div className="recipient-section__row">
          <Input inherit className="recipient-section__input" placeholder="First Name" />
          <Input inherit className="recipient-section__input" placeholder="Last Name" />
        </div>

        <div className="recipient-section__row">
          <Input inherit className="recipient-section__input" placeholder="Email" />
          <Input inherit className="recipient-section__input" placeholder="Phone" />
        </div>

        <div className="recipient-section__address">
          <div className="recipient-section__address-left">
            <Typography variant="body1" component="span" sx={{ fontSize: '14px' }}>
              Kiev,Kiev region
            </Typography>
          </div>
          <button className="recipient-section__change" type="button">
            Change
          </button>
        </div>
      </div>
    </div>
  );
};
