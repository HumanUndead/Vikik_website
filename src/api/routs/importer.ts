import apiClient from "../api";

export const ProductImporterLockStatus = async () => {
  try {
    const product = await apiClient().get(`Vikik/ProductImporterLockStatus`);
    return product.data;
  } catch (error) {
    console.error("Error Fetch Data", error);
  }
};

export const ProdImporter = async () => {
  try {
    const product = await apiClient().post(
      `Vikik/ProdImporter?clearConfirmation=""`
    );
    return product.data;
  } catch (error) {
    console.error("Error Fetch Data", error);
  }
};
