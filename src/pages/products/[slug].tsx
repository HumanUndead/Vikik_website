import Container from "@components/ui/container";
import Layout from "@components/layout/layout";
import Subscription from "@components/common/subscription";
import ProductSingleDetails from "@components/product/product-single-details";
import RelatedProducts from "@containers/related-products";
import Divider from "@components/ui/divider";
import Breadcrumb from "@components/common/breadcrumb";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetServerSideProps } from "next";
import { GetProductDetails } from "src/api/routs";
import { getLocaleId } from "@utils/locale-mapping";
import { Product } from "src/api/type";

interface ProductPageProps {
  productDetails: { product: Product; sizes: Product[] };
}
export default function ProductPage({ productDetails }: ProductPageProps) {
  return (
    <>
      <Divider className="mb-0" />
      <Container>
        <div className="pt-8">
          <Breadcrumb />
        </div>
        <ProductSingleDetails data={productDetails} />
        {/* <RelatedProducts
          sectionHeading="text-related-products"
          relatedProducts={productDetails.sizes}
        />
        <Subscription /> */}
      </Container>
    </>
  );
}

ProductPage.Layout = Layout;

export const getServerSideProps: GetServerSideProps = async (props) => {
  const { locale, query } = props;

  const localeId = getLocaleId(locale);

  const productId = query.slug?.toString();

  const productDetails = await GetProductDetails(productId, localeId);

  return {
    props: {
      ...(await serverSideTranslations(locale!, [
        "common",
        "forms",
        "menu",
        "footer",
      ])),
      productDetails: productDetails,
    },
  };
};
