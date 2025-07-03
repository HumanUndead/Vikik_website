import apiClient from "../api";

export const GetHomeWeb = async (langID: string) => {
  try {
    const data = await apiClient().get(`Services/WebHomePage?langID=${langID}`);
    return data.data;
  } catch (error) {
    console.log(error);
  }
};

// export const getNewHomePage = async (data?: any) => {
//   try {
//     const response = await apiClient().get(
//       "services/NewHomePage?parent=0&langid=1"
//     );
//     return response.data;
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// };
