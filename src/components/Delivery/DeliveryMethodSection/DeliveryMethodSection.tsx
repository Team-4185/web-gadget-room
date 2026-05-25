import { Typography } from '@mui/material';

import { Button, Input, RadioButton, Select } from '@/components';
import { Map } from '@/assets';
import type {
  BranchSelectionMap,
  CourierAddressForm,
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
  courierAddress: CourierAddressForm;
  onCourierAddressChange: (field: keyof CourierAddressForm, value: string) => void;
};

export const DeliveryMethodSection = ({
  deliveryMethod,
  onDeliveryMethodChange,
  options,
  branchByMethod,
  onBranchChange,
  branchesByMethod,
  courierAddress,
  onCourierAddressChange,
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
                {option.id === 'courier' ? (
                  <div className="delivery-method-section__address">
                    <div className="delivery-method-section__address-row">
                      <Input
                        value={courierAddress.city}
                        onChange={(e) => onCourierAddressChange('city', e.target.value)}
                        label="City"
                        sx={{ maxWidth: '100%' }}
                        required
                      />
                      <Input
                        value={courierAddress.street}
                        onChange={(e) => onCourierAddressChange('street', e.target.value)}
                        label="Street"
                        sx={{ maxWidth: '100%' }}
                        required
                      />
                    </div>
                    <div className="delivery-method-section__address-row delivery-method-section__address-row--three">
                      <Input
                        value={courierAddress.houseNumber}
                        onChange={(e) => onCourierAddressChange('houseNumber', e.target.value)}
                        label="House"
                        sx={{ maxWidth: '100%' }}
                        required
                      />
                      <Input
                        value={courierAddress.apartmentNumber}
                        onChange={(e) => onCourierAddressChange('apartmentNumber', e.target.value)}
                        label="Apartment"
                        sx={{ maxWidth: '100%' }}
                      />
                      <Input
                        value={courierAddress.zipCode}
                        onChange={(e) => onCourierAddressChange('zipCode', e.target.value)}
                        label="ZIP code"
                        sx={{ maxWidth: '100%' }}
                        required
                      />
                    </div>
                    <Input
                      value={courierAddress.country}
                      onChange={(e) => onCourierAddressChange('country', e.target.value)}
                      label="Country"
                      sx={{ maxWidth: '100%' }}
                      required
                    />
                  </div>
                ) : (
                  <>
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
                  </>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
