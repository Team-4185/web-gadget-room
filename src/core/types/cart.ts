export type ICartItemDto = {
  phoneId: number;
  amount: number;
};

export type ICartDto = {
  id: number;
  totalPrice: number;
  totalAmount: number;
  cartItems: ICartItemDto[];
};

