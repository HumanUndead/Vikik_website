import Layout from "@components/layout/layout";
import Container from "@components/ui/container";
import PageHeader from "@components/ui/page-header";
import { privacyPolicy } from "@settings/privacy-settings";
import { Link, Element } from "react-scroll";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { GetStaticProps } from "next";

function makeTitleToDOMId(title: string) {
  return title.toLowerCase().split(" ").join("_");
}

export default function PrivacyPage() {
  const { t } = useTranslation("privacy");
  return (
    <>
      <PageHeader pageHeader="text-page-privacy-policy" />
      <div className="px-4 mt-12 border-b border-gray-300 lg:mt-14 xl:mt-16 lg:py-1 xl:py-0 md:px-10 lg:px-7 xl:px-16 2xl:px-24 3xl:px-32 pb-9 md:pb-14 lg:pb-16 2xl:pb-20 3xl:pb-24">
        <Container>
          <div className="flex flex-col md:flex-row">
            {/* <nav className="mb-8 md:w-72 xl:w-3/12 md:mb-0">
              <ol className="sticky z-10 md:top-16 lg:top-28">
                {privacyPolicy?.map((item, index) => (
                  <li key={item.id}>
                    <Link
                      spy={true}
                      offset={-120}
                      smooth={true}
                      duration={500}
                      to={makeTitleToDOMId(item.title)}
                      activeClass="text-heading font-semibold"
                      className="block cursor-pointer py-3 lg:py-3.5  text-sm lg:text-base  text-gray-700 uppercase"
                    >
                      {(index <= 9 ? '0' : '') +
                        index +
                        ' ' +
                        t(`${item.title}`)}
                    </Link>
                  </li>
                ))}
              </ol>
            </nav>
            End of section scroll spy menu */}

            <div className="pt-0 md:w-9/12 ltr:md:pl-8 rtl:md:pr-8 lg:pt-2">
              {privacyPolicy?.map((item) => (
                // @ts-ignore
                <Element
                  key={item.title}
                  id={makeTitleToDOMId(item.title)}
                  className="mb-10"
                >
                  <h2 className="mb-4 text-lg font-bold md:text-xl lg:text-2xl text-heading">
                    {t(`${item.title}`)}
                  </h2>
                  <div
                    className="text-sm leading-7 text-heading lg:text-base lg:leading-loose"
                    dangerouslySetInnerHTML={{
                      __html: t(`${item.description}`),
                    }}
                  />
                </Element>
              ))}
            </div>
            {/* End of content */}
          </div>
        </Container>
      </div>
    </>
  );
}

PrivacyPage.Layout = Layout;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, [
        "common",
        "forms",
        "menu",
        "privacy",
        "footer",
      ])),
    },
  };
};
