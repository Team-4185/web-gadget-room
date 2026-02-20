import { MenuItem, Typography } from '@mui/material';

import { Button, Input } from '@/components';
import { NovaPost } from '@/assets';

import RadioActive from '/icons/RadioActive.svg';
import RadioInactive from '/icons/RadioInactive.svg';

import './DeliveryMethodSection.css';

type DeliveryMethod = 'courier' | 'nova' | 'ukr' | 'dhl';

type DeliveryOption = {
  id: DeliveryMethod;
  title: string;
  price: string;
};

type DeliveryMethodSectionProps = {
  deliveryMethod: DeliveryMethod;
  onDeliveryMethodChange: (method: DeliveryMethod) => void;
  branchByMethod: Record<DeliveryMethod, string>;
  onBranchChange: (method: DeliveryMethod, branch: string) => void;
  branchesByMethod: Record<DeliveryMethod, string[]>;
};

const deliveryOptions: DeliveryOption[] = [
  { id: 'courier', title: 'Courier to your address', price: '\u20AC 11.00' },
  { id: 'nova', title: 'Self-pickup from the Nova Post', price: '\u20AC 11.00' },
  { id: 'ukr', title: 'Self-pickup from the Ukr Post', price: '\u20AC 5.00' },
  { id: 'dhl', title: 'Self-pickup from the DHL', price: '\u20AC 30.00' },
];

export const DeliveryMethodSection = ({
  deliveryMethod,
  onDeliveryMethodChange,
  branchByMethod,
  onBranchChange,
  branchesByMethod,
}: DeliveryMethodSectionProps) => {
  return (
    <div className="delivery-method-section">
      <Typography variant="h6" component="h2" sx={{ fontSize: '24px', fontWeight: 600 }}>
        Choose a delivery method
      </Typography>

      <div className="delivery-method-section__options">
        {deliveryOptions.map((option) => (
          <div key={option.id} className="delivery-method-section__option delivery-method-section__option--expanded">
            <button
              type="button"
              className="delivery-method-section__option-header"
              onClick={() => onDeliveryMethodChange(option.id)}
            >
              <div className="delivery-method-section__option-left">
                <img src={deliveryMethod === option.id ? RadioActive : RadioInactive} alt="radio" />
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  {option.title}
                </Typography>
              </div>
              <Typography variant="body1" sx={{ fontSize: '15px', fontWeight: 500 }}>
                {option.price}
              </Typography>
            </button>

            {deliveryMethod === option.id && (
              <div className="delivery-method-section__option-details">
                <Input
                  inherit
                  select
                  value={branchByMethod[option.id]}
                  onChange={(e) => onBranchChange(option.id, String(e.target.value))}
                  className="delivery-method-section__branch"
                  size="small"
                >
                  {branchesByMethod[option.id].map((item) => (
                    <MenuItem key={item} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Input>

                <Button
                  maxWidth="233px"
                  height="44px"
                  textTransform="none"
                  borderRadius="8px"
                  border="none"
                  sx={{
                    boxShadow: 'none',
                    background: 'var(--blue-violet)',
                    color: 'var(--white)',
                    '&:hover': { background: 'var(--blue-violet)', color: 'var(--white)' },
                  }}
                >
                  <div className="delivery-method-section__map-btn">
                    <NovaPost width={18} height={18} />
                    <span>Select on the map</span>
                  </div>
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
