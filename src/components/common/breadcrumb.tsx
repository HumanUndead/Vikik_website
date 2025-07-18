import React from "react";
import ActiveLink from "@components/ui/active-link";
import useBreadcrumb, { convertBreadcrumbTitle } from "@utils/use-breadcrumb";
import { useTranslation } from "next-i18next";

interface Props {
  children: any;
}

const BreadcrumbItem: React.FC<Props> = ({ children, ...props }) => {
  return (
    <li
      className="text-sm text-body px-2.5 transition duration-200 ease-in ltr:first:pl-0 rtl:first:pr-0 ltr:last:pr-0 rtl:last:pl-0 hover:text-heading"
      {...props}
    >
      {children}
    </li>
  );
};

const BreadcrumbSeparator: React.FC<Props> = ({ children, ...props }) => {
  return (
    <li className="text-base text-body mt-0.5" {...props}>
      {children}
    </li>
  );
};

export const BreadcrumbItems = (props: any) => {
  let children: any = React.Children.toArray(props.children);

  children = children.map((child: string, index: number) => (
    <BreadcrumbItem key={`breadcrumb_item${index}`}>{child}</BreadcrumbItem>
  ));

  const lastIndex = children.length - 1;

  children = children.reduce((acc: any, child: string, index: number) => {
    const notLast = index < lastIndex;
    if (notLast) {
      acc.push(
        child,
        <BreadcrumbSeparator key={`breadcrumb_sep${index}`}>
          {props.separator}
        </BreadcrumbSeparator>
      );
    } else {
      acc.push(child);
    }
    return acc;
  }, []);

  return (
    <div className="flex items-center chawkbazarBreadcrumb">
      <ol className="flex items-center w-full overflow-hidden">{children}</ol>
    </div>
  );
};

const convertBreadcrumbTitle = (breadcrumb: string): string => {
  try {
    const [path, queryString] = breadcrumb.split("?");
    if (/^\d+$/.test(path) && queryString) {
      const params = new URLSearchParams(queryString);
      const name = params.get("name");
      if (name) {
        return decodeURIComponent(name).replace(/\+/g, " ").toLowerCase();
      }
    }

    return breadcrumb.toLowerCase();
  } catch (error) {
    console.error("Error parsing breadcrumb:", error);
    return breadcrumb;
  }
};

const Breadcrumb: React.FC<{ separator?: string }> = ({ separator = "/" }) => {
  const breadcrumbs = useBreadcrumb();
  const { t } = useTranslation("common");

  return (
    <BreadcrumbItems separator={separator}>
      <ActiveLink href="/" activeClassName="font-semibold text-heading">
        {t("breadcrumb-home")}
      </ActiveLink>

      {breadcrumbs?.map((breadcrumb: any) => (
        <ActiveLink
          href={breadcrumb.href}
          activeClassName="font-semibold text-heading"
          className="capitalize"
          key={breadcrumb.href}
        >
          {convertBreadcrumbTitle(breadcrumb.breadcrumb)}
        </ActiveLink>
      ))}
    </BreadcrumbItems>
  );
};

export default Breadcrumb;
