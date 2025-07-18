import Image from "next/image";
import Text from "@components/ui/text";
import cn from "classnames";
import Link from "@components/ui/link";
import { useTranslation } from "next-i18next";
import { useSsrCompatible } from "@utils/use-ssr-compatible";
const data = {
  title: "app-heading",
  subTitle: "app-sub-heading",
  appImage: "/assets/images/app.png",
  appImage2: "/assets/images/app2.png",
  appImage3: "/assets/images/app3.png",
  appButtons: [
    {
      id: 1,
      slug: "/",
      altText: "button-app-store",
      appButton: "/assets/images/app-store.svg",
      buttonWidth: 209,
      buttonHeight: 60,
    },
    {
      id: 2,
      slug: "/",
      altText: "button-play-store",
      appButton: "/assets/images/play-store.svg",
      buttonWidth: 209,
      buttonHeight: 60,
    },
  ],
};

interface Props {
  className?: string;
  variant?: "modern" | "ancient";
  disableBorderRadius?: boolean;
}

const DownloadApps: React.FC<Props> = ({
  className,
  variant,
  disableBorderRadius = false,
}) => {
  const { appButtons, title, subTitle, appImage, appImage2, appImage3 } = data;
  const { t } = useTranslation("common");
  const hasMounted = useSsrCompatible(true, false);
  return (
    <div
      className={cn(
        "flex justify-between items-end rounded-lg bg-gray-200 pt-5 md:pt-8 lg:pt-10 xl:pt-14 px-6 md:px-12 lg:px-20 2xl:px-24 3xl:px-36",
        className
      )}
    >
      <div className="flex-shrink-0 w-full pb-5 sm:w-60 md:w-96 lg:w-auto lg:max-w-lg xl:max-w-xl lg:flex lg:items-center md:pb-8 lg:pb-12 xl:pb-16">
        <div className="py-4 text-center md:py-6 xl:py-8 ltr:sm:text-left rtl:sm:text-right">
          <Text
            variant="mediumHeading"
            className="-mt-1 mb-2 md:mb-3 lg:mb-3.5 xl:mb-4"
          >
            {t(`${title}`)}
          </Text>
          {hasMounted && (
            <h2
              className="mb-6 font-normal leading-7 text-heading text-md sm:text-xl md:text-3xl xl:text-4xl 2xl:text-5xl sm:leading-8 md:leading-snug xl:leading-relaxed 2xl:leading-snug md:mb-8 lg:mb-9 xl:mb-12 2xl:mb-14 ltr:lg:pr-20 ltr:2xl:pr-0 rtl:lg:pl-20 rtl:2xl:pl-0"
              dangerouslySetInnerHTML={{
                __html: t(`${subTitle}`),
              }}
            />
          )}
          <div className="flex justify-center px-6 sm:justify-start gap-x-2 md:gap-x-3 sm:px-0">
            {appButtons?.map((item) => (
              <Link
                key={item.id}
                href={item.slug}
                className="inline-flex transition duration-200 ease-in hover:box-shadow hover:opacity-80"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.appButton}
                  alt={t(`${item.altText}`)}
                  className={`w-36 lg:w-44 xl:w-auto ${
                    !disableBorderRadius && "rounded-md"
                  }`}
                  width={item.buttonWidth}
                  height={item.buttonHeight}
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="hidden sm:flex items-end ltr:pl-4 rtl:pr-4 ltr:-mr-0.5 rtl:-ml-0.5 ltr:2xl:-mr-1.5 rtl:2xl:-ml-1.5 w-60 md:w-72 lg:w-96 xl:w-auto">
        <Image
          src={
            variant === "modern"
              ? appImage2
              : variant === "ancient"
              ? appImage3
              : appImage
          }
          alt={t("text-app-thumbnail")}
          width={375}
          height={430}
          unoptimized
        />
      </div>
    </div>
  );
};

export default DownloadApps;
