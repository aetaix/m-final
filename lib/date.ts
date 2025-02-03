import { defaultLocale } from "@/constants/locale";
import { format } from "date-fns";
import * as locales from "date-fns/locale";

const dateFormatTemplate = "MMM d, yyyy";

export const formatLocalizedDate = (
  dateString: string = "",
  localeKey?: keyof typeof locales,
) =>
  format(dateString, dateFormatTemplate, {
    locale: locales[localeKey || (defaultLocale as keyof typeof locales)],
  });
