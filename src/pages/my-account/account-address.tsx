import Layout from "@components/layout/layout";
import AccountLayout from "@components/my-account/account-layout";
import AddressUser from "@components/my-account/address";
import { getLocaleId } from "@utils/locale-mapping";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { CitiesGet, GetAddress } from "src/api/routs";
import { Address, City } from "src/api/type";
interface addressProps {
  address: Address[];
  cities: City[];
}
export default function ChangePasswordPage({
  address = [],
  cities = [],
}: addressProps) {
  console.log(cities);
  return (
    <AccountLayout>
      <AddressUser address={address} cities={cities} />
    </AccountLayout>
  );
}

ChangePasswordPage.Layout = Layout;

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
