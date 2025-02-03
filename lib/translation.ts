type GenericObject = { [key: string]: any };
type TranslationEntry = {
  languages_code: string;
  [key: string]: any;
};

export const applyTranslations = (
  obj: GenericObject,
  locale: string,
): GenericObject => {
  if (!obj || typeof obj !== "object") return obj;

  // Handle arrays
  if (Array.isArray(obj)) {
    return obj.map((item) => applyTranslations(item, locale));
  }

  // Create a new object to avoid mutations
  const result = { ...obj };

  // Process translations first if they exist
  if ("translations" in result) {
    const translation = (result.translations as TranslationEntry[]).find(
      (tr) => tr.languages_code === locale,
    );

    if (translation) {
      Object.entries(translation).forEach(([key, value]) => {
        if (!["id", "languages_code"].includes(key) && !key.endsWith("_id")) {
          result[key] = value;
        }
      });
    }
    delete result.translations;
  }

  // Recursively process other object properties
  Object.entries(result).forEach(([key, value]) => {
    if (value && typeof value === "object") {
      result[key] = applyTranslations(value, locale);
    }
  });

  result.locale = locale;
  return result;
};
