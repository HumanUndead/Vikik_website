import apiClient from "../api";
import { langId } from "../lang";
export const GetPrivacyPolicy = async () => {
  const lang = await langId();
  try {
    const response = await apiClient().get(
      `Services/PrivacyPolicy?langID=${lang}`
    );
    return response.data.PrivacyPolicy;
  } catch (error) {
    console.error("Error fetching Privacy Policy:", error);
  }
};

export const GetTerms = async () => {
  const lang = await langId();
  try {
    const response = await apiClient().get(
      `Services/TermsandConditions?langID=${lang}`
    );
    return response.data.TermsandConditions;
  } catch (error) {
    console.error("Error fetching Terms:", error);
  }
};
