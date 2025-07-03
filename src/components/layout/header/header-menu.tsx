import Link from "@components/ui/link";
import { FaChevronDown } from "react-icons/fa";
import MegaMenu from "@components/ui/mega-menu";
import classNames from "classnames";
import ListMenu from "@components/ui/list-menu";
import { useTranslation } from "next-i18next";
import { WebMainMenus } from "src/api/routs";
import { useLanguageCode } from "@utils/useTranslation";
import { useEffect, useState } from "react";
import { MenuItem } from "src/api/type";
import { useQuery } from "@tanstack/react-query";

interface MenuProps {
  data?: any;
  className?: string;
  home?: boolean;
}

export const useHeaderMenu = (lang: string) => {
  return useQuery<MenuItem[]>({
    queryKey: ["headerMenu", lang],
    queryFn: () => WebMainMenus(lang),
    staleTime: Infinity,
  });
};

const HeaderMenu: React.FC<MenuProps> = ({ className, home }) => {
  const lang = useLanguageCode();
  const { data } = useHeaderMenu(lang);

  return (
    <nav
      className={classNames(
        `headerMenu flex ${home ? "" : "w-full"} relative`,
        className
      )}
    >
      {data?.WebHeader?.map((item: any) => (
        <div
          className={`menuItem group cursor-pointer py-7 ${
            item.StaticMenuItems ? "relative" : ""
          }`}
          key={item?.ID}
        >
          <Link
            href={item?.Path}
            className="relative inline-flex items-center  text-sm font-normal xl:text-base text-heading xl:px-4 group-hover:text-black"
          >
            {item?.Name}
            {item?.StaticMenuItems && (
              <span className="opacity-30 text-xs mt-1 xl:mt-0.5 w-4 flex justify-end">
                <FaChevronDown className="transition duration-300 ease-in-out transform group-hover:-rotate-180" />
              </span>
            )}
          </Link>

          {/* {item?.columns && Array.isArray(item.columns) && (
            <MegaMenu columns={item.columns} />
          )} */}

          {item?.StaticMenuItems && Array.isArray(item?.StaticMenuItems) && (
            <div className="absolute invisible bg-gray-200 opacity-0 group-hover:visible subMenu shadow-header ltr:left-0 rtl:right-0 group-hover:opacity-100">
              <ul className="py-5 text-sm text-body">
                {item?.StaticMenuItems?.map((menu: any, index: number) => {
                  const dept: number = 1;
                  const menuName: string = `sidebar-menu-${dept}-${index}`;

                  return (
                    <ListMenu
                      dept={dept}
                      data={menu}
                      hasSubMenu={menu.StaticMenuItems}
                      menuName={menuName}
                      key={menuName}
                      menuIndex={index}
                    />
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      ))}
    </nav>
  );
};

export default HeaderMenu;
