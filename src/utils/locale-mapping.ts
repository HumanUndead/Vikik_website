export const getLocaleId = (locale: string | undefined): string => {
  const localeMap: Record<string, string> = {
    en: "1",
    ar: "2",
  };

  return localeMap[locale || "en"] || "1";
};
