import type { FC } from "react";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import Logo from "@components/ui/logo";

interface Props {
  className?: string;
  data: {
    widgetTitle?: string;
    lists: {
      id: string;
      path?: string;
      title: string;
      icon?: any;
    }[];
    logo?: any;
    description?: string;
    isCompanyIntroduction?: boolean;
  };
  variant?: "contemporary";
}

const WidgetLink: FC<Props> = ({ className, data }) => {
  const { widgetTitle, lists } = data;
  const { description } = data;
  const { t } = useTranslation("footer");

  return (
    <div
      className={`${className} ${data?.isCompanyIntroduction && "col-span-2"}`}
    >
      {!data?.isCompanyIntroduction ? (
        <>
          <ul className="text-xs lg:text-sm text-body flex flex-col space-y-3 lg:space-y-3.5">
            <h4 className="mb-5 text-sm font-semibold text-heading md:text-base xl:text-lg 2xl:mb-6 3xl:mb-7 ltr:text-left rtl:text-right">
              {t(`${widgetTitle}`)}
            </h4>
            {lists.map((list) => (
              <li
                key={`widget-list--key${list.id}`}
                className="flex items-baseline"
              >
                {list?.icon && (
                  <span className="ltr:mr-3 rtl:ml-3 relative top-0.5 lg:top-1 text-sm lg:text-base">
                    {list?.icon}
                  </span>
                )}
                <Link
                  style={{ unicodeBidi: "bidi-override" }}
                  href={list.path ? list.path : "#!"}
                  className="transition-colors duration-200 hover:text-black"
                >
                  {t(`${list.title}`)}
                </Link>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <div className="ltr:mr-4 rtl:ml-4 flex flex-col space-y-7 lg:space-y-7.5">
          <Logo className="" />
          <p className="text-sm font-normal text-[#1D1E1F] leading-6 max-w-[334px] ">
            {description}
          </p>
          <ul className="text-xs lg:text-sm text-body flex items-center gap-x-3 lg:gap-x-3.5">
            {lists.map((list) => (
              <li
                key={`widget-list--key${list.id}`}
                className="flex items-baseline"
              >
                {list?.icon && (
                  <span className="ltr:mr-3 rtl:ml-3 relative top-0.5 lg:top-1 text-sm lg:text-base">
                    {list?.icon}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default WidgetLink;
