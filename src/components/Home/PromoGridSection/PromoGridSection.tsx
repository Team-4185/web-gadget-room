import { PRODUCTS } from '@/core/constants';

import { PromoGridItem, type PromoContent } from './PromoGridItem';
import './PromoGridSection.css';

type Props = {
  lead: PromoContent;
  leftSmall: PromoContent;
  rightSmall: PromoContent;
  rightBig: PromoContent;
  onBuyNow: () => void;
  onOpenProduct: (product: (typeof PRODUCTS)[0]) => void;
};

export const PromoGridSection = ({
  lead,
  leftSmall,
  rightSmall,
  rightBig,
  onBuyNow,
  onOpenProduct,
}: Props) => {
  const getProductById = (id: number) =>
    PRODUCTS.find((product) => product.id === id) ?? PRODUCTS[0];

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
