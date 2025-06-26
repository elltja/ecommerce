import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type CartItem = {
  product: {
    id: string;
  };
};

interface CartStore {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      cart: [],
      addToCart: (item: CartItem) => {
        set((state) => ({ cart: [...state.cart, item] }));
      },
    }),
    { name: 'cart' },
  ),
);
