import { useEffect, useMemo, useState } from 'react';
import { Typography } from '@mui/material';
import type { FieldError } from 'react-hook-form';
import { divIcon, type LatLngBoundsExpression } from 'leaflet';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import { Button, Input, RadioButton, Select } from '@/components';
import { Map } from '@/assets';
import { UKRAINE_REGION_MAP_CONFIG } from '@/core/constants';
import { deliveryMapService } from '@/core/services';
import type {
  BranchSelectionMap,
  CourierAddressForm,
  DeliveryBranchOption,
  DeliveryBranchProvider,
  DeliveryCheckoutErrors,
  DeliveryBranchesMap,
  DeliveryMethod,
  DeliveryOptionConfig,
} from '@/core/types';

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

const PROVIDER_BY_METHOD: Partial<Record<DeliveryMethod, DeliveryBranchProvider>> = {
  nova: 'NOVA_POSHTA',
  ukr: 'UKR_POSHTA',
};

const markerIcon = divIcon({
  className: 'delivery-method-section__leaflet-marker',
  html: '<span></span>',
  iconSize: [28, 28],
  iconAnchor: [14, 14],
});

const selectedMarkerIcon = divIcon({
  className: 'delivery-method-section__leaflet-marker delivery-method-section__leaflet-marker--selected',
  html: '<span></span>',
  iconSize: [32, 32],
  iconAnchor: [16, 16],
});

