import { useNavigate } from 'react-router-dom';

import {
  FeaturedBrandsSection,
  HeroSection,
  NewArrivalsSection,
  PromoGridSection,
  SaleBannerSection,
} from '@/components';
import { useAppDispatch, cartActions } from '@/core/store';
import {
  HOME_BRANDS,
  HOME_HERO,
  HOME_PROMO_LEAD,
  HOME_PROMO_LEFT_SMALL,
  HOME_PROMO_RIGHT_BIG,
  HOME_PROMO_RIGHT_SMALL,
  PRODUCTS,
  HOME_BANNER_LEFT_IMAGE,
  HOME_BANNER_RIGHT_IMAGE,
} from '@/core/constants';

export const Home = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const hero_product = PRODUCTS.find((p) => p.id === HOME_HERO.productId) ?? PRODUCTS[0];

  const addPhone = () => {
    dispatch(cartActions.addProduct(hero_product));
    navigate('/cart');
  };

  return (
    <>
      <HeroSection
        title={HOME_HERO.title}
        subtitle={HOME_HERO.subtitle}
        imageSrc={HOME_HERO.imageSrc}
        onBuyNow={addPhone}
      />
      <PromoGridSection
        lead={HOME_PROMO_LEAD}
        leftSmall={HOME_PROMO_LEFT_SMALL}
        rightSmall={HOME_PROMO_RIGHT_SMALL}
        rightBig={HOME_PROMO_RIGHT_BIG}
        onBuyNow={addPhone}
        onOpenProduct={(product) => navigate(`/product/${product.id}`, { state: product })}
      />
      <FeaturedBrandsSection brands={HOME_BRANDS} />
      <NewArrivalsSection
        products={PRODUCTS}
        onOpenProduct={(product) => navigate(`/product/${product.id}`, { state: product })}
      />

      <SaleBannerSection
        onShopDeals={() => navigate('/catalog')}
        leftImageSrc={HOME_BANNER_LEFT_IMAGE}
        rightImageSrc={HOME_BANNER_RIGHT_IMAGE}
      />
    </>
  );
};
