import apiClient from "../api";

export const CheckPaymentStatus = async (
  orderId: string,
  resourcePath: any
) => {
  console.log({ resourcePath }, { orderId });
  try {
    const data = await apiClient().post(
      `Payment/CheckPaymentStatus?orderId=${orderId}&resourcePath=${resourcePath}`
    );
    return data.data;
  } catch (error) {
    console.log(error);
  }
};
