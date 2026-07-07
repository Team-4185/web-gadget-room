import { isAxiosError } from 'axios';

import { FALLBACK_IMAGE, PRODUCTS } from '@/core/constants';
import { cartService, phonesService } from '@/core/services';
import type { ICartDto, ICartItemDto, IProduct } from '@/core/types';
import { cartStorage } from './cartStorage';
import { formatProductDisplayName, mapApiPhoneToProduct } from './products';
import {
  applySelectedProductVariant,
  getDefaultPhoneColor,
  getDefaultStorageCapacity,
  getPhoneColorFromVariant,
  getStorageCapacityFromVariant,
} from './productVariants';

export type CartProductsPayload = {
  cart: ICartDto;
  products: IProduct[];
};

const EMPTY_CART: ICartDto = {
  id: null,
  totalPrice: 0,
  totalAmount: 0,
  cartItems: [],
};

const getCartItemAmount = (item: ICartItemDto) => item.amount ?? item.quantity ?? 0;

const hasRenderableCartItemDetails = (item: ICartItemDto) =>
  Boolean(item.productName && item.price !== undefined);

const mapCartItemPreviewImage = async (item: ICartItemDto): Promise<string> => {
  if (!item.previewImage?.url) return FALLBACK_IMAGE;

  try {
    return await phonesService.getImageObjectUrl(item.previewImage.url);
  } catch {
    return FALLBACK_IMAGE;
  }
};

export const mapCartDtoToProducts = async (
  cart: ICartDto,
  backendProducts: IProduct[] = []
): Promise<IProduct[]> => {
  const products = await Promise.all(
    cart.cartItems.map(async (item) => {
      const { phoneId, selectedColor, selectedStorage, variant, variantId } = item;
      const amount = getCartItemAmount(item);

      if (hasRenderableCartItemDetails(item)) {
        const img = await mapCartItemPreviewImage(item);
        const backendProduct = backendProducts.find((product) => product.id === phoneId);

        const product = {
          ...(backendProduct ?? {}),
          id: phoneId,
          name: formatProductDisplayName(item.brand, item.productName ?? `Phone #${phoneId}`),
          price: Number(variant?.price ?? item.price ?? backendProduct?.price ?? 0),
          img,
          amount,
          colors: backendProduct?.colors ?? [],
          storageCapacity: backendProduct?.storageCapacity ?? [],
          variants: backendProduct?.variants ?? (variant ? [variant] : []),
          selectedVariantId: variantId ?? variant?.id,
          selectedColor:
            (variant && getPhoneColorFromVariant(variant.color, backendProduct?.colors)) ??
            selectedColor ??
            backendProduct?.selectedColor ??
            getDefaultPhoneColor(backendProduct?.colors),
          selectedStorage:
            (variant &&
              getStorageCapacityFromVariant(
                variant.storageCapacity,
                backendProduct?.storageCapacity
              )) ??
            selectedStorage ??
            backendProduct?.selectedStorage ??
            getDefaultStorageCapacity(backendProduct?.storageCapacity),
          stock: variant?.stock ?? item.stock,
          status: variant?.status ?? item.status,
          inStock: variant
            ? variant.status !== 'OUT_OF_STOCK' && variant.stock > 0
            : item.status
              ? item.status !== 'OUT_OF_STOCK'
              : undefined,
        };

        return product;
      }

      const backendProduct = backendProducts.find((product) => product.id === phoneId);
      if (backendProduct) {
        return applySelectedProductVariant(
          {
            ...backendProduct,
            amount,
            selectedVariantId: variantId ?? variant?.id ?? backendProduct.selectedVariantId,
            selectedColor:
              (variant && getPhoneColorFromVariant(variant.color, backendProduct.colors)) ??
              selectedColor ??
              backendProduct.selectedColor ??
              getDefaultPhoneColor(backendProduct.colors),
            selectedStorage:
              (variant &&
                getStorageCapacityFromVariant(
                  variant.storageCapacity,
                  backendProduct.storageCapacity
                )) ??
              selectedStorage ??
              backendProduct.selectedStorage ??
              getDefaultStorageCapacity(backendProduct.storageCapacity),
          },
          variant?.color ?? selectedColor?.name,
          variant?.storageCapacity ?? selectedStorage?.name
        );
      }

      const sourceProduct = PRODUCTS.find((product) => product.id === phoneId);

      if (sourceProduct) {
        return applySelectedProductVariant(
          {
            ...sourceProduct,
            amount,
            selectedVariantId: variantId ?? variant?.id ?? sourceProduct.selectedVariantId,
            selectedColor:
              (variant && getPhoneColorFromVariant(variant.color, sourceProduct.colors)) ??
              selectedColor ??
              sourceProduct.selectedColor ??
              getDefaultPhoneColor(sourceProduct.colors),
            selectedStorage:
              (variant &&
                getStorageCapacityFromVariant(
                  variant.storageCapacity,
                  sourceProduct.storageCapacity
                )) ??
              selectedStorage ??
              sourceProduct.selectedStorage ??
              getDefaultStorageCapacity(sourceProduct.storageCapacity),
          },
          variant?.color ?? selectedColor?.name,
          variant?.storageCapacity ?? selectedStorage?.name
        );
      }

      return {
        id: phoneId,
        name: `Phone #${phoneId}`,
        price: 0,
        img: FALLBACK_IMAGE,
        amount,
        variants: variant ? [variant] : [],
        selectedVariantId: variantId ?? variant?.id,
        selectedColor: selectedColor ?? getDefaultPhoneColor(),
        selectedStorage: selectedStorage ?? getDefaultStorageCapacity(),
      };
    })
  );

  return products;
};

export const fetchAndStoreServerCart = async () => {
  try {
    const cart = await cartService.getCart();
    cartStorage.set(cart);
    return cart;
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 404) {
      cartStorage.clear();
      return EMPTY_CART;
    }

    throw error;
  }
};

export const fetchCartProducts = async (cart: ICartDto): Promise<IProduct[]> => {
  const phoneIds = Array.from(new Set(cart.cartItems.map((item) => item.phoneId)));
  const results = await Promise.allSettled(
    phoneIds.map(async (phoneId) => {
      const phone = await phonesService.getById(phoneId);
      const imageUrls = await phonesService.getImageObjectUrls(phone.images ?? []);

      return mapApiPhoneToProduct(phone, imageUrls[0]);
    })
  );

  return results.flatMap((result) => (result.status === 'fulfilled' ? [result.value] : []));
};

export const fetchAndStoreServerCartWithProducts = async (): Promise<CartProductsPayload> => {
  const cart = await fetchAndStoreServerCart();
  const backendProducts = await fetchCartProducts(cart);
  const products = await mapCartDtoToProducts(cart, backendProducts);

  return { cart, products };
};
