import { NextSeo } from "next-seo";
import Header from "@components/layout/header/header";
import Footer from "@components/layout/footer/footer";
import MobileNavigation from "@components/layout/mobile-navigation/mobile-navigation";
import Search from "@components/common/search";
import { useRouter } from "next/router";

export default function Layout({ children }: React.PropsWithChildren<{}>) {
  const router = useRouter();
  const isHomePage = router.pathname == "/";
  const paymentPage = router.pathname == "/confirmPayment";
  const importer = router.pathname == "/importer";
  return (
    <div className="flex flex-col min-h-screen">
      <NextSeo
        additionalMetaTags={[
          {
            name: "viewport",
            content: "width=device-width, initial-scale=1.0",
          },
        ]}
        title="Vikik"
        description="https://vikikfashion.com"
        canonical="/assets/images/logo-vikik.png"
        openGraph={{
          url: "https://vikikfashion.com/assets/images/logo-vikik.png",
          title: "https://vikikfashion.com",
          description: "https://vikikfashion.com",
        }}
      />
      {paymentPage || importer ? "" : <Header home={isHomePage} />}
      <main
        className="relative flex-grow"
        style={{
          minHeight: "-webkit-fill-available",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {children}
      </main>
      {paymentPage || importer ? "" : <Footer />}
      <MobileNavigation />
      <Search />
    </div>
  );
}
