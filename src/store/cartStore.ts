import type { ProductImage } from '@prisma/client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
export type CartItem = {
  quantity: number;
  product: {
    id: string;
    priceInCents: number;
    title: string;
    images: ProductImage[];
  };
};

interface CartStore {
  cart: CartItem[];
  totalPrice: number;
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: string, quantity?: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: [],
      totalPrice: 0,
      addToCart: (newItem: CartItem) => {
        let productWasInCart = false;

        const updatedCart = get().cart.map((item) => {
          if (item.product.id === newItem.product.id) {
            productWasInCart = true;
            return { ...item, quantity: item.quantity + newItem.quantity };
          }
          return item;
        });

        if (!productWasInCart) {
          updatedCart.push(newItem);
        }
        set({
          cart: updatedCart,
          totalPrice: calculateTotalPrice(updatedCart),
        });
      },
      removeFromCart: (productId: string, quantity = 1) => {
        const cart = get().cart;

        let updatedCart = cart.map((item) => {
          if (item.product.id === productId) {
            return { ...item, quantity: item.quantity - quantity };
          }
          return item;
        });

        const shouldBeRemoved = (() => {
          const cartItem = cart.find((item) => item.product.id === productId);

          return (
            typeof cartItem?.quantity === 'number' && cartItem?.quantity < 2
          );
        })();

        if (shouldBeRemoved) {
          updatedCart = updatedCart.filter(
            (item) => item.product.id !== productId,
          );
        }

        set({
          cart: updatedCart,
          totalPrice: calculateTotalPrice(updatedCart),
        });
      },
      clearCart: () => {
        set({ cart: [], totalPrice: 0 });
      },
    }),
    { name: 'cart' },
  ),
);

function calculateTotalPrice(cart: CartItem[]): number {
  const totalPrice: number = cart.reduce(
    (total: number, item: CartItem) =>
      total + (item.product.priceInCents * item.quantity) / 100,
    0,
  );
  return totalPrice;
}
