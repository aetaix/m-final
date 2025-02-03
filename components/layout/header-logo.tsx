"use client";
import { useParams } from "next/navigation";
import { Icon } from "@/types/directus-schema";
import Link from "next/link";
import DirectusImageClient from "../shared/directus-image-client";

const HeaderLogo = ({ logo, darkMode }: { logo: Icon; darkMode: boolean }) => {

  const { locale } = useParams();
  
  return (
    <Link
      href={`/${locale}`}
      className="relative z-10 flex size-10 items-center justify-center"
    >
      <DirectusImageClient
        className="pointer-events-none object-contain text-white"
        fill
        asset={logo}
        variant="dark"
      />
      <div
        className="absolute inset-0 w-full overflow-hidden transition-all duration-500 ease-in-out"
        style={{ height: darkMode ? "0%" : "100%" }}
      >
        <DirectusImageClient
          className="pointer-events-none absolute top-[6px] object-contain text-white"
          fill
          asset={logo}
          variant="default"
        />
      </div>
    </Link>
  );
};

export default HeaderLogo;