const RegionBounds = ({ bounds }: { bounds: LatLngBoundsExpression }) => {
  const map = useMap();

  useEffect(() => {
    map.fitBounds(bounds, { padding: [24, 24] });
  }, [bounds, map]);

  return null;
};

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
  const [loadedBranches, setLoadedBranches] = useState<Partial<Record<DeliveryMethod, DeliveryBranchOption[]>>>(
    {}
  );
  const [loadingMethods, setLoadingMethods] = useState<Partial<Record<DeliveryMethod, boolean>>>({});
  const [failedMethods, setFailedMethods] = useState<Partial<Record<DeliveryMethod, boolean>>>({});

  const selectedMapOption = options.find((option) => option.id === mapMethod);
  const selectedRegion = UKRAINE_REGION_MAP_CONFIG[region];

  const getBranchesForMethod = (method: DeliveryMethod) =>
    loadedBranches[method]?.length ? loadedBranches[method] : branchesByMethod[method];

  const mapBranches = useMemo(
    () =>
      mapMethod
        ? getBranchesForMethod(mapMethod).filter(
            (branch) => typeof branch.lat === 'number' && typeof branch.lon === 'number'
          )
        : [],
    [branchesByMethod, loadedBranches, mapMethod]
  );

  useEffect(() => {
    if (!mapMethod) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMapMethod(null);
    };

    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [mapMethod]);

  useEffect(() => {
    setLoadedBranches({});

    if (!region) {
      setFailedMethods({});
      return;
    }

    const controller = new AbortController();
    const methods = options
      .map((option) => option.id)
      .filter((method): method is 'nova' | 'ukr' => method === 'nova' || method === 'ukr');

    methods.forEach((method) => {
      const provider = PROVIDER_BY_METHOD[method];
      const regionConfig = UKRAINE_REGION_MAP_CONFIG[region];

      if (!provider || !regionConfig) return;

      setLoadingMethods((prev) => ({ ...prev, [method]: true }));
      setFailedMethods((prev) => ({ ...prev, [method]: false }));

      deliveryMapService
        .getBranches(provider, regionConfig, controller.signal)
        .then((branches) => {
          if (controller.signal.aborted) return;

          setLoadedBranches((prev) => ({ ...prev, [method]: branches }));
          setFailedMethods((prev) => ({ ...prev, [method]: !branches.length }));
        })
        .catch(() => {
          if (controller.signal.aborted) return;

          setFailedMethods((prev) => ({ ...prev, [method]: true }));
        })
        .finally(() => {
          if (controller.signal.aborted) return;

          setLoadingMethods((prev) => ({ ...prev, [method]: false }));
        });
    });

    return () => {
      controller.abort();
    };
  }, [options, region]);

  const handleMapBranchSelect = (method: DeliveryMethod, branch: string) => {
    onBranchChange(method, branch);
    setMapMethod(null);
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
                  <>
                    <Select
                      data={selectedRegion ? getBranchesForMethod(option.id) : []}
                      maxWidth="330px"
                      height="44px"
                      color="var(--black)"
                      fontSize="16px"
                      value={branchByMethod[option.id]}
                      onChange={(value) => onBranchChange(option.id, value)}
                      placeholder={
                        selectedRegion
                          ? loadingMethods[option.id]
                            ? 'Loading branches...'
                            : 'Select the appropriate branch'
                          : 'Select region first'
                      }
                      styleVariant="subtleBorder"
                      error={Boolean(errors?.branchByMethod?.[option.id])}
                    />
                    <Button
                      type="button"
                      maxWidth="233px"
                      height="44px"
                      borderRadius="8px"
                      border="none"
                      sx={{
                        background: 'var(--blue-violet)',
                        color: 'var(--white)',
                        '&:hover': { background: 'var(--blue-violet)', color: 'var(--white)' },
                      }}
                      disabled={!selectedRegion || Boolean(loadingMethods[option.id])}
                      onClick={() => handleOpenMap(option.id)}
                    >
                      <div className="delivery-method-section__map-btn">
                        <Map width={18} height={18} fill="currentColor" />
                        <span>Select on the map</span>
                      </div>
                    </Button>
                    {!selectedRegion && (
                      <p className="delivery-method-section__branch-message">
                        Please select region first.
                      </p>
                    )}
                    {selectedRegion && failedMethods[option.id] && (
                      <p className="delivery-method-section__branch-message">
                        Branch map data is unavailable. Static branches are shown.
                      </p>
                    )}
                  </>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {mapMethod && selectedMapOption && selectedRegion && (
        <div className="delivery-method-section__map-modal-backdrop" role="presentation">
          <section
            className="delivery-method-section__map-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="delivery-map-modal-title"
          >
            <header className="delivery-method-section__map-modal-header">
              <div>
                <Typography
                  id="delivery-map-modal-title"
                  component="h3"
                  fontSize="28px"
                  fontWeight={600}
                  lineHeight={1.1}
                >
                  Select branch
                </Typography>
                <p>
                  {selectedMapOption.title} · {selectedRegion.name}
                </p>
              </div>
              <button
                type="button"
                aria-label="Close branch map"
                className="delivery-method-section__map-modal-close"
                onClick={() => setMapMethod(null)}
              >
                x
              </button>
            </header>

            <div className="delivery-method-section__map-modal-content">
              <div className="delivery-method-section__map-canvas">
                <MapContainer
                  center={selectedRegion.center}
                  zoom={10}
                  scrollWheelZoom
                  className="delivery-method-section__leaflet-map"
                >
                  <RegionBounds bounds={selectedRegion.bounds} />
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  {mapBranches.map((branch) => {
                    const isSelected = branchByMethod[mapMethod] === branch.value;

                    return (
                      <Marker
                        key={branch.value}
                        position={[branch.lat as number, branch.lon as number]}
                        icon={isSelected ? selectedMarkerIcon : markerIcon}
                        eventHandlers={{
                          click: () => onBranchChange(mapMethod, branch.value),
                        }}
                      >
                        <Popup>
                          <div className="delivery-method-section__map-popup">
                            <strong>{branch.name}</strong>
                            {branch.address && <span>{branch.address}</span>}
                            <button
                              type="button"
                              onClick={() => handleMapBranchSelect(mapMethod, branch.value)}
                            >
                              Select branch
                            </button>
                          </div>
                        </Popup>
                      </Marker>
                    );
                  })}
                </MapContainer>
                {!mapBranches.length && (
                  <div className="delivery-method-section__map-empty">
                    No map points found for this region. Use the branch list.
                  </div>
                )}
              </div>

              <div className="delivery-method-section__map-list">
                {mapBranches.map((branch) => {
                  const isSelected = branchByMethod[mapMethod] === branch.value;

                  return (
                    <button
                      key={branch.value}
                      type="button"
                      className="delivery-method-section__map-list-item"
                      data-selected={isSelected || undefined}
                      onClick={() => handleMapBranchSelect(mapMethod, branch.value)}
                    >
                      <span>{branch.name}</span>
                      <small>{branch.source === 'osm' ? 'OpenStreetMap' : 'Fallback'}</small>
                    </button>
                  );
                })}
                {!mapBranches.length &&
                  getBranchesForMethod(mapMethod).map((branch) => {
                    const isSelected = branchByMethod[mapMethod] === branch.value;

                    return (
                      <button
                        key={branch.value}
                        type="button"
                        className="delivery-method-section__map-list-item"
                        data-selected={isSelected || undefined}
                        onClick={() => handleMapBranchSelect(mapMethod, branch.value)}
                      >
                        <span>{branch.name}</span>
                        <small>Fallback</small>
                      </button>
                    );
                  })}
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  );
};
