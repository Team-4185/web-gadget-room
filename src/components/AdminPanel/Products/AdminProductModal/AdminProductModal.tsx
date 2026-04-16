import { useEffect, type ChangeEvent } from 'react';
import { Typography } from '@mui/material';

import './AdminProductModal.css';

export interface IAdminProductFormState {
  name: string;
  sku: string;
  brand: string;
  price: string;
  stock: string;
  status?: string;
  description: string;
}

interface IProps {
  isOpen: boolean;
  title: string;
  submitLabel: string;
  imageName: string;
  values: IAdminProductFormState;
  showStatusField?: boolean;
  uploadLabel?: string;
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
  showStatusField = false,
  uploadLabel,
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

          {showStatusField ? (
            <label className="admin-product-modal__field admin-product-modal__field--full">
              <span>Status</span>
              <input
                type="text"
                value={values.status ?? ''}
                onChange={(event) => onValueChange('status', event.target.value)}
                placeholder="In stock"
              />
            </label>
          ) : null}

          <label className="admin-product-modal__field admin-product-modal__field--full">
            <span>{showStatusField ? 'Edit description' : 'Description'}</span>
            <textarea
              rows={5}
              value={values.description}
              onChange={(event) => onValueChange('description', event.target.value)}
              placeholder="Enter a product description"
            />
          </label>

          <label className="admin-product-modal__upload">
            <span>{uploadLabel ?? (showStatusField ? 'Edit an image' : 'Upload an image')}</span>
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
