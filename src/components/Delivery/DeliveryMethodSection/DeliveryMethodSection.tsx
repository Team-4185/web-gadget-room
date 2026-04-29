import { Typography } from '@mui/material';

import { Button, RadioButton, Select } from '@/components';
import { Map } from '@/assets';
import type {
  BranchSelectionMap,
  DeliveryBranchesMap,
  DeliveryMethod,
  DeliveryOptionConfig,
} from '@/core/types';

import './DeliveryMethodSection.css';

type DeliveryMethodSectionProps = {
  deliveryMethod: DeliveryMethod;
  onDeliveryMethodChange: (method: DeliveryMethod) => void;
  options: DeliveryOptionConfig[];
  branchByMethod: BranchSelectionMap;
  onBranchChange: (method: DeliveryMethod, branch: string) => void;
  branchesByMethod: DeliveryBranchesMap;
};

export const DeliveryMethodSection = ({
  deliveryMethod,
  onDeliveryMethodChange,
  options,
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
        {options.map((option) => (
          <div
            key={option.id}
            className="delivery-method-section__option delivery-method-section__option--expanded"
          >
            <button
              type="button"
              className="delivery-method-section__option-header"
              onClick={() => onDeliveryMethodChange(option.id)}
            >
              <div className="delivery-method-section__option-left">
                <RadioButton checked={deliveryMethod === option.id} />
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  {option.title}
                </Typography>
              </div>
              <Typography variant="body1" sx={{ fontSize: '15px', fontWeight: 500 }}>
                $ {option.price.toFixed(2)}
              </Typography>
            </button>

            {deliveryMethod === option.id && (
              <div className="delivery-method-section__option-details">
                <Select
                  data={branchesByMethod[option.id]}
                  maxWidth="330px"
                  height="44px"
                  color="var(--black)"
                  fontSize="16px"
                  value={branchByMethod[option.id]}
                  onChange={(value) => onBranchChange(option.id, value)}
                  placeholder="Select the appropriate branch"
                  styleVariant="subtleBorder"
                />
                <Button
                  maxWidth="233px"
                  height="44px"
                  borderRadius="8px"
                  border="none"
                  sx={{
                    background: 'var(--blue-violet)',
                    color: 'var(--white)',
                    '&:hover': { background: 'var(--blue-violet)', color: 'var(--white)' },
                  }}
                >
                  <div className="delivery-method-section__map-btn">
                    <Map width={18} height={18} fill="currentColor" />
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
