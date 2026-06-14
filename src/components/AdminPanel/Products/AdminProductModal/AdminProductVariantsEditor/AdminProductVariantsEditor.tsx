import { FormControl, MenuItem, Select } from '@mui/material';
import type { SelectChangeEvent } from '@mui/material/Select';

import { Button, LabeledFormField } from '@/components';
import {
  ADMIN_PRODUCT_COLOR_OPTIONS,
  ADMIN_PRODUCT_STORAGE_OPTIONS,
} from '@/core/constants';
import type {
  AdminProductVariantDraft,
  AdminProductVariantErrors,
  AdminProductVariantField,
} from '@/core/types';

import './AdminProductVariantsEditor.css';

interface IProps {
  variants: AdminProductVariantDraft[];
  errors?: AdminProductVariantErrors;
  onVariantChange?: (
    clientId: string,
    field: AdminProductVariantField,
    value: string
  ) => void;
  onAddVariant?: () => void;
  onRemoveDraftVariant?: (clientId: string) => void;
  onRequestDeleteVariant?: (variant: AdminProductVariantDraft) => void;
}

const noop = () => undefined;

export const AdminProductVariantsEditor = ({
  variants,
  errors = {},
  onVariantChange = noop,
  onAddVariant = noop,
  onRemoveDraftVariant = noop,
  onRequestDeleteVariant = noop,
}: IProps) => {
  const canRemoveRows = variants.length > 1;

  const handleSelectChange =
    (clientId: string, field: Extract<AdminProductVariantField, 'color' | 'storageCapacity'>) =>
    (event: SelectChangeEvent<string>) => {
      onVariantChange(clientId, field, event.target.value);
    };

  return (
    <section className="admin-product-variants-editor">
      <div className="admin-product-variants-editor__header">
        <Button
          type="button"
          maxWidth="160px"
          height="34px"
          fontSize="14px"
          fontWeight={600}
          borderRadius="8px"
          onClick={onAddVariant}
        >
          Add variant
        </Button>
      </div>

      <div className="admin-product-variants-editor__grid">
        {variants.map((variant) => {
          const rowErrors = errors[variant.clientId] ?? {};
          const rowError =
            rowErrors.color ??
            rowErrors.storageCapacity ??
            rowErrors.price ??
            rowErrors.stock;

          return (
            <div
              className={`admin-product-variants-editor__row ${
                rowError ? 'is-error' : ''
              }`.trim()}
              key={variant.clientId}
            >
              <label className="admin-product-variants-editor__select-field">
                <span className="admin-product-variants-editor__label">Color</span>
                <FormControl fullWidth size="small" error={Boolean(rowErrors.color)}>
                  <Select
                    value={variant.color}
                    onChange={handleSelectChange(variant.clientId, 'color')}
                  >
                    {ADMIN_PRODUCT_COLOR_OPTIONS.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </label>

              <label className="admin-product-variants-editor__select-field">
                <span className="admin-product-variants-editor__label">Storage</span>
                <FormControl fullWidth size="small" error={Boolean(rowErrors.storageCapacity)}>
                  <Select
                    value={variant.storageCapacity}
                    onChange={handleSelectChange(variant.clientId, 'storageCapacity')}
                  >
                    {ADMIN_PRODUCT_STORAGE_OPTIONS.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </label>

              <LabeledFormField
                label="Price"
                required
                type="number"
                min="0"
                step="1"
                value={variant.price}
                placeholder="0.00"
                errorMessage={rowErrors.price}
                onChange={(value) => onVariantChange(variant.clientId, 'price', value)}
              />

              <LabeledFormField
                label="Stock"
                required
                type="number"
                min="0"
                step="1"
                value={variant.stock}
                placeholder="0"
                errorMessage={rowErrors.stock}
                onChange={(value) => onVariantChange(variant.clientId, 'stock', value)}
              />

              <Button
                type="button"
                maxWidth="100%"
                height="34px"
                fontSize="14px"
                fontWeight={600}
                borderRadius="8px"
                className="admin-product-variants-editor__action"
                disabled={!canRemoveRows}
                onClick={() =>
                  variant.isPersisted
                    ? onRequestDeleteVariant(variant)
                    : onRemoveDraftVariant(variant.clientId)
                }
              >
                Delete
              </Button>

              {rowError ? (
                <span className="admin-product-variants-editor__error">{rowError}</span>
              ) : null}
            </div>
          );
        })}
      </div>
    </section>
  );
};
