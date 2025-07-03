import Layout from "@components/layout/layout";
import AccountLayout from "@components/my-account/account-layout";
import OrderDetails from "@components/order/order-details";
import { getLocaleId } from "@utils/locale-mapping";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { UserOrderGet } from "src/api/routs";
import { Order } from "src/api/type";

interface OrderPageProps {
  ordersDetails: Order;
}

export default function OrderPage({ ordersDetails }: OrderPageProps) {
  console.log(ordersDetails);
  return (
    <AccountLayout>
      <OrderDetails className="p-0" orders={ordersDetails} />
    </AccountLayout>
  );
}

OrderPage.Layout = Layout;

export const getServerSideProps: GetServerSideProps = async (props) => {
  const { req, query, locale } = props;
  const localeId = getLocaleId(locale);
  const orderDetails = await UserOrderGet(
    req.cookies.userId,
    query.id as string,
    localeId
  );

  return {
    props: {
      ...(await serverSideTranslations(locale!, [
        "common",
        "forms",
        "menu",
        "footer",
      ])),
      ordersDetails: orderDetails,
    },
  };
};
