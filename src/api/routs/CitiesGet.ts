import apiClient from "../api";

export const CitiesGet = async (lang: string) => {
  try {
    const data = await apiClient().post(
      `Services/CitiesGet?countryId=7&langID=${lang}`
    );
    return data.data.Cities;
  } catch (error) {
    console.log(error);
  }
};
