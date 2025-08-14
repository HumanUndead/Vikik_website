import { ProductImporterLockStatus } from "src/api/routs";
import Layout from "@components/layout/layout";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import ImporterProducts from "@components/product/importerProducts";

function importer() {
  return (
    <div>
      <ImporterProducts />
    </div>
  );
}

export default importer;

importer.Layout = Layout;

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
