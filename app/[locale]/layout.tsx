import Header from "@/components/layout/header";
import Providers from "@/components/layout/providers";
import ScrollToSection from "@/components/layout/scrollToSection";
import { ScrollProvider } from "@/contexts/ScrollContext";
import { fetchLanguages } from "@/lib/directus/fetchers";
import "@/styles/globals.css";
import { PublicEnvScript } from "next-runtime-env";
import { Inter } from "next/font/google";
import localFont from "next/font/local";

const arial = localFont({
  src: [
    {
      path: "../../assets/fonts/arial/ARIAL.woff",
      weight: "400",
    },
    {
      path: "../../assets/fonts/arial/ARIALLGT.woff",
      weight: "300",
    },
    {
      path: "../../assets/fonts/arial/ARIALBD.woff",
      weight: "600",
    },
    {
      path: "../../assets/fonts/arial/ArialCEMTBlack.woff",
      weight: "700",
    },
  ],
  display: "swap",
  preload: true,
  variable: "--font-arial-c",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export async function generateStaticParams() {
  const locales = await fetchLanguages();
  return locales.map(({ code }) => ({ locale: code }));
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return (
    <html lang={locale}>
      <head>
        <PublicEnvScript />
      </head>
      <body
        className={`relative overflow-x-hidden scroll-smooth font-sans lg:!overflow-y-auto ${inter.variable} ${arial.variable}`}
      >
        <Providers>
          <ScrollProvider>
            <Header locale={locale} />
            {children}
          </ScrollProvider>
        </Providers>
        <ScrollToSection />
      </body>
    </html>
  );
}
