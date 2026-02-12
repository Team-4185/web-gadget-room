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
import { HOME_BRANDS, HOME_HERO, PRODUCTS } from '@/core/constants';
import { addProduct } from '@/core/store/slices/cartSlice';

export const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const hero_product = PRODUCTS.find((p) => p.id === HOME_HERO.productId) ?? PRODUCTS[0];

  const addPhone = () => {
    dispatch(
      addProduct({
        id: hero_product.id,
        name: hero_product.name,
        price: hero_product.price,
        amount: 1,
      })
    );
    navigate('/cart');
  };

  return (
    <section className="home">
      <Container disableGutters sx={{ maxWidth: '1440px' }} className="home__container">
        <HeroSection title={HOME_HERO.title} subtitle={HOME_HERO.subtitle} onBuyNow={addPhone} />
        <PromoGridSection
          title={HOME_HERO.title}
          subtitle={HOME_HERO.subtitle}
          onBuyNow={addPhone}
          products={PRODUCTS}
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
