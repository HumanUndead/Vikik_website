import apiClient from "../api";

export const AddToWishList = async (
  iserId: string | undefined,
  prodId: string,
  langID: string
) => {
  try {
    const response = await apiClient().post(
      `Services/ProductAddToWishlist?uid=${iserId}&prodid=${prodId}&langID=${langID}&type=1`
    );
    return response.data;
  } catch (error) {
    console.error("Failed to add product to wishlist", error);
  }
};

export const RemoveFromWishList = async (
  userId: string | undefined,
  prodId: string,
  langID: string
) => {
  try {
    const response = await apiClient().post(
      `Services/ProductRemoveFromWishlist?uid=${userId}&prodid=${prodId}&langID=${langID}&type=1`
    );
    return response.data;
  } catch (error) {
    console.error("Error Remove product:", error);
  }
};

export const GetProductWishList = async (
  userId: string | undefined,
  langID: string,
  countryId?: string | undefined
) => {
  try {
    const response = await apiClient().post(
      `Services/UserWishlistGet?uid=${userId}&langID=${langID}&type=1&CountryID=${countryId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error Fetch Data ", error);
  }
};
