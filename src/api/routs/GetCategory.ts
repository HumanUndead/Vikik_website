import apiClient from "../api";

export const GetProductsCategory = async (
  id: string | undefined | number,
  langID: string,
  pagecount?: number,
  pColorId?: string | undefined,
  pSizeId?: string | undefined,

  specsId?: string | null,
  specsValue?: string | null
) => {
  try {
    const requestBody = [];
    if (specsId && specsValue) {
      requestBody.push({ Key: specsId, Value: specsValue });
    }

    //Services/CategoryProductsGet?page=1&langID=1&catid=1&pAsc=false&pColorId=1&pSizeId=1

    const products = await apiClient().post(
      `Services/CategoryProductsGet?page=${pagecount || 1}&langID=${langID}&${
        id && `catid=${id || ""}`
      }&pAsc=false&pColorId=${pColorId || ""}&pSizeId=${pSizeId || ""}`,
      requestBody
    );

    return products.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
};

export const GetCategory = async (langID: string) => {
  try {
    const categories = await apiClient().post(
      `Services/CategoriesGet?langID=${langID}`
    );
    return categories.data.categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
};

export const GetCategory1 = async (langID: string) => {
  try {
    const categories = await apiClient().post(
      `Services/CategoriesGet?langID=${langID}`
    );
    return categories.data.categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
};

export const GetSubCategory = async (parentId: string, langID: string) => {
  try {
    const categories = await apiClient().post(
      `Services/CategoriesGet?langID=${langID}&parentID=${parentId}`
    );
    return categories.data.categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
};

export const GetProductDetails = async (
  id: string | undefined | number,
  langID: string
) => {
  try {
    const product = await apiClient().post(
      `Services/ProductGet?productID=${id}&langID=${langID}`
    );
    return product.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
};

export const ProductReviewAdd = async (
  userId: string | undefined,
  prodId: string,
  review: string,
  rating: number
) => {
  try {
    const product = await apiClient().post(
      `Services/ProductReviewAdd?uid=${userId}&prodid=${prodId}&review=${review}d&rating=${rating}`
    );
    return product.data;
  } catch (error) {
    console.error("Error Create Review", error);
  }
};
