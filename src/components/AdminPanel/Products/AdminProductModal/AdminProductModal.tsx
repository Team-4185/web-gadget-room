import { useEffect, type ChangeEvent } from 'react';
import { Typography } from '@mui/material';

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
    <div className="admin-product-modal__backdrop" role="presentation" onClick={onClose}>
      <div
        className="admin-product-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="admin-product-modal-title"
        onClick={(event) => event.stopPropagation()}
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
          <label className="admin-product-modal__field admin-product-modal__field--full">
            <span>Product name *</span>
            <input
              type="text"
              value={values.name}
              onChange={(event) => onValueChange('name', event.target.value)}
              placeholder="Enter the product name"
            />
          </label>

          <label className="admin-product-modal__field">
            <span>SKU *</span>
            <input
              type="text"
              value={values.sku}
              onChange={(event) => onValueChange('sku', event.target.value)}
              placeholder="XXX-XX-XXX"
            />
          </label>

          <label className="admin-product-modal__field">
            <span>Brand *</span>
            <input
              type="text"
              value={values.brand}
              onChange={(event) => onValueChange('brand', event.target.value)}
              placeholder="Enter the brand"
            />
          </label>

          <label className="admin-product-modal__field">
            <span>Price (EUR) *</span>
            <input
              type="number"
              min="0"
              step="0.01"
              value={values.price}
              onChange={(event) => onValueChange('price', event.target.value)}
              placeholder="0.00"
            />
          </label>

          <label className="admin-product-modal__field">
            <span>In stock *</span>
            <input
              type="number"
              min="0"
              value={values.stock}
              onChange={(event) => onValueChange('stock', event.target.value)}
              placeholder="0"
            />
          </label>

          <label className="admin-product-modal__field">
            <span>Release year *</span>
            <input
              type="number"
              min="0"
              value={values.releaseYear}
              onChange={(event) => onValueChange('releaseYear', event.target.value)}
              placeholder="2026"
            />
          </label>

          <label className="admin-product-modal__field">
            <span>CPU *</span>
            <input
              type="text"
              value={values.cpu}
              onChange={(event) => onValueChange('cpu', event.target.value)}
              placeholder="Snapdragon 8 Gen 3"
            />
          </label>

          <label className="admin-product-modal__field">
            <span>Cores number *</span>
            <input
              type="number"
              min="1"
              value={values.coresNumber}
              onChange={(event) => onValueChange('coresNumber', event.target.value)}
              placeholder="8"
            />
          </label>

          <label className="admin-product-modal__field">
            <span>Screen size *</span>
            <input
              type="text"
              value={values.screenSize}
              onChange={(event) => onValueChange('screenSize', event.target.value)}
              placeholder='6.8"'
            />
          </label>

          <label className="admin-product-modal__field">
            <span>Front camera *</span>
            <input
              type="text"
              value={values.frontCamera}
              onChange={(event) => onValueChange('frontCamera', event.target.value)}
              placeholder="12 MP"
            />
          </label>

          <label className="admin-product-modal__field">
            <span>Main camera *</span>
            <input
              type="text"
              value={values.mainCamera}
              onChange={(event) => onValueChange('mainCamera', event.target.value)}
              placeholder="64-12-12 MP"
            />
          </label>

          <label className="admin-product-modal__field">
            <span>Battery capacity *</span>
            <input
              type="text"
              value={values.batteryCapacity}
              onChange={(event) => onValueChange('batteryCapacity', event.target.value)}
              placeholder="5000 mAh"
            />
          </label>

          <label className="admin-product-modal__field admin-product-modal__field--full">
            <span>{editDescriptionLabel}</span>
            <textarea
              rows={5}
              value={values.description}
              onChange={(event) => onValueChange('description', event.target.value)}
              placeholder="Enter a product description"
            />
          </label>

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
