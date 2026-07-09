import type { IProduct } from '@/core/types';

import { PromoGridItem, type PromoContent } from './PromoGridItem';
import './PromoGridSection.css';

type Props = {
  lead: PromoContent;
  leftSmall: PromoContent;
  rightSmall: PromoContent;
  rightBig: PromoContent;
  onBuyNow: (productId: number) => void;
  onOpenProduct: (product: IProduct) => void;
  getProductById: (id: number) => IProduct;
};

export const PromoGridSection = ({
  lead,
  leftSmall,
  rightSmall,
  rightBig,
  onBuyNow,
  onOpenProduct,
  getProductById,
}: Props) => {
  return (
    <section className="promo-grid" aria-label="Promotions">
      <div className="promo-grid__wrapper">
        <div className="promo-grid__left">
          <PromoGridItem item={lead} variant="lead" onBuyNow={onBuyNow} />

          <div className="promo-grid__bottom-row">
            <PromoGridItem
              item={leftSmall}
              variant="small-left"
              onOpenProduct={(productId) => onOpenProduct(getProductById(productId))}
            />
            <PromoGridItem
              item={rightSmall}
              variant="small-right"
              onOpenProduct={(productId) => onOpenProduct(getProductById(productId))}
            />
          </div>
        </div>

        <div className="promo-grid__right">
          <PromoGridItem item={rightBig} variant="right-big" />
        </div>
      </div>
    </section>
  );
};
