import { useEffect } from 'react';
import { Typography } from '@mui/material';

import { ADMIN_PRODUCT_STATUS_LABELS } from '@/core/constants';
import type { IAdminPanelManagedProduct } from '@/core/types';

import './AdminProductOverviewModal.css';

interface IProps {
  product: IAdminPanelManagedProduct | null;
  description: string;
  isLoading?: boolean;
  onClose: () => void;
}

export const AdminProductOverviewModal = ({
  product,
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
          <>
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

            <dl className="admin-product-overview-modal__metrics">
              <div>
                <Typography component="dt" fontSize="20px" fontWeight={600}>
                  Price
                </Typography>
                <Typography component="dd" fontSize="16px" fontWeight={300} marginTop="9px">
                  {product.price}
                </Typography>
              </div>
              <div>
                <Typography component="dt" fontSize="20px" fontWeight={600}>
                  Stock
                </Typography>
                <Typography component="dd" fontSize="16px" fontWeight={300} marginTop="9px">
                  {product.stock}
                </Typography>
              </div>
              <div>
                <Typography component="dt" fontSize="20px" fontWeight={600}>
                  Status
                </Typography>
                <Typography component="dd" marginTop="9px">
                  <span className={`admin-product-overview-modal__status is-${product.status}`}>
                    {ADMIN_PRODUCT_STATUS_LABELS[product.status]}
                  </span>
                </Typography>
              </div>
            </dl>

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
          </>
        )}
      </section>
    </div>
  );
};
