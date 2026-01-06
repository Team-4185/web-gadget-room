import { Container } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { FeaturedBrandsSection } from '../../components/shared/Home/FeaturedBrandsSection/FeaturedBrandsSection';
import { HeroSection } from '../../components/shared/Home/HeroSection/HeroSection';
import { NewArrivalsSection } from '../../components/shared/Home/NewArrivalsSection/NewArrivalsSection';
import { PromoGridSection } from '../../components/shared/Home/PromoGridSection/PromoGridSection';
import { SaleBannerSection } from '../../components/shared/Home/SaleBannerSections/SaleBannerSection';
import { PRODUCTS } from '../../core/constants/products';
import { addProduct } from '../../core/store/slices/cartSlice';
import { HOME_BRANDS, HOME_HERO } from '../../core/constants/home';

export const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const heroProduct = PRODUCTS.find((p) => p.id === HOME_HERO.productId) ?? PRODUCTS[0];

  const addPhone = () => {
    dispatch(
      addProduct({
        id: heroProduct.id,
        name: heroProduct.name,
        price: heroProduct.price,
        amount: 1,
      })
    );
    navigate('/cart');
  };

  return (
    <>
      <Container className="home_container" disableGutters maxWidth="xl">
        <HeroSection title={HOME_HERO.title} subtitle={HOME_HERO.subtitle} onBuyNow={addPhone} />
        <PromoGridSection />
        <FeaturedBrandsSection brands={HOME_BRANDS} />
        <NewArrivalsSection
          products={PRODUCTS}
          onOpenProduct={(product) => navigate(`/product/${product.id}`, { state: product })}
        />
      </Container>

      <SaleBannerSection onShopDeals={() => navigate('/catalog')} />
    </>
  );
};
