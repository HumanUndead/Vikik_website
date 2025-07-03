import apiClient from "../api";

export const GetPages = async (pageId: string, langID: string) => {
  try {
    const data = await apiClient().get(
      `Services/GetStaticPage?pageId=${pageId}&languageId=${langID}`
    );
    return data.data.Page;
  } catch (error) {
    console.log(error);
  }
};
