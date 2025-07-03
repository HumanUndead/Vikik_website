import Container from "@components/ui/container";
import CategoryBlock from "@containers/category-block";
import Layout from "@components/layout/layout";
import Divider from "@components/ui/divider";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetServerSideProps } from "next";
import { GetCategory } from "src/api/routs";
import { getLocaleId } from "@utils/locale-mapping";
import IconsHome from "@containers/icons-home";

export default function Home({ category }: { category: any }) {
  return (
    <>
      <Container>
        <CategoryBlock
          sectionHeading="text-shop-by-category"
          type="rounded"
          data={category}
        />
        <IconsHome />
      </Container>
      <Divider className="mb-0" />
    </>
  );
}

Home.Layout = Layout;

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  const localeId = getLocaleId(locale);
  const category = await GetCategory(localeId);

  return {
    props: {
      ...(await serverSideTranslations(locale!, [
        "common",
        "forms",
        "menu",
        "footer",
      ])),
      category,
    },
  };
};
