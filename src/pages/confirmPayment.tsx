import Container from "@components/ui/container";
import Layout from "@components/layout/layout";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import ConfirmPayment from "@components/confirmPayment/confirmPayment";

export default function PaymentPage() {
  return (
    <>
      <Container>
        <div className="py-14 xl:py-20 px-0 2xl:max-w-screen-2xl xl:max-w-screen-xl mx-auto">
          <ConfirmPayment />
        </div>
      </Container>
    </>
  );
}

PaymentPage.Layout = Layout;

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, [
        "common",
        "forms",
        "menu",
        "footer",
      ])),
    },
  };
};
