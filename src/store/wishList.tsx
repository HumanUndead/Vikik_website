import { Product } from "src/api/type";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface WishListStore {
  items: Product[];
  addItem: (item: Product) => void;
  removeItem: (itemId: string) => void;
  saveAllItems: (items: Product[]) => void;
}

export const wishListStore = create<WishListStore>()(
  persist(
    (set) => ({
      items: [],

      addItem: (item) =>
        set((state) => {
          const existingItemIndex = state.items.findIndex(
            (i) => i.ID === item.ID
          );
          let updatedItems;

          if (existingItemIndex === -1) {
            updatedItems = [...state.items, item];
          } else {
            updatedItems = state.items;
          }

          return { items: updatedItems };
        }),

      removeItem: (itemId) =>
        set((state) => {
          const updatedItems = state.items.filter((item) => item.ID !== itemId);
          return { items: updatedItems };
        }),

      saveAllItems: (items) =>
        set(() => {
          return { items };
        }),
    }),
    {
      name: "wishlist-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
