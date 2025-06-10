// file: apps/frontend/src/store/cart.store.ts
import { create } from "zustand";
import { Part } from "@fullsend/types";

// This defines the shape of an item inside our cart
export interface CartItem extends Part {
  quantity: number;
}

// This defines the shape of the entire cart state
interface CartState {
  items: CartItem[];
  addToCart: (part: Part) => void;
  removeFromCart: (partId: string) => void;
  updateQuantity: (partId: string, quantity: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>((set) => ({
  items: [],

  // Action to add a part to the cart
  addToCart: (part) =>
    set((state) => {
      const existingItem = state.items.find((item) => item.id === part.id);
      if (existingItem) {
        // If item already exists, just increase its quantity
        const updatedItems = state.items.map((item) =>
          item.id === part.id ? { ...item, quantity: item.quantity + 1 } : item,
        );
        return { items: updatedItems };
      } else {
        // If item is new, add it to the cart with quantity 1
        return { items: [...state.items, { ...part, quantity: 1 }] };
      }
    }),

  // Action to completely remove an item from the cart
  removeFromCart: (partId) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== partId),
    })),

  // Action to change the quantity of a specific item
  updateQuantity: (partId, quantity) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === partId
          ? { ...item, quantity: Math.max(1, quantity) }
          : item,
      ),
    })),

  // Action to empty the entire cart
  clearCart: () => set({ items: [] }),
}));
