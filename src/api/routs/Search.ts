import apiClient from "../api";

const SearchApi = async (data: string, langID: string) => {
  try {
    const search_data = await apiClient().post(
      `Services/SearchSuggestions?sch=${data}&count=10&langID=${langID}`
    );
    return search_data.data;
  } catch (error) {
    console.error("Error fetching Search:", error);
  }
};

export default SearchApi;
