import { useTranslation } from "next-i18next";

export const useLanguageCode = () => {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;

  return currentLanguage === "en" ? "1" : "2";
};
