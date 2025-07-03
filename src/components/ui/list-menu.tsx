import { useTranslation } from "next-i18next";
import Link from "./link";
import cn from "classnames";

const ListMenu = ({ data, hasMegaMenu }: any) => {
  const { t } = useTranslation("menu");
  return (
    <li className={cn(!hasMegaMenu ? "group relative" : "")}>
      <Link
        href={data?.Path}
        className="flex items-center py-2 ltr:pl-5 rtl:pr-5 ltr:xl:pl-7 rtl:xl:pr-7 ltr:pr-3 rtl:pl-3 ltr:xl:pr-3.5 rtl:xl:pl-3.5 hover:text-heading hover:bg-gray-300"
      >
        {data?.icon && (
          <span className="inline-flex ltr:mr-2 rtl:ml-2">{data?.icon}</span>
        )}
        {t(data?.Name)}
        {/* {data. && (
          <span className="text-sm mt-0.5 shrink-0 ltr:ml-auto rtl:mr-auto">
            <IoIosArrowForward className="transition duration-300 ease-in-out text-body group-hover:text-black" />
          </span>
        )} */}
      </Link>
      {/* {hasSubMenu && (
        <SubMenu dept={dept} data={data.subMenu} menuIndex={menuIndex} />
      )} */}

      {/* -------------------------hasMegaMenu || hasBrands || hasBanners------------------ */}
    </li>
  );
};

const SubMenu: React.FC<any> = ({ dept, data, menuIndex }) => {
  dept = dept + 1;
  return (
    <ul className="absolute z-0 invisible w-56 py-3 bg-gray-200 opacity-0 subMenuChild shadow-subMenu ltr:right-full rtl:left-full ltr:2xl:right-auto rtl:2xl:left-auto ltr:2xl:left-full rtl:2xl:right-full top-4">
      {data?.map((menu: any, index: number) => {
        const menuName: string = `sidebar-submenu-${dept}-${menuIndex}-${index}`;

        return (
          <ListMenu
            dept={dept}
            data={menu}
            hasSubMenu={menu.subMenu}
            menuName={menuName}
            key={menuName}
            menuIndex={index}
          />
        );
      })}
    </ul>
  );
};

export default ListMenu;
