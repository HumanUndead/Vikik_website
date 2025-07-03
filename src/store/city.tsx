import { City } from "src/api/type";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface CityState {
  items: City;
  addItem: (item: City) => void;
  clear: () => void;
}

export const cityStore = create<CityState>()(
  persist(
    (set) => ({
      items: {} as City,
      addItem: (item: City) => set({ items: item }),
      clear: () => set({ items: {} as City }),
    }),
    {
      name: "city-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
