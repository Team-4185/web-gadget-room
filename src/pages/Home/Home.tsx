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
  HOME_BANNER_LEFT_IMAGE,
  HOME_BANNER_RIGHT_IMAGE,
} from '@/core/constants';
import { mapApiPhoneToProduct } from '@/core/utils';
import type { ApiPhone, IProduct } from '@/core/types';

const HOME_PRODUCT_IDS = Array.from(
  new Set([
    HOME_HERO.productId,
    HOME_PROMO_LEAD.productId,
    HOME_PROMO_LEFT_SMALL.productId,
    HOME_PROMO_RIGHT_SMALL.productId,
    HOME_PROMO_RIGHT_BIG.productId,
  ])
);

const FALLBACK_PRODUCT_BY_ID = new Map(PRODUCTS.map((product) => [product.id, product]));

const isCanceledRequest = (error: unknown) =>
  axios.isAxiosError(error) && error.code === 'ERR_CANCELED';

export const Home = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [newArrivals, setNewArrivals] = useState<IProduct[]>(PRODUCTS.slice(0, 4));
  const [homeProducts, setHomeProducts] = useState<Record<number, IProduct>>(() =>
    Object.fromEntries(
      HOME_PRODUCT_IDS.map((id) => [id, FALLBACK_PRODUCT_BY_ID.get(id) ?? PRODUCTS[0]])
    )
  );

  const getHomeProductById = (id: number) =>
    homeProducts[id] ?? FALLBACK_PRODUCT_BY_ID.get(id) ?? PRODUCTS[0];

  const mapPhoneWithImage = async (phone: ApiPhone, signal: AbortSignal) => {
    const previewImageUrl = phone.previewImage?.url
      ? await phonesService.getImageObjectUrl(phone.previewImage.url, signal)
      : null;
    const imageUrls = previewImageUrl
      ? [previewImageUrl]
      : await phonesService.getImageObjectUrls(phone.images ?? [], signal);

    return mapApiPhoneToProduct(phone, imageUrls[0]);
  };

  useEffect(() => {
    const controller = new AbortController();
    let isActive = true;

    const loadHomeProducts = async () => {
      try {
        const entries = await Promise.all(
          HOME_PRODUCT_IDS.map(async (id) => {
            const phone = await phonesService.getById(id, controller.signal);
            const product = await mapPhoneWithImage(phone, controller.signal);

            return [id, product] as const;
          })
        );

        if (isActive && !controller.signal.aborted) {
          setHomeProducts((previousProducts) => ({
            ...previousProducts,
            ...Object.fromEntries(entries),
          }));
        }
      } catch (error) {
        if (isCanceledRequest(error)) return;
      }
    };

    const loadNewArrivals = async () => {
      try {
        const phones = await phonesService.getNewArrivals(controller.signal);
        const products = await Promise.all(
          phones.slice(0, 4).map((phone) => mapPhoneWithImage(phone, controller.signal))
        );

        if (isActive && !controller.signal.aborted && products.length) {
          setNewArrivals(products);
        }
      } catch (error) {
        if (isCanceledRequest(error)) return;
      }
    };

    void loadHomeProducts();
    void loadNewArrivals();

    return () => {
      isActive = false;
      controller.abort();
    };
  }, []);

  const addPhone = async (productId: number = HOME_HERO.productId) => {
    await dispatch(cartActions.addProduct(getHomeProductById(productId)));
    navigate('/cart');
  };

  const openProduct = (product: IProduct) => {
    navigate(`/product/${product.id}`, { state: product });
  };

  return (
    <>
      <HeroSection
        title={HOME_HERO.title}
        subtitle={HOME_HERO.subtitle}
        imageSrc={HOME_HERO.imageSrc}
        onBuyNow={() => void addPhone(HOME_HERO.productId)}
      />
      <PromoGridSection
        lead={HOME_PROMO_LEAD}
        leftSmall={HOME_PROMO_LEFT_SMALL}
        rightSmall={HOME_PROMO_RIGHT_SMALL}
        rightBig={HOME_PROMO_RIGHT_BIG}
        onBuyNow={(productId) => void addPhone(productId)}
        onOpenProduct={openProduct}
        getProductById={getHomeProductById}
      />
      <FeaturedBrandsSection brands={HOME_BRANDS} />
      <NewArrivalsSection products={newArrivals} onOpenProduct={openProduct} />

      <SaleBannerSection
        onShopDeals={() => navigate('/catalog')}
        leftImageSrc={HOME_BANNER_LEFT_IMAGE}
        rightImageSrc={HOME_BANNER_RIGHT_IMAGE}
      />
    </>
  );
};
