import { FormControl, MenuItem, Select, Typography } from '@mui/material';
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
import { buildProductSku, buildVariantSku } from '@/core/utils';

import './AdminProductVariantsEditor.css';

interface IProps {
  productBrand: string;
  productName: string;
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
  productBrand,
  productName,
  variants,
  errors = {},
  onVariantChange = noop,
  onAddVariant = noop,
  onRemoveDraftVariant = noop,
  onRequestDeleteVariant = noop,
}: IProps) => {
  const productSku = buildProductSku(productBrand, productName);
  const canRemoveRows = variants.length > 1;

  const handleSelectChange =
    (clientId: string, field: Extract<AdminProductVariantField, 'color' | 'storageCapacity'>) =>
    (event: SelectChangeEvent<string>) => {
      onVariantChange(clientId, field, event.target.value);
    };

  return (
    <section className="admin-product-variants-editor">
      <div className="admin-product-variants-editor__header">
        <Typography component="h4" sx={{ fontSize: '20px', fontWeight: 600 }}>
          Sale variants
        </Typography>
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
          const generatedSku =
            variant.sku ??
            buildVariantSku(productSku, variant.color, variant.storageCapacity);

          return (
            <div className="admin-product-variants-editor__row" key={variant.clientId}>
              <div className="admin-product-variants-editor__field">
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
                {rowErrors.color ? (
                  <span className="admin-product-variants-editor__error">
                    {rowErrors.color}
                  </span>
                ) : null}
              </div>

              <div className="admin-product-variants-editor__field">
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
                {rowErrors.storageCapacity ? (
                  <span className="admin-product-variants-editor__error">
                    {rowErrors.storageCapacity}
                  </span>
                ) : null}
              </div>

              <div className="admin-product-variants-editor__sku">
                <span className="admin-product-variants-editor__label">Generated SKU</span>
                <span className="admin-product-variants-editor__sku-value">
                  {generatedSku || 'Generated after brand and name'}
                </span>
              </div>

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

              <button
                type="button"
                className="admin-product-variants-editor__action"
                disabled={!canRemoveRows}
                onClick={() =>
                  variant.isPersisted
                    ? onRequestDeleteVariant(variant)
                    : onRemoveDraftVariant(variant.clientId)
                }
              >
                {variant.isPersisted ? 'Delete' : 'Remove'}
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
};
