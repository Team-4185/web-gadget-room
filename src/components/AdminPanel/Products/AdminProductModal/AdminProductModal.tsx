import { useEffect, type ChangeEvent } from 'react';
import { Typography } from '@mui/material';

import { Button } from '@/components';
import type {
  AdminProductVariantDraft,
  AdminProductVariantErrors,
  AdminProductVariantField,
  AdminProductModalTab,
  IAdminProductFormState,
  IAdminProductModalImage,
} from '@/core/types';
import { AdminProductImageManager } from './AdminProductImageManager';
import { AdminProductModalFields } from './AdminProductModalFields';
import { AdminProductVariantsEditor } from './AdminProductVariantsEditor';

import './AdminProductModal.css';

interface IProps {
  isOpen: boolean;
  title: string;
  submitLabel: string;
  imageName: string;
  values: IAdminProductFormState;
  activeTab: AdminProductModalTab;
  uploadLabel?: string;
  editDescriptionLabel?: string;
  images?: IAdminProductModalImage[];
  fieldErrors?: Partial<Record<keyof IAdminProductFormState, string>>;
  fieldTooltips?: Partial<Record<keyof IAdminProductFormState, string>>;
  variantErrors?: AdminProductVariantErrors;
  onClose: () => void;
  onSave: () => void;
  onTabChange: (tab: AdminProductModalTab) => void;
  onValueChange: (field: keyof IAdminProductFormState, value: string) => void;
  onVariantChange?: (
    clientId: string,
    field: AdminProductVariantField,
    value: string
  ) => void;
  onAddVariant?: () => void;
  onRemoveDraftVariant?: (clientId: string) => void;
  onRequestDeleteVariant?: (variant: AdminProductVariantDraft) => void;
  onImageChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onImageDelete?: (imageId: number) => void;
}

export const AdminProductModal = ({
  isOpen,
  title,
  submitLabel,
  imageName,
  values,
  activeTab,
  uploadLabel,
  editDescriptionLabel,
  images,
  fieldErrors,
  fieldTooltips,
  variantErrors,
  onClose,
  onSave,
  onTabChange,
  onValueChange,
  onVariantChange,
  onAddVariant,
  onRemoveDraftVariant,
  onRequestDeleteVariant,
  onImageChange,
  onImageDelete,
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

  const tabs: { id: AdminProductModalTab; label: string }[] = [
    { id: 'details', label: 'Details' },
    { id: 'variants', label: 'Sale variants' },
    { id: 'images', label: 'Images' },
  ];

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

        <div className="admin-product-modal__tabs" role="tablist" aria-label="Product sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={activeTab === tab.id}
              className={`admin-product-modal__tab ${
                activeTab === tab.id ? 'is-active' : ''
              }`.trim()}
              onClick={() => onTabChange(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <form
          className="admin-product-modal__form"
          onSubmit={(event) => event.preventDefault()}
        >
          {activeTab === 'details' ? (
            <AdminProductModalFields
              values={values}
              editDescriptionLabel={editDescriptionLabel}
              fieldErrors={fieldErrors}
              fieldTooltips={fieldTooltips}
              onValueChange={onValueChange}
            />
          ) : null}

          {activeTab === 'variants' ? (
            <AdminProductVariantsEditor
              variants={values.variants}
              errors={variantErrors}
              onVariantChange={onVariantChange}
              onAddVariant={onAddVariant}
              onRemoveDraftVariant={onRemoveDraftVariant}
              onRequestDeleteVariant={onRequestDeleteVariant}
            />
          ) : null}

          {activeTab === 'images' ? (
            <AdminProductImageManager
              images={images}
              imageName={imageName}
              uploadLabel={uploadLabel}
              onImageChange={onImageChange}
              onImageDelete={onImageDelete}
            />
          ) : null}
        </form>

        <div className="admin-product-modal__actions">
          <Button
            type="button"
            maxWidth="100%"
            height="34px"
            fontSize="14px"
            fontWeight={600}
            borderRadius="8px"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            type="button"
            maxWidth="100%"
            height="34px"
            fontSize="14px"
            fontWeight={600}
            borderRadius="8px"
            onClick={onSave}
          >
            {submitLabel}
          </Button>
        </div>
      </div>
    </div>
  );
};
