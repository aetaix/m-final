"use client";

import { Language } from "@/types/directus-schema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@components/shared/custom/custom-select";
import { useParams, usePathname } from "next/navigation";

interface LanguageSwitcherProps {
  locales: Language[];
}

const LanguageSwitcher = ({ locales }: LanguageSwitcherProps) => {
  const pathname = usePathname();
  const { locale: currentLocale }: { locale: string } = useParams();
  return (
    <Select
      value={currentLocale}
      onValueChange={(value: string) => {
        const newPathname = pathname.replace(currentLocale, value);
        window.location.href = newPathname;
      }}
    >
      <SelectTrigger className="h-[36px] text-sm">
        {currentLocale.toLocaleUpperCase()}
      </SelectTrigger>
      <SelectContent className="border border-black">
        {/* Temporarily use only "english" */}
        {locales
          .filter((locale) => locale.code === "en")
          .map(({ name, code }) => (
            <SelectItem
              className="h-2xl-2 cursor-pointer border-b border-black text-base last:border-b-0"
              key={code}
              value={code}
            >
              {name}
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  );
};

export default LanguageSwitcher;
