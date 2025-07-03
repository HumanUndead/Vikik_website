import Layout from "@components/layout/layout";
import AccountLayout from "@components/my-account/account-layout";
import AccountDetails from "@components/my-account/account-details";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetServerSideProps } from "next";
import { GetUser } from "src/api/routs";
import { User } from "src/api/type";

interface accountProps {
  account: User;
}

export default function AccountDetailsPage({ account }: accountProps) {
  return (
    <AccountLayout>
      <AccountDetails account={account} />
    </AccountLayout>
  );
}

AccountDetailsPage.Layout = Layout;

export const getServerSideProps: GetServerSideProps = async ({
  locale,
  req,
}) => {
  const userId = req.cookies.userId;
  const account = await GetUser(userId);
  return {
    props: {
      ...(await serverSideTranslations(locale!, [
        "common",
        "forms",
        "menu",
        "footer",
      ])),
      account: account.User,
    },
  };
};
