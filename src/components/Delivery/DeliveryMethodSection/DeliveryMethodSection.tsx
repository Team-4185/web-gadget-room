import { useCallback, useState } from 'react';
import { Typography } from '@mui/material';
import type { FieldError } from 'react-hook-form';

import { Input, RadioButton } from '@/components';
import { UKRAINE_REGION_MAP_CONFIG } from '@/core/constants';
import { useDeliveryBranches } from '@/core/hooks';
import type {
  BranchSelectionMap,
  CourierAddressForm,
  DeliveryCheckoutErrors,
  DeliveryBranchesMap,
  DeliveryMethod,
  DeliveryOptionConfig,
} from '@/core/types';

import { DeliveryBranchMapModal } from '../DeliveryBranchMapModal/DeliveryBranchMapModal';
import { DeliveryBranchSelector } from '../DeliveryBranchSelector/DeliveryBranchSelector';

import './DeliveryMethodSection.css';

type DeliveryMethodSectionProps = {
  deliveryMethod: DeliveryMethod;
  onDeliveryMethodChange: (method: DeliveryMethod) => void;
  options: DeliveryOptionConfig[];
  region: string;
  branchByMethod: BranchSelectionMap;
  errors?: DeliveryCheckoutErrors['delivery'];
  onBranchChange: (method: DeliveryMethod, branch: string) => void;
  branchesByMethod: DeliveryBranchesMap;
  courierAddress: CourierAddressForm;
  onCourierAddressChange: (field: keyof CourierAddressForm, value: string) => void;
};

const toFieldError = (message?: string): FieldError | undefined =>
  message ? { type: 'manual', message } : undefined;

export const DeliveryMethodSection = ({
  deliveryMethod,
  onDeliveryMethodChange,
  options,
  region,
  branchByMethod,
  errors,
  onBranchChange,
  branchesByMethod,
  courierAddress,
  onCourierAddressChange,
}: DeliveryMethodSectionProps) => {
  const [mapMethod, setMapMethod] = useState<DeliveryMethod | null>(null);

  const selectedMapOption = options.find((option) => option.id === mapMethod);
  const selectedRegion = UKRAINE_REGION_MAP_CONFIG[region];
  const { failedMethods, getBranchesForMethod, loadingMethods } = useDeliveryBranches({
    fallbackBranchesByMethod: branchesByMethod,
    options,
    region,
  });

  const closeMap = useCallback(() => {
    setMapMethod(null);
  }, []);

  const handleMapBranchSelect = (method: DeliveryMethod, branch: string) => {
    onBranchChange(method, branch);
    closeMap();
  };

  const handleOpenMap = (method: DeliveryMethod) => {
    if (!selectedRegion) return;

    setMapMethod(method);
  };

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
                        error={toFieldError(errors?.courierAddress?.city)}
                        required
                      />
                      <Input
                        value={courierAddress.street}
                        onChange={(e) => onCourierAddressChange('street', e.target.value)}
                        label="Street"
                        sx={{ maxWidth: '100%' }}
                        error={toFieldError(errors?.courierAddress?.street)}
                        required
                      />
                    </div>
                    <div className="delivery-method-section__address-row delivery-method-section__address-row--three">
                      <Input
                        value={courierAddress.houseNumber}
                        onChange={(e) => onCourierAddressChange('houseNumber', e.target.value)}
                        label="House"
                        sx={{ maxWidth: '100%' }}
                        error={toFieldError(errors?.courierAddress?.houseNumber)}
                        required
                      />
                      <Input
                        value={courierAddress.apartmentNumber}
                        onChange={(e) => onCourierAddressChange('apartmentNumber', e.target.value)}
                        label="Apartment"
                        sx={{ maxWidth: '100%' }}
                        error={toFieldError(errors?.courierAddress?.apartmentNumber)}
                      />
                      <Input
                        value={courierAddress.zipCode}
                        onChange={(e) => onCourierAddressChange('zipCode', e.target.value)}
                        label="ZIP code"
                        sx={{ maxWidth: '100%' }}
                        error={toFieldError(errors?.courierAddress?.zipCode)}
                        required
                      />
                    </div>
                    <Input
                      value={courierAddress.country}
                      onChange={(e) => onCourierAddressChange('country', e.target.value)}
                      label="Country"
                      sx={{ maxWidth: '100%' }}
                      error={toFieldError(errors?.courierAddress?.country)}
                      required
                    />
                  </div>
                ) : (
                  <DeliveryBranchSelector
                    method={option.id}
                    selectedBranch={branchByMethod[option.id]}
                    branches={getBranchesForMethod(option.id)}
                    hasSelectedRegion={Boolean(selectedRegion)}
                    isLoading={loadingMethods[option.id]}
                    hasFailed={failedMethods[option.id]}
                    error={errors?.branchByMethod}
                    onBranchChange={onBranchChange}
                    onOpenMap={handleOpenMap}
                  />
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {mapMethod && selectedMapOption && selectedRegion && (
        <DeliveryBranchMapModal
          method={mapMethod}
          option={selectedMapOption}
          region={selectedRegion}
          branches={getBranchesForMethod(mapMethod)}
          selectedBranch={branchByMethod[mapMethod]}
          onClose={closeMap}
          onSelect={handleMapBranchSelect}
        />
      )}
    </div>
  );
};
