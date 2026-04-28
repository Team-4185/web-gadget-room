import { FALLBACK_IMAGE, PRODUCTS } from '@/core/constants';
import { cartService, phonesService } from '@/core/services';
import type { ICartDto, IProduct } from '@/core/types';
import { cartStorage } from './cartStorage';
import { mapApiPhoneToProduct } from './products';

export type CartProductsPayload = {
  cart: ICartDto;
  products: IProduct[];
};

export const mapCartDtoToProducts = (
  cart: ICartDto,
  backendProducts: IProduct[] = []
): IProduct[] =>
  cart.cartItems.map(({ phoneId, amount }) => {
    const backendProduct = backendProducts.find((product) => product.id === phoneId);
    if (backendProduct) {
      return { ...backendProduct, amount };
    }

    const sourceProduct = PRODUCTS.find((product) => product.id === phoneId);

    if (sourceProduct) {
      return { ...sourceProduct, amount };
    }

    return {
      id: phoneId,
      name: `Phone #${phoneId}`,
      price: 0,
      img: FALLBACK_IMAGE,
      amount,
    };
  });

export const fetchAndStoreServerCart = async () => {
  const cart = await cartService.getCart();
  cartStorage.set(cart);
  return cart;
};

export const fetchCartProducts = async (cart: ICartDto): Promise<IProduct[]> => {
  const results = await Promise.allSettled(
    cart.cartItems.map(async ({ phoneId }) => {
      const phone = await phonesService.getById(phoneId);
      return mapApiPhoneToProduct(phone);
    })
  );

  return results.flatMap((result) => (result.status === 'fulfilled' ? [result.value] : []));
};

export const fetchAndStoreServerCartWithProducts = async (): Promise<CartProductsPayload> => {
  const cart = await fetchAndStoreServerCart();
  const products = await fetchCartProducts(cart);

  return { cart, products };
};
