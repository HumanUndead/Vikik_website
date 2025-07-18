import { useState } from "react";
import Image from "next/image";
import Text from "@components/ui/text";
import Button from "@components/ui/button";
import { RiShareBoxLine } from "react-icons/ri";
import { ROUTES } from "@utils/routes";
import { useRouter } from "next/router";
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  FacebookIcon,
  LinkedinIcon,
  TwitterIcon,
} from "react-share";
import { useTranslation } from "next-i18next";

interface ShopSidebarProps {
  data: any;
}

const ShopSidebar: React.FC<ShopSidebarProps> = ({ data }) => {
  const {
    query: { slug },
  } = useRouter();
  const { t } = useTranslation("common");
  const shareUrl = `${process.env.NEXT_PUBLIC_SITE_URL}${ROUTES.SHOPS}/${slug}`;
  const [follow, setFollow] = useState(Boolean(false));

  const followHandel = () => {
    return setFollow(!follow);
  };
  const shareHandel = () => {
    return console.log(shareUrl);
  };

  return (
    <div className="flex flex-col px-6 pt-10 lg:pt-14">
      <div className="w-full pb-8 text-center border-b border-gray-300">
        <div className="w-32 h-32 mx-auto lg:w-auto lg:h-auto">
          <Image
            src={data?.logo?.original!}
            alt={data?.name}
            width={180}
            height={180}
            unoptimized
            className="rounded-xl"
          />
        </div>
        <Text variant="heading" className="mt-6 mb-1.5">
          {data?.name}
        </Text>
        <Text>{data?.description}</Text>
        <div className="flex items-center flex-wrap justify-center gap-x-2 pt-4 mt-0.5">
          <FacebookShareButton url={shareUrl}>
            <FacebookIcon
              size={25}
              round
              className="transition-all hover:opacity-90"
            />
          </FacebookShareButton>
          <TwitterShareButton url={shareUrl}>
            <TwitterIcon
              size={25}
              round
              className="transition-all hover:opacity-90"
            />
          </TwitterShareButton>
          <LinkedinShareButton url={shareUrl}>
            <LinkedinIcon
              size={25}
              round
              className="transition-all hover:opacity-90"
            />
          </LinkedinShareButton>
        </div>
      </div>
      <div className="space-y-6 py-7">
        <div className="block">
          <h4 className="text-heading font-semibold text-sm mb-1.5">
            {t("text-address")}:
          </h4>
          <Text>{data?.address}</Text>
        </div>
        <div className="block">
          <h4 className="text-heading font-semibold text-sm mb-1.5">
            {t("text-phone")}:
          </h4>
          <div className="flex items-center justify-between">
            <Text>{data?.phone}</Text>
            <button className="flex-shrink-0 text-sm font-semibold transition-all text-heading hover:opacity-80">
              {t("text-call-now")}
            </button>
          </div>
        </div>
        <div className="block">
          <h4 className="text-heading font-semibold text-sm mb-1.5">
            {t("text-website")}:
          </h4>
          <div className="flex items-center justify-between">
            <Text>{data?.website}</Text>
            <a
              href={`https://${data?.website}`}
              target="_blank"
              className="flex-shrink-0 text-sm font-semibold transition-all text-heading hover:opacity-80"
            >
              {t("text-visit-site")}
            </a>
          </div>
        </div>
        <div className="block">
          <h4 className="text-heading font-semibold text-sm mb-1.5">
            {t("text-ratings")}:
          </h4>
          <Text>{data?.ratings}</Text>
        </div>
      </div>
      <div className="border-t border-gray-300 flex gap-x-2.5 py-7">
        <Button
          variant="smoke"
          className={`w-full ${follow === true && "bg-gray-300"}`}
          onClick={followHandel}
        >
          {t("text-follow")}
        </Button>
        <Button variant="smoke" className="w-full" onClick={shareHandel}>
          {t("text-share")} <RiShareBoxLine className="ltr:ml-1 rtl:mr-1" />
        </Button>
      </div>
    </div>
  );
};

export default ShopSidebar;
