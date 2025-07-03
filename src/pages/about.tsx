import Layout from "@components/layout/layout";
import Container from "@components/ui/container";
import PageHeader from "@components/ui/page-header";
import { Link, Element } from "react-scroll";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { GetStaticProps } from "next";
import { About } from "src/api/routs";
import { getLocaleId } from "@utils/locale-mapping";
import Image from "next/image";

export default function AboutPage({ about }: any) {
  const { t } = useTranslation("privacy");
  return (
    <>
      {/* <PageHeader pageHeader={about?.AboutUs?.Label} /> */}
      <Container>
        <div className="flex flex-col md:flex-row gap-4">
          {/* Left Column */}
          <div className="w-full md:w-1/2 px-4 mt-12 border-b border-gray-300 lg:mt-14 xl:mt-16 lg:py-1 xl:py-0">
            <div className="flex flex-col justify-center">
              <div className="pt-0 ltr:md:pl-8 rtl:md:pr-8 lg:pt-2">
                <Element className="mb-10">
                  <div
                    className="text-sm leading-7 text-heading lg:text-base lg:leading-loose"
                    dangerouslySetInnerHTML={{
                      __html: t(`${about?.AboutUs?.Text}`),
                    }}
                  />
                </Element>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="w-full md:w-1/2 px-4 mt-12 border-b border-gray-300 lg:mt-14 xl:mt-16 lg:py-1 xl:py-2 flex justify-center">
            {" "}
            <Image
              src="https://vikikfashion.com/content/articles/2019/5/20/About%20Us_467x619.jpg"
              height={400}
              width={500}
              alt="www"
              unoptimized
              // className=" bg-gray-300 w-full h-full rounded-md"
            />
          </div>
        </div>
      </Container>
    </>
  );
}

AboutPage.Layout = Layout;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const lang = getLocaleId(locale);
  const about = await About(lang);
  console.log(about);
  return {
    props: {
      ...(await serverSideTranslations(locale!, [
        "common",
        "forms",
        "menu",
        "privacy",
        "footer",
      ])),
      about: about,
    },
  };
};
