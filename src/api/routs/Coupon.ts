import apiClient from "../api";

export const CheckCoupon = async (
  userID: string | undefined,
  coupon: string
) => {
  try {
    const response = await apiClient().post(
      `Services/CheckCoupon?userID=${userID}&coupon=${coupon}`
    );
    return response.data;
  } catch (error) {
    console.error("Error checking coupon:", error);
  }
};
