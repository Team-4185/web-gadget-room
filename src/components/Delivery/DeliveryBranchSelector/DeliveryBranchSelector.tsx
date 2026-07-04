import { Button, Select } from '@/components';
import { Map } from '@/assets';
import type { DeliveryBranchOption, DeliveryMethod } from '@/core/types';

import './DeliveryBranchSelector.css';

type DeliveryBranchSelectorProps = {
  method: DeliveryMethod;
  selectedBranch: string;
  branches: DeliveryBranchOption[];
  hasSelectedRegion: boolean;
  isLoading?: boolean;
  hasFailed?: boolean;
  error?: Partial<Record<DeliveryMethod, string>>;
  onBranchChange: (method: DeliveryMethod, branch: string) => void;
  onOpenMap: (method: DeliveryMethod) => void;
};

export const DeliveryBranchSelector = ({
  method,
  selectedBranch,
  branches,
  hasSelectedRegion,
  isLoading,
  hasFailed,
  error,
  onBranchChange,
  onOpenMap,
}: DeliveryBranchSelectorProps) => (
  <>
    <Select
      data={hasSelectedRegion ? branches : []}
      maxWidth="330px"
      height="44px"
      color="var(--black)"
      fontSize="16px"
      value={selectedBranch}
      onChange={(value) => onBranchChange(method, value)}
      placeholder={
        hasSelectedRegion
          ? isLoading
            ? 'Loading branches...'
            : 'Select the appropriate branch'
          : 'Select region first'
      }
      styleVariant="subtleBorder"
      error={Boolean(error?.[method])}
    />
    <Button
      type="button"
      maxWidth="233px"
      height="44px"
      borderRadius="8px"
      disabled={!hasSelectedRegion || Boolean(isLoading)}
      onClick={() => onOpenMap(method)}
    >
      <div className="delivery-branch-selector__map-btn">
        <Map width={18} height={18} fill="currentColor" />
        <span>Select on the map</span>
      </div>
    </Button>
    {!hasSelectedRegion && (
      <p className="delivery-branch-selector__message">Please select region first.</p>
    )}
    {hasSelectedRegion && hasFailed && (
      <p className="delivery-branch-selector__message">
        Branch map data is unavailable. Static branches are shown.
      </p>
    )}
  </>
);
