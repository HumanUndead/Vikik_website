import { create } from "zustand";

interface CouponState {
  coupon: any | number;
  addCoupon: (coupon: any) => void;
  clearCoupon: () => void;
}

export const CouponStore = create<CouponState>((set) => ({
  coupon: 0,
  addCoupon: (coupon: any) => set({ coupon }),
  clearCoupon: () => set({ coupon: null }),
}));
