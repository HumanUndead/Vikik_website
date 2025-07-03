import Image from "next/legacy/image";
import Link from "@components/ui/link";
import cn from "classnames";
import { siteSettings } from "@settings/site-settings";

const Logo: React.FC<React.AnchorHTMLAttributes<{}>> = ({
  className,
  ...props
}) => {
  return (
    <Link
      href={siteSettings.logo.href}
      className={cn("inline-flex focus:outline-none", className)}
      {...props}
    >
      <Image
        src={"https://vikikfashion.com/assets/images/logo-vikik.png"}
        alt={siteSettings.logo.alt}
        height={45}
        width={103}
        layout="fixed"
        loading="eager"
        className=" !min-h-[38px] !min-w-[86px] md:!h-[45px] md:!w-[103px] ltr:!left-[-20px] rtl:!right-[-20px] ltr:md:!left-0 rtl:md:!right-0"
        unoptimized
      />
    </Link>
  );
};

export default Logo;

("https://vikikfashion.com/assets/images/logo-vikik.png");
