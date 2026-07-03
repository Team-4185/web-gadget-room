import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';

import {
  FeaturedBrandsSection,
  HeroSection,
  NewArrivalsSection,
  PromoGridSection,
  SaleBannerSection,
} from '@/components';
import { useAppDispatch, cartActions } from '@/core/store';
import { phonesService } from '@/core/services';
import {
  HOME_BRANDS,
  HOME_HERO,
  HOME_PROMO_LEAD,
  HOME_PROMO_LEFT_SMALL,
  HOME_PROMO_RIGHT_BIG,
  HOME_PROMO_RIGHT_SMALL,
  PRODUCTS,
  CATALOG_MAX_PRICE,
  HOME_BANNER_LEFT_IMAGE,
  HOME_BANNER_RIGHT_IMAGE,
} from '@/core/constants';
import { mapApiPhoneToProduct } from '@/core/utils';
import type { IProduct } from '@/core/types';

export const Home = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [newArrivals, setNewArrivals] = useState<IProduct[]>(PRODUCTS.slice(0, 4));

  const hero_product = PRODUCTS.find((p) => p.id === HOME_HERO.productId) ?? PRODUCTS[0];

  useEffect(() => {
    const controller = new AbortController();
    let isActive = true;

    const loadNewArrivals = async () => {
      try {
        const response = await phonesService.getCatalog(
          {
            page: 1,
            size: 4,
            brands: [],
            minPrice: 0,
            maxPrice: CATALOG_MAX_PRICE,
            sort: 'name_asc',
          },
          controller.signal
        );
        const products = await Promise.all(
          response.content.slice(0, 4).map(async (phone) => {
            const previewImageUrl = phone.previewImage?.url
              ? await phonesService.getImageObjectUrl(phone.previewImage.url, controller.signal)
              : null;
            const imageUrls = previewImageUrl
              ? [previewImageUrl]
              : await phonesService.getImageObjectUrls(phone.images ?? [], controller.signal);

            return mapApiPhoneToProduct(phone, imageUrls[0]);
          })
        );

        if (isActive && !controller.signal.aborted) {
          setNewArrivals(products);
        }
      } catch (error) {
        if (axios.isAxiosError(error) && error.code === 'ERR_CANCELED') return;
      }
    };

    void loadNewArrivals();

    return () => {
      isActive = false;
      controller.abort();
    };
  }, []);

  const addPhone = async () => {
    await dispatch(cartActions.addProduct(hero_product));
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
        products={newArrivals}
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
