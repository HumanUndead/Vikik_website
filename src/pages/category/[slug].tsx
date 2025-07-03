import Container from "@components/ui/container";
import Layout from "@components/layout/layout";
import Subscription from "@components/common/subscription";
import { ProductGrid } from "@components/product/product-grid";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import CategoryBanner from "@containers/category-banner";
import { GetServerSideProps } from "next";
import { GetProductsCategory } from "src/api/routs";
import { getLocaleId } from "@utils/locale-mapping";
import { prdoucstWithpages } from "src/api/type";

interface categoryProps {
  categoryData: prdoucstWithpages;
}

export default function Category({ categoryData }: categoryProps) {
  return (
    <div className="border-t-2 border-borderBottom">
      <Container>
        <CategoryBanner />
        <div className="pb-16 lg:pb-20">
          <ProductGrid className="3xl:grid-cols-6" data={categoryData} />
        </div>
        <Subscription />
      </Container>
    </div>
  );
}

Category.Layout = Layout;

export const getServerSideProps: GetServerSideProps = async (props) => {
  const { locale, params, query } = props;
  const categoryId: string | undefined = params?.slug?.toString().split("&")[1];
  const localeId = getLocaleId(locale);
  const page = query.page;
  const getCategory = await GetProductsCategory(
    categoryId,
    localeId,
    Number(page)
  );

  return {
    props: {
      ...(await serverSideTranslations(locale!, [
        "common",
        "forms",
        "menu",
        "footer",
      ])),
      categoryData: getCategory || null,
    },
  };
};
