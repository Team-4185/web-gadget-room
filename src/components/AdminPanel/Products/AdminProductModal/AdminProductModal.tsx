import { useEffect, type ChangeEvent } from 'react';
import { Typography } from '@mui/material';

import { LabeledFormField } from '@/components/shared';
import './AdminProductModal.css';

export interface IAdminProductFormState {
  name: string;
  sku: string;
  brand: string;
  price: string;
  stock: string;
  releaseYear: string;
  cpu: string;
  coresNumber: string;
  screenSize: string;
  frontCamera: string;
  mainCamera: string;
  batteryCapacity: string;
  description: string;
}

interface IProps {
  isOpen: boolean;
  title: string;
  submitLabel: string;
  imageName: string;
  values: IAdminProductFormState;
  uploadLabel?: string;
  editDescriptionLabel?: string;
  fieldErrors?: Partial<Record<keyof IAdminProductFormState, string>>;
  fieldTooltips?: Partial<Record<keyof IAdminProductFormState, string>>;
  onClose: () => void;
  onSave: () => void;
  onValueChange: (field: keyof IAdminProductFormState, value: string) => void;
  onImageChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const AdminProductModal = ({
  isOpen,
  title,
  submitLabel,
  imageName,
  values,
  uploadLabel,
  editDescriptionLabel,
  fieldErrors,
  fieldTooltips,
  onClose,
  onSave,
  onValueChange,
  onImageChange,
}: IProps) => {
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', onKeyDown);

    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="admin-product-modal__backdrop" role="presentation">
      <div
        className="admin-product-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="admin-product-modal-title"
      >
        <div className="admin-product-modal__header">
          <Typography
            id="admin-product-modal-title"
            component="h3"
            sx={{ fontSize: '44px', fontWeight: 600, lineHeight: 1 }}
          >
            {title}
          </Typography>
          <button
            type="button"
            aria-label="Close product modal"
            className="admin-product-modal__close"
            onClick={onClose}
          >
            x
          </button>
        </div>

        <form className="admin-product-modal__form" onSubmit={(event) => event.preventDefault()}>
          <LabeledFormField
            className="admin-product-modal__field--full"
            label="Product name"
            required
            value={values.name}
            placeholder="Enter the product name"
            errorMessage={fieldErrors?.name}
            tooltipText={fieldTooltips?.name}
            onChange={(value) => onValueChange('name', value)}
          />

          <LabeledFormField
            label="SKU"
            required
            value={values.sku}
            placeholder="XXX-XX-XXX"
            errorMessage={fieldErrors?.sku}
            tooltipText={fieldTooltips?.sku}
            onChange={(value) => onValueChange('sku', value)}
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
            label="Price (EUR)"
            required
            type="number"
            min="0"
            step="1"
            value={values.price}
            placeholder="0.00"
            errorMessage={fieldErrors?.price}
            tooltipText={fieldTooltips?.price}
            onChange={(value) => onValueChange('price', value)}
          />

          <LabeledFormField
            label="In stock"
            required
            type="number"
            min="0"
            step="1"
            value={values.stock}
            placeholder="0"
            errorMessage={fieldErrors?.stock}
            tooltipText={fieldTooltips?.stock}
            onChange={(value) => onValueChange('stock', value)}
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
            onChange={(value) => onValueChange('cpu', value)}
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
            placeholder='6.8"'
            errorMessage={fieldErrors?.screenSize}
            tooltipText={fieldTooltips?.screenSize}
            onChange={(value) => onValueChange('screenSize', value)}
          />

          <LabeledFormField
            label="Front camera"
            required
            value={values.frontCamera}
            placeholder="12 MP"
            errorMessage={fieldErrors?.frontCamera}
            tooltipText={fieldTooltips?.frontCamera}
            onChange={(value) => onValueChange('frontCamera', value)}
          />

          <LabeledFormField
            label="Main camera"
            required
            value={values.mainCamera}
            placeholder="64-12-12 MP"
            errorMessage={fieldErrors?.mainCamera}
            tooltipText={fieldTooltips?.mainCamera}
            onChange={(value) => onValueChange('mainCamera', value)}
          />

          <LabeledFormField
            label="Battery capacity"
            required
            value={values.batteryCapacity}
            placeholder="5000 mAh"
            errorMessage={fieldErrors?.batteryCapacity}
            tooltipText={fieldTooltips?.batteryCapacity}
            onChange={(value) => onValueChange('batteryCapacity', value)}
          />

          <LabeledFormField
            className="admin-product-modal__field--full"
            label={editDescriptionLabel ?? 'Description'}
            value={values.description}
            placeholder="Enter a product description"
            errorMessage={fieldErrors?.description}
            tooltipText={fieldTooltips?.description}
            multiline
            rows={5}
            onChange={(value) => onValueChange('description', value)}
          />

          <label className="admin-product-modal__upload">
            <span>{uploadLabel}</span>
            <input type="file" accept="image/*" onChange={onImageChange} />
            <div className="admin-product-modal__upload-inner">
              <span className="admin-product-modal__upload-plus">+</span>
              <p>{imageName || 'Click or drop an image here'}</p>
            </div>
          </label>
        </form>

        <div className="admin-product-modal__actions">
          <button type="button" className="admin-product-modal__button" onClick={onClose}>
            Cancel
          </button>
          <button
            type="button"
            className="admin-product-modal__button admin-product-modal__button--primary"
            onClick={onSave}
          >
            {submitLabel}
          </button>
        </div>
      </div>
    </div>
  );
};
