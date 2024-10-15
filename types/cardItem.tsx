export type CartItem = {
  id: number | string;
  name: string;
  price: number;
  quantity: number;
};

export type CartContextType = {
  cartItems: CartItem[];
  addItemToCart: (item: CartItem) => void;
  removeItemFromCart: (id: number) => void;
  clearCart: () => void;
};
