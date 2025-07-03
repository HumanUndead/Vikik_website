import apiClient from "../api";

export const CategorySpecsGet = async (CategoryId: string, langID: string) => {
  try {
    const res = await apiClient().post(
      `Services/CategorySpecsGet?catid=${CategoryId}&langID=${langID}`
    );
    return res.data.categoryspecs;
  } catch (error) {
    console.error("Error fetching specs:", error);
  }
};

export const SpecsGet = async (sourceSpecs: string, langID: string) => {
  try {
    const res = await apiClient().post(
      `Services/SpecsGet?source=${sourceSpecs}&langID=${langID}`
    );
    return res.data.specs;
  } catch (error) {
    console.error("Error fetching specs:", error);
  }
};
