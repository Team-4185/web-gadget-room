import { useEffect, useMemo, useRef, useState, type MutableRefObject } from 'react';
import { Typography } from '@mui/material';
import { divIcon, type LatLngBoundsExpression, type Marker as LeafletMarker } from 'leaflet';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import { useModalLifecycle } from '@/core/hooks';
import type {
  DeliveryBranchOption,
  DeliveryMethod,
  DeliveryOptionConfig,
  DeliveryRegionMapConfig,
} from '@/core/types';

import './DeliveryBranchMapModal.css';

type DeliveryBranchMapModalProps = {
  method: DeliveryMethod;
  option: DeliveryOptionConfig;
  region: DeliveryRegionMapConfig;
  branches: DeliveryBranchOption[];
  selectedBranch: string;
  onClose: () => void;
  onSelect: (method: DeliveryMethod, branch: string) => void;
};

const markerIcon = divIcon({
  className: 'delivery-branch-map-modal__leaflet-marker',
  html: '<span></span>',
  iconSize: [28, 28],
  iconAnchor: [14, 14],
});

const selectedMarkerIcon = divIcon({
  className:
    'delivery-branch-map-modal__leaflet-marker delivery-branch-map-modal__leaflet-marker--selected',
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

type FocusBranchProps = {
  branch?: DeliveryBranchOption;
  markerRefs: MutableRefObject<Record<string, LeafletMarker | null>>;
};

const FocusBranch = ({ branch, markerRefs }: FocusBranchProps) => {
  const map = useMap();

  useEffect(() => {
    if (!branch || typeof branch.lat !== 'number' || typeof branch.lon !== 'number') return;

    map.flyTo([branch.lat, branch.lon], Math.max(map.getZoom(), 16), {
      animate: true,
      duration: 0.6,
    });

    window.setTimeout(() => {
      markerRefs.current[branch.value]?.openPopup();
    }, 650);
  }, [branch, map, markerRefs]);

  return null;
};

export const DeliveryBranchMapModal = ({
  method,
  option,
  region,
  branches,
  selectedBranch,
  onClose,
  onSelect,
}: DeliveryBranchMapModalProps) => {
  const [focusedBranchValue, setFocusedBranchValue] = useState(selectedBranch);
  const markerRefs = useRef<Record<string, LeafletMarker | null>>({});

  const mapBranches = useMemo(
    () =>
      branches.filter((branch) => typeof branch.lat === 'number' && typeof branch.lon === 'number'),
    [branches]
  );
  const focusedBranch = mapBranches.find((branch) => branch.value === focusedBranchValue);

  useModalLifecycle({
    isOpen: true,
    onClose,
  });

  useEffect(() => {
    setFocusedBranchValue(selectedBranch);
  }, [selectedBranch]);

  const handleSelect = (branch: string) => {
    onSelect(method, branch);
  };

  const handleBranchFocus = (branch: DeliveryBranchOption) => {
    if (typeof branch.lat !== 'number' || typeof branch.lon !== 'number') {
      handleSelect(branch.value);
      return;
    }

    setFocusedBranchValue(branch.value);
  };

  return (
    <div className="delivery-branch-map-modal__backdrop" role="presentation">
      <section
        className="delivery-branch-map-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="delivery-map-modal-title"
      >
        <header className="delivery-branch-map-modal__header">
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
              {option.title} - {region.name}
            </p>
          </div>
          <button
            type="button"
            aria-label="Close branch map"
            className="delivery-branch-map-modal__close"
            onClick={onClose}
          >
            x
          </button>
        </header>

        <div className="delivery-branch-map-modal__content">
          <div className="delivery-branch-map-modal__canvas">
            <MapContainer
              center={region.center}
              zoom={10}
              scrollWheelZoom
              className="delivery-branch-map-modal__leaflet-map"
            >
              <RegionBounds bounds={region.bounds} />
              <FocusBranch branch={focusedBranch} markerRefs={markerRefs} />
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {mapBranches.map((branch) => {
                const isSelected = selectedBranch === branch.value;

                return (
                  <Marker
                    key={branch.value}
                    ref={(marker) => {
                      markerRefs.current[branch.value] = marker;
                    }}
                    position={[branch.lat as number, branch.lon as number]}
                    icon={isSelected ? selectedMarkerIcon : markerIcon}
                    eventHandlers={{
                      click: () => setFocusedBranchValue(branch.value),
                    }}
                  >
                    <Popup>
                      <div className="delivery-branch-map-modal__popup">
                        <strong>{branch.name}</strong>
                        {branch.address && <span>{branch.address}</span>}
                        <button type="button" onClick={() => handleSelect(branch.value)}>
                          Select branch
                        </button>
                      </div>
                    </Popup>
                  </Marker>
                );
              })}
            </MapContainer>
            {!mapBranches.length && (
              <div className="delivery-branch-map-modal__empty">
                No map points found for this region. Use the branch list.
              </div>
            )}
          </div>

          <div className="delivery-branch-map-modal__list">
            {mapBranches.map((branch) => {
              const isSelected = selectedBranch === branch.value;

              return (
                <button
                  key={branch.value}
                  type="button"
                  className="delivery-branch-map-modal__list-item"
                  data-selected={isSelected || undefined}
                  data-focused={focusedBranchValue === branch.value || undefined}
                  onClick={() => handleBranchFocus(branch)}
                >
                  <span>{branch.name}</span>
                  <small>
                    {branch.address ?? (branch.source === 'osm' ? 'OpenStreetMap' : 'Fallback')}
                  </small>
                </button>
              );
            })}
            {!mapBranches.length &&
              branches.map((branch) => {
                const isSelected = selectedBranch === branch.value;

                return (
                  <button
                    key={branch.value}
                    type="button"
                    className="delivery-branch-map-modal__list-item"
                    data-selected={isSelected || undefined}
                    onClick={() => handleSelect(branch.value)}
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
  );
};
