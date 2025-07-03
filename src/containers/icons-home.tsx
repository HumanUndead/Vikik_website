import type React from "react";
import { HandCoins } from "lucide-react";
import Link from "next/link";
import cn from "classnames";
import { useTranslation } from "react-i18next";

interface IconLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  className?: string;
}

const IconLink = ({ href, icon, label, className }: IconLinkProps) => (
  <Link
    href={href}
    className={cn(
      "flex flex-col items-center justify-center rounded-xl bg-white border border-gray-100 shadow-sm",
      "hover:shadow-md hover:border-gray-400 hover:bg-gray-50 transition-all duration-300 ease-in-out",
      "transform hover:-translate-y-1 w-[127px] h-[140px] md:h-[90%]  md:w-full p-6 ",
      className
    )}
  >
    <div className="p-3 rounded-full bg-gray-50 mb-3">{icon}</div>
    <span className="text-[12px] md:text-base font-medium text-gray-800 text-center ">
      {label}
    </span>
  </Link>
);

function IconsHome() {
  const { t } = useTranslation("common");

  return (
    <div className="p-1 md:p-2 md:h-[350px] mb-3 bg-gray-200 rounded-2xl py-5 md:py-8 animate-shineRTL">
      <div className="flex overflow-auto  gap-1 md:gap-6 justify-center items-center h-full">
        <IconLink
          href="/products"
          icon={
            <img
              className="h-6 w-6 md:h-12 md:w-12"
              src="/assets/images/products.svg"
            ></img>
          }
          label={t("shop")}
        />

        <IconLink
          href="/loyalty-points"
          icon={
            <HandCoins className="h-6 w-6 md:h-12 md:w-12" strokeWidth={1.6} />
          }
          label={t("loyaltyPoints")}
        />

        <IconLink
          href="/our-branch"
          icon={
            <img
              className="h-6 w-6 md:h-12 md:w-12"
              src="/assets/images/branch.svg"
            ></img>
          }
          label={t("ourBranches")}
        />
      </div>
    </div>
  );
}

export default IconsHome;
