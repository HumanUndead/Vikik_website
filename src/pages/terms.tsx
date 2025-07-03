import Layout from "@components/layout/layout";
import Container from "@components/ui/container";
import PageHeader from "@components/ui/page-header";

import { Element } from "react-scroll";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { GetStaticProps } from "next";
import { GetPages } from "src/api/routs";
import { getLocaleId } from "@utils/locale-mapping";

export default function TermsPage({ terms }: any) {
  const { t } = useTranslation("terms");
  return (
    <>
      <PageHeader pageHeader={terms.Label} />
      <div className="mt-12 lg:mt-14 xl:mt-16 lg:py-1 xl:py-0 border-b border-gray-300 px-4 md:px-10 lg:px-7 xl:px-16 2xl:px-24 3xl:px-32 pb-9 md:pb-14 lg:pb-16 2xl:pb-20 3xl:pb-24">
        <Container>
          <div className="flex flex-col md:flex-row justify-center items-center">
            {/* End of section scroll spy menu */}

            <div className="md:w-9/12 ltr:md:pl-8 rtl:md:pr-8 ">
              <Element className="mb-10">
                <div
                  className="text-heading text-sm leading-7 lg:text-base lg:leading-loose  "
                  dangerouslySetInnerHTML={{
                    __html: t(`${terms?.Text}`),
                  }}
                />
              </Element>
            </div>
            {/* End of content */}
          </div>
        </Container>
      </div>
    </>
  );
}

TermsPage.Layout = Layout;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const lang = getLocaleId(locale);
  const terms = await GetPages("10012", lang);

  return {
    props: {
      ...(await serverSideTranslations(locale!, [
        "common",
        "forms",
        "menu",
        "terms",
        "footer",
      ])),
      terms: terms,
    },
  };
};
