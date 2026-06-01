export type ICartItemDto = {
  phoneId: number;
  amount: number;
};

export type ICartDto = {
  id: number | null;
  totalPrice: number;
  totalAmount: number;
  cartItems: ICartItemDto[];
};

