import { useEffect } from 'react';
import { Typography } from '@mui/material';

import {
  ADMIN_PRODUCT_COLOR_OPTIONS,
  ADMIN_PRODUCT_STATUS_LABELS,
  ADMIN_PRODUCT_STORAGE_OPTIONS,
} from '@/core/constants';
import type { ApiPhone, IAdminPanelManagedProduct } from '@/core/types';

import './AdminProductOverviewModal.css';

interface IProps {
  product: IAdminPanelManagedProduct | null;
  productDetails: ApiPhone | null;
  description: string;
  isLoading?: boolean;
  onClose: () => void;
}

const getOptionLabel = <T extends string>(
  value: T,
  options: readonly { value: T; name: string }[]
) => options.find((option) => option.value === value)?.name ?? value;

export const AdminProductOverviewModal = ({
  product,
  productDetails,
  description,
  isLoading = false,
  onClose,
}: IProps) => {
  useEffect(() => {
    if (!product) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', onKeyDown);

    return () => window.removeEventListener('keydown', onKeyDown);
  }, [product, onClose]);

  if (!product) return null;

  const variants = productDetails?.variants ?? [];
  const variantRows = variants.length
    ? variants.map((variant) => ({
        id: variant.id,
        color: getOptionLabel(variant.color, ADMIN_PRODUCT_COLOR_OPTIONS),
        storage: getOptionLabel(variant.storageCapacity, ADMIN_PRODUCT_STORAGE_OPTIONS),
        price: new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }).format(variant.price),
        stock: `${variant.stock} pcs`,
        status: variant.status,
      }))
    : [
        {
          id: product.id,
          color: 'Not set',
          storage: 'Not set',
          price: product.price,
          stock: product.stock,
          status: product.status,
        },
      ];

  return (
    <div className="admin-product-overview-modal__backdrop" role="presentation">
      <section
        className="admin-product-overview-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="admin-product-overview-modal-title"
      >
        <header className="admin-product-overview-modal__header">
          <Typography
            id="admin-product-overview-modal-title"
            component="h3"
            fontSize="32px"
            fontWeight={600}
            lineHeight={1.1}
          >
            Product overview
          </Typography>

          <button
            type="button"
            aria-label="Close product overview"
            className="admin-product-overview-modal__close"
            onClick={onClose}
          >
            x
          </button>
        </header>

        {isLoading ? (
          <div className="admin-product-overview-modal__loading">Loading product overview...</div>
        ) : (
          <div className="admin-product-overview-modal__content">
            <div className="admin-product-overview-modal__summary">
              <img
                className="admin-product-overview-modal__image"
                src={product.image}
                alt={product.title}
              />

              <div className="admin-product-overview-modal__identity">
                <Typography component="h4" fontSize="24px" fontWeight={600} lineHeight={1.2}>
                  {product.title}
                </Typography>
                <Typography component="p" fontSize="20px" fontWeight={300} lineHeight={1.2}>
                  <strong>SKU:</strong> {product.sku}
                </Typography>
                <Typography component="p" fontSize="20px" fontWeight={300} lineHeight={1.2}>
                  <strong>Brand:</strong> {product.brand}
                </Typography>
              </div>
            </div>

            <div className="admin-product-overview-modal__variants">
              <div className="admin-product-overview-modal__variant-row admin-product-overview-modal__variant-row--header">
                <span>Color</span>
                <span>Storage</span>
                <span>Price</span>
                <span>Stock</span>
                <span>Status</span>
              </div>

              <div className="admin-product-overview-modal__variant-list">
                {variantRows.map((variant) => (
                  <div className="admin-product-overview-modal__variant-row" key={variant.id}>
                    <span>{variant.color}</span>
                    <span>{variant.storage}</span>
                    <span>{variant.price}</span>
                    <span>{variant.stock}</span>
                    <span>
                      <span className={`admin-product-overview-modal__status is-${variant.status}`}>
                        {ADMIN_PRODUCT_STATUS_LABELS[variant.status]}
                      </span>
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="admin-product-overview-modal__description">
              <Typography component="h4" fontSize="20px" fontWeight={600} lineHeight={1.2}>
                Description
              </Typography>
              <Typography
                component="p"
                fontSize="16px"
                fontWeight={300}
                marginTop="10px"
                lineHeight={1.5}
              >
                {description}
              </Typography>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};
