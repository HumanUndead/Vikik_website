import apiClient from "../api";

export const WebMainMenus = async (lang: string) => {
  try {
    const response = await apiClient().get(
      `Services/WebMainMenus?langID=${lang}&headerId=3087&footerId=3111&withSubs=true`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetch data", error);
    throw error;
  }
};
