import Layout from "@components/layout/layout";
import AccountLayout from "@components/my-account/account-layout";
import OrdersTable from "@components/my-account/orders-table";
import { getLocaleId } from "@utils/locale-mapping";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { UserOrdersGet } from "src/api/routs";
import { ResponseOrders } from "src/api/type";

interface OrdersTablePageProps {
  orders: ResponseOrders;
}

export default function OrdersTablePage({ orders }: OrdersTablePageProps) {
  return (
    <AccountLayout>
      <OrdersTable orders={orders} />
    </AccountLayout>
  );
}

OrdersTablePage.Layout = Layout;

export const getServerSideProps: GetServerSideProps = async ({
  locale,
  req,
}) => {
  const localeId = getLocaleId(locale);
  const userId = req.cookies.userId;
  const orders = await UserOrdersGet(userId, localeId);

  return {
    props: {
      ...(await serverSideTranslations(locale!, [
        "common",
        "forms",
        "menu",
        "footer",
      ])),
      orders: orders,
    },
  };
};
