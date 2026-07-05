import { LabeledFormField } from '@/components';
import type { IAdminProductFormState } from '@/core/types';
import {
  formatAdminBatteryCapacityInput,
  formatAdminCpuInput,
  formatAdminFrontCameraInput,
  formatAdminMainCameraInput,
  formatAdminScreenSizeInput,
} from '@/core/utils';

import './AdminProductModalFields.css';

interface IProps {
  values: IAdminProductFormState;
  editDescriptionLabel?: string;
  fieldErrors?: Partial<Record<keyof IAdminProductFormState, string>>;
  fieldTooltips?: Partial<Record<keyof IAdminProductFormState, string>>;
  onValueChange: (field: keyof IAdminProductFormState, value: string) => void;
}

export const AdminProductModalFields = ({
  values,
  editDescriptionLabel,
  fieldErrors,
  fieldTooltips,
  onValueChange,
}: IProps) => (
  <>
    <LabeledFormField
      className="admin-product-modal-fields__full"
      label="Product name"
      required
      value={values.name}
      placeholder="Enter the product name"
      errorMessage={fieldErrors?.name}
      tooltipText={fieldTooltips?.name}
      onChange={(value) => onValueChange('name', value)}
    />

    <LabeledFormField
      label="Brand"
      required
      value={values.brand}
      placeholder="Enter the brand"
      errorMessage={fieldErrors?.brand}
      tooltipText={fieldTooltips?.brand}
      onChange={(value) => onValueChange('brand', value)}
    />

    <LabeledFormField
      label="Release year"
      required
      type="number"
      min="0"
      value={values.releaseYear}
      placeholder="2026"
      errorMessage={fieldErrors?.releaseYear}
      tooltipText={fieldTooltips?.releaseYear}
      onChange={(value) => onValueChange('releaseYear', value)}
    />

    <LabeledFormField
      label="CPU"
      required
      value={values.cpu}
      placeholder="Snapdragon 8 Gen 3"
      errorMessage={fieldErrors?.cpu}
      tooltipText={fieldTooltips?.cpu}
      onChange={(value) => onValueChange('cpu', formatAdminCpuInput(value))}
    />

    <LabeledFormField
      label="Cores number"
      required
      type="number"
      min="1"
      value={values.coresNumber}
      placeholder="8"
      errorMessage={fieldErrors?.coresNumber}
      tooltipText={fieldTooltips?.coresNumber}
      onChange={(value) => onValueChange('coresNumber', value)}
    />

    <LabeledFormField
      label="Screen size"
      required
      value={values.screenSize}
      placeholder="6.8"
      errorMessage={fieldErrors?.screenSize}
      tooltipText={fieldTooltips?.screenSize}
      onChange={(value) => onValueChange('screenSize', formatAdminScreenSizeInput(value))}
    />

    <LabeledFormField
      label="Front camera"
      required
      value={values.frontCamera}
      placeholder="12"
      errorMessage={fieldErrors?.frontCamera}
      tooltipText={fieldTooltips?.frontCamera}
      onChange={(value) => onValueChange('frontCamera', formatAdminFrontCameraInput(value))}
    />

    <LabeledFormField
      label="Main camera"
      required
      value={values.mainCamera}
      placeholder="64-12-12"
      errorMessage={fieldErrors?.mainCamera}
      tooltipText={fieldTooltips?.mainCamera}
      onChange={(value) => onValueChange('mainCamera', formatAdminMainCameraInput(value))}
    />

    <LabeledFormField
      label="Battery capacity"
      required
      value={values.batteryCapacity}
      placeholder="5000"
      errorMessage={fieldErrors?.batteryCapacity}
      tooltipText={fieldTooltips?.batteryCapacity}
      onChange={(value) => onValueChange('batteryCapacity', formatAdminBatteryCapacityInput(value))}
    />

    <LabeledFormField
      className="admin-product-modal-fields__full"
      label={editDescriptionLabel ?? 'Description'}
      value={values.description}
      placeholder="Enter a product description"
      errorMessage={fieldErrors?.description}
      tooltipText={fieldTooltips?.description}
      multiline
      rows={5}
      onChange={(value) => onValueChange('description', value)}
    />
  </>
);
