import Container from "@components/ui/container";
import Layout from "@components/layout/layout";
import Subscription from "@components/common/subscription";

import PageHeader from "@components/ui/page-header";
import { faq } from "@settings/faq.settings";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetStaticProps } from "next";

export default function FAQ() {
  return (
    <>
      <PageHeader pageHeader="text-page-faq" />
      <Container>
        <div className="py-16 lg:py-20 px-0 max-w-5xl mx-auto space-y-4">
          {/* <Accordion items={faq} translatorNS="faq" /> */}
        </div>
        <Subscription />
      </Container>
    </>
  );
}

FAQ.Layout = Layout;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, [
        "common",
        "forms",
        "menu",
        "faq",
        "footer",
      ])),
    },
  };
};
