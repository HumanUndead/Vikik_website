import Container from "@components/ui/container";
import Layout from "@components/layout/layout";
import Subscription from "@components/common/subscription";
import ShopDiscount from "@components/shop/discount";
import { ShopFilters } from "@components/shop/filters";
import StickyBox from "react-sticky-box";
import { ProductGrid } from "@components/product/product-grid";
import SearchTopBar from "@components/shop/top-bar";
import ActiveLink from "@components/ui/active-link";
import { BreadcrumbItems } from "@components/common/breadcrumb";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { ROUTES } from "@utils/routes";
import { GetServerSideProps } from "next";
import { GetProductsCategory } from "src/api/routs";
import { getLocaleId } from "@utils/locale-mapping";
import { prdoucstWithpages } from "src/api/type";
interface categoryProps {
  categoryData: prdoucstWithpages;
}
export default function Products({ categoryData }: categoryProps) {
  const { t } = useTranslation("common");

  return (
    <>
      <Container>
        <div className={`flex pt-8 pb-16 lg:pb-20`}>
          <div className="flex-shrink-0 ltr:pr-24 rtl:pl-24 hidden lg:block w-96">
            <StickyBox offsetTop={50} offsetBottom={20}>
              <div className="pb-7">
                <BreadcrumbItems separator="/">
                  <ActiveLink
                    href={"/"}
                    activeClassName="font-semibold text-heading"
                  >
                    {t("breadcrumb-home")}
                  </ActiveLink>
                  <ActiveLink
                    href={ROUTES.PRODUCT}
                    activeClassName="font-semibold text-heading"
                    className="capitalize"
                  >
                    {t("breadcrumb-products")}
                  </ActiveLink>
                </BreadcrumbItems>
              </div>
              <ShopFilters />
            </StickyBox>
          </div>

          <div className="w-full ltr:lg:-ml-9 rtl:lg:-mr-9">
            <SearchTopBar productsNumber={categoryData?.pages} />
            <ProductGrid data={categoryData} />
          </div>
        </div>
        <Subscription />
      </Container>
    </>
  );
}

Products.Layout = Layout;

export const getServerSideProps: GetServerSideProps = async (props) => {
  const { locale, query } = props;
  const localeId = getLocaleId(locale);
  const page = query.page;

  const getCategory = await GetProductsCategory(
    props.query.category as string,
    localeId,
    Number(page || 1),
    query.size as string,
    query.color as string
  );

  return {
    props: {
      ...(await serverSideTranslations(locale!, [
        "common",
        "forms",
        "menu",
        "footer",
      ])),
      categoryData: getCategory,
    },
  };
};
