import { FC } from "react";
import { IoLocationSharp, IoMail, IoCallSharp } from "react-icons/io5";
import Link from "@components/ui/link";
import { useTranslation } from "next-i18next";
import mapImage from "@public/assets/images/map-image.jpg";
import Image from "next/image";

const data = [
  {
    id: 1,
    slug: "/",
    icon: <IoLocationSharp />,
    name: "text-address",
    title: "+96279060 0487",
  },
  {
    id: 2,
    slug: "/",
    icon: <IoMail />,
    name: "text-email",
    title: "+96279060 0487",
  },
  {
    id: 3,
    slug: "/",
    icon: <IoCallSharp />,
    name: "text-phone",
    title: "info@vikikfashion.com",
  },
];
interface Props {
  image?: HTMLImageElement;
}
const ContactInfoBlock: FC<Props> = () => {
  const { t } = useTranslation();
  return (
    <div className="mb-6 lg:border lg:rounded-md border-gray-300 lg:p-7">
      <h4 className="text-2xl md:text-lg font-bold text-heading pb-7 md:pb-10 lg:pb-6 -mt-1">
        {t("common:text-find-us-here")}
      </h4>
      {data?.map((item: any) => (
        <div key={`contact--key${item?.id}`} className="flex pb-7">
          <div className="flex flex-shrink-0 justify-center items-center p-1.5 border rounded-md border-gray-300 w-10 h-10">
            {item?.icon}
          </div>
          <div className="flex flex-col ltr:pl-3 rtl:pr-3 ltr:2xl:pl-4 rtl:2xl:pr-4">
            <h5 className="text-sm font-bold text-heading">
              {t(`common:${item?.name}`)}
            </h5>
            <span
              style={{ unicodeBidi: "bidi-override" }}
              className="text-sm mt-0"
            >
              {t(`${item?.title}`)}
            </span>
          </div>
        </div>
      ))}
      <Image
        src={mapImage}
        alt={t("text-map")}
        className="rounded-md"
        unoptimized
      />
    </div>
  );
};

export default ContactInfoBlock;
