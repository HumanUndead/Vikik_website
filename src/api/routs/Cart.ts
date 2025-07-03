/* eslint-disable @typescript-eslint/no-explicit-any */
import apiClient from "../api";
import { ProductJson } from "../type";

export const CheckcOutCart = async (
  userId: string | undefined,
  prodsjson: ProductJson[],
  addressID: string,
  total: number,
  coupon: string,
  langId: string,
  Delivery: number
) => {
  const finalCoupon = coupon ? coupon : "123";
  const deliveryAsNumber = Number(Delivery);

  try {
    const response = await apiClient().post(
      `Services/CartCheckout?uid=${userId}&langID=${langId}&prodsjson=${JSON.stringify(
        prodsjson
      )}&addressID=${addressID}&total=${total}&coupon=${finalCoupon}&Delivery=${deliveryAsNumber}&&notes=ss&usePoint=false`
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log("Error adding for cart ", error);
  }
};
