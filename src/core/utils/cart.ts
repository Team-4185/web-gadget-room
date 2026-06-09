import { isAxiosError } from 'axios';

import { FALLBACK_IMAGE, PRODUCTS } from '@/core/constants';
import { cartService, phonesService } from '@/core/services';
import type { ICartDto, ICartItemDto, IProduct } from '@/core/types';
import { cartStorage } from './cartStorage';
import { formatProductDisplayName, mapApiPhoneToProduct } from './products';
import { getDefaultPhoneColor, getDefaultStorageCapacity } from './productVariants';

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
      const { phoneId, selectedColor, selectedStorage } = item;
      const amount = getCartItemAmount(item);

      if (hasRenderableCartItemDetails(item)) {
        const img = await mapCartItemPreviewImage(item);
        const backendProduct = backendProducts.find((product) => product.id === phoneId);

        return {
          ...(backendProduct ?? {}),
          id: phoneId,
          name: formatProductDisplayName(item.brand, item.productName ?? `Phone #${phoneId}`),
          price: Number(item.price ?? backendProduct?.price ?? 0),
          img,
          amount,
          colors: backendProduct?.colors ?? [],
          storageCapacity: backendProduct?.storageCapacity ?? [],
          selectedColor:
            selectedColor ??
            backendProduct?.selectedColor ??
            getDefaultPhoneColor(backendProduct?.colors),
          selectedStorage:
            selectedStorage ??
            backendProduct?.selectedStorage ??
            getDefaultStorageCapacity(backendProduct?.storageCapacity),
          inStock: item.status ? item.status !== 'OUT_OF_STOCK' : undefined,
        };
      }

    const backendProduct = backendProducts.find((product) => product.id === phoneId);
    if (backendProduct) {
      return {
        ...backendProduct,
        amount,
        selectedColor:
          selectedColor ?? backendProduct.selectedColor ?? getDefaultPhoneColor(backendProduct.colors),
        selectedStorage:
          selectedStorage ??
          backendProduct.selectedStorage ??
          getDefaultStorageCapacity(backendProduct.storageCapacity),
      };
    }

    const sourceProduct = PRODUCTS.find((product) => product.id === phoneId);

    if (sourceProduct) {
      return {
        ...sourceProduct,
        amount,
        selectedColor:
          selectedColor ?? sourceProduct.selectedColor ?? getDefaultPhoneColor(sourceProduct.colors),
        selectedStorage:
          selectedStorage ??
          sourceProduct.selectedStorage ??
          getDefaultStorageCapacity(sourceProduct.storageCapacity),
      };
    }

    return {
      id: phoneId,
      name: `Phone #${phoneId}`,
      price: 0,
      img: FALLBACK_IMAGE,
      amount,
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
  const results = await Promise.allSettled(
    cart.cartItems
      .filter((item) => !hasRenderableCartItemDetails(item))
      .map(async ({ phoneId }) => {
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
