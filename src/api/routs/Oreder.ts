import apiClient from "../api";

export const UserOrdersGet = async (
  userId: string | undefined,
  langId: string
) => {
  try {
    const data = await apiClient().post(
      `Services/UserOrdersGet?uid=${userId}&langID=${langId}&page=1`
    );
    return data.data;
  } catch (error) {
    console.log(error);
  }
};

export const UserOrderGet = async (
  userId: string | undefined,
  orderId: string,
  langId: string
) => {
  console.log(userId, orderId, langId);
  try {
    const data = await apiClient().post(
      `Services/UserOrderGet?uid=${userId}&orderID=${orderId}&langID=${langId}`
    );
    return data.data.order;
  } catch (error) {
    console.log(error);
  }
};
