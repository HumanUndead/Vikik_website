import apiClient from "../api";

export const GetArticle = async (langId: string, articleID: string) => {
  try {
    const data = await apiClient().get(
      `Services/CategoryArticles?langID=${langId}&categoryID=${articleID}`
    );
    return data.data;
  } catch (error) {
    console.log(error);
  }
};
