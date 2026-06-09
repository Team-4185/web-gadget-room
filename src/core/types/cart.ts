import type { ApiPhoneColor, ApiPhoneImage, ApiStorageCapacity, PhoneStockStatus } from './product';

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
  selectedStorage?: ApiStorageCapacity;
  colors?: ApiPhoneColor[];
  storageCapacity?: ApiStorageCapacity[];
};

export type ICartDto = {
  id: number | null;
  totalPrice: number;
  totalAmount: number;
  cartItems: ICartItemDto[];
};

