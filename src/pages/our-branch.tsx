import Layout from "@components/layout/layout";
import Container from "@components/ui/container";
import PageHeader from "@components/ui/page-header";
import { Element } from "react-scroll";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetPages } from "src/api/routs";
import { getLocaleId } from "@utils/locale-mapping";
import { GetServerSideProps } from "next";

export default function OurBranches({ ourBranches }: any) {
  return (
    <>
      <PageHeader pageHeader={ourBranches.Label} />
      <div className="mt-12 lg:mt-14 xl:mt-16 lg:py-1 xl:py-0 border-b border-gray-300 px-4 md:px-10 lg:px-7 xl:px-16 2xl:px-24 3xl:px-32 pb-9 md:pb-14 lg:pb-16 2xl:pb-20 3xl:pb-24">
        <Container>
          <div className="flex flex-col md:flex-row justify-center items-center">
            <div className="md:w-9/12 ltr:md:pl-8 rtl:md:pr-8 ">
              <Element className="mb-10">
                <div
                  className="text-heading text-sm leading-7 lg:text-base lg:leading-loose  "
                  dangerouslySetInnerHTML={{
                    __html: ourBranches?.Text,
                  }}
                />
              </Element>
            </div>
          </div>
          {/* <GeolocationModal articles={articles} /> */}
        </Container>
      </div>
    </>
  );
}

OurBranches.Layout = Layout;

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  const lang = getLocaleId(locale);
  const ourBranches = await GetPages("10015", lang);

  return {
    props: {
      ...(await serverSideTranslations(locale!, [
        "common",
        "forms",
        "menu",
        "terms",
        "footer",
      ])),
      ourBranches: ourBranches,
    },
  };
};
