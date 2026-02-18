import { Container } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
  FeaturedBrandsSection,
  HeroSection,
  NewArrivalsSection,
  PromoGridSection,
  SaleBannerSection,
} from '@/components';
import {
  HOME_BRANDS,
  HOME_HERO,
  HOME_PROMO_LEAD,
  HOME_PROMO_LEFT_SMALL,
  HOME_PROMO_RIGHT_BIG,
  HOME_PROMO_RIGHT_SMALL,
  PRODUCTS,
} from '@/core/constants';
import { addProduct } from '@/core/store/slices/cartSlice';

export const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const hero_product = PRODUCTS.find((p) => p.id === HOME_HERO.productId) ?? PRODUCTS[0];

  const addPhone = () => {
    dispatch(addProduct(hero_product));
    navigate('/cart');
  };

  return (
    <section className="home">
      <Container disableGutters sx={{ maxWidth: '1440px' }} className="home__container">
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
      </Container>

      <SaleBannerSection onShopDeals={() => navigate('/catalog')} />
    </section>
  );
};
