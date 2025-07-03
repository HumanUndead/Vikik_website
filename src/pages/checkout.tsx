import Container from "@components/ui/container";
import Layout from "@components/layout/layout";
import PageHeader from "@components/ui/page-header";
import CheckoutForm from "@components/checkout/checkout-form";
import CheckoutCard from "@components/checkout/checkout-card";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetServerSideProps } from "next";
import { getLocaleId } from "@utils/locale-mapping";
import { CitiesGet, GetAddress } from "src/api/routs";
import { Address, City } from "src/api/type";

interface addressProps {
  address: Address[];
  cities: City[];
}
export default function CheckoutPage({ address, cities }: addressProps) {
  return (
    <>
      <PageHeader pageHeader="text-page-checkout" />
      <Container>
        <div className="py-14 xl:py-20 px-0 2xl:max-w-screen-2xl xl:max-w-screen-xl mx-auto flex flex-col md:flex-row w-full">
          <div className="md:w-full lg:w-3/5 flex  h-full flex-col -mt-1.5">
            <CheckoutForm address={address} cities={cities} />
          </div>
          <div className="md:w-full lg:w-2/5 ltr:md:ml-7 rtl:md:mr-7 ltr:lg:ml-10 rtl:lg:mr-10 ltr:xl:ml-14 rtl:xl:mr-14 flex flex-col h-full -mt-1.5">
            <CheckoutCard />
          </div>
        </div>
      </Container>
    </>
  );
}

CheckoutPage.Layout = Layout;

export const getServerSideProps: GetServerSideProps = async ({
  locale,
  req,
}) => {
  const localeId = getLocaleId(locale);
  const userId = req.cookies.userId;
  const addresses = await GetAddress(userId, localeId);
  const cities = await CitiesGet(localeId);
  return {
    props: {
      ...(await serverSideTranslations(locale!, [
        "common",
        "forms",
        "menu",
        "footer",
      ])),
      address: addresses,
      cities: cities,
    },
  };
};
