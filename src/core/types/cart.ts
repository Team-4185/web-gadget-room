import type { ApiPhoneColor, ApiPhoneImage, PhoneStockStatus } from './product';

export type ICartItemDto = {
  phoneId: number;
  productName?: string;
  brand?: string;
  price?: number;
  previewImage?: ApiPhoneImage | null;
  stock?: number;
  status?: PhoneStockStatus;
  quantity?: number;
  amount: number;
  lineTotal?: number;
  selectedColor?: ApiPhoneColor;
};

export type ICartDto = {
  id: number | null;
  totalPrice: number;
  totalAmount: number;
  cartItems: ICartItemDto[];
};

