import apiClient from "../api";

export const Payment = async (
  orderId: string,
  userId: string | undefined,
  langId: string,
  coupon: string | undefined
) => {
  try {
    const data = await apiClient().post(
      `Payment/CreditCardPayment?orderId=${orderId}&userId=${userId}&langId=${langId}&coupon=${
        coupon || "12"
      }`
    );
    return data.data;
  } catch (error) {
    console.log(error);
  }
};
