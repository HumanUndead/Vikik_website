import Link from "@components/ui/link";
import Cookies from "js-cookie";

interface Props {
  href: string;
  className?: string;
  btnProps: React.ButtonHTMLAttributes<any>;
  isAuthorized?: boolean;
}

export default function AuthMenu({
  href,
  className,
  btnProps,
  children,
}: React.PropsWithChildren<Props>) {
  return Cookies.get("userId") ? (
    <Link href={href} className={className}>
      {children}
    </Link>
  ) : (
    <button {...btnProps} className={className} />
  );
}
