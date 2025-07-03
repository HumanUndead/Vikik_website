import apiClient from "../api";

export const About = async (langId: string) => {
  try {
    const data = await apiClient().get(`Services/AboutUs?langID=${langId}`);

    return data.data;
  } catch (error) {
    console.log(error);
  }
};
