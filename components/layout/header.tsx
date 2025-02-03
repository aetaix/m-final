import { NavigationType } from "@/constants/enum";
import { getStaticPaths } from "@/lib/directus/fetchers";
import Navbar from "./navbar";

interface HeaderProps {
  locale: string;
}

export default async function Header({ locale }: HeaderProps) {
  const navigationData = await getStaticPaths(
    NavigationType.HEADER,
    locale,
  );
  return <Navbar navigationData={navigationData as any} />;
}
