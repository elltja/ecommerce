import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem } from '~/lib/validators/cart';

interface CartStore {
  cart: CartItem[];
  totalPrice: number;
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: string, quantity?: number) => void;
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
    }),
    { name: 'cart' },
  ),
);

function calculateTotalPrice(cart: CartItem[]) {
  return cart.reduce((total, item) => {
    console.log(item.quantity);
    return total + (item.product.priceInCents * item.quantity) / 100;
  }, 0);
}
