import type {
  ApiPhoneColor,
  ApiPhoneImage,
  ApiProductVariant,
  ApiStorageCapacity,
  PhoneStockStatus,
} from './product';

export type ICartItemDto = {
  phoneId: number;
  variantId?: number;
  variant?: ApiProductVariant;
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

