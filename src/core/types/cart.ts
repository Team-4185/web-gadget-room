import type { ApiPhoneColor } from './product';

export type ICartItemDto = {
  phoneId: number;
  amount: number;
  selectedColor?: ApiPhoneColor;
};

export type ICartDto = {
  id: number | null;
  totalPrice: number;
  totalAmount: number;
  cartItems: ICartItemDto[];
};

