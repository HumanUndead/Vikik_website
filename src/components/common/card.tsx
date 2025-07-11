import Link from "@components/ui/link";
import Image from "next/image";
import Text from "@components/ui/text";
import { FaLink } from "react-icons/fa";
import { LinkProps } from "next/link";
import { useTranslation } from "next-i18next";

interface Props {
  item?: any;
  variant?: "rounded" | "circle";
  size?: "small" | "medium";
  imgSize?: "large";
  effectActive?: boolean;
  href?: LinkProps["href"];
  showName?: boolean;
  disableBorderRadius?: boolean;
}

const Card: React.FC<Props> = ({
  item,
  variant = "rounded",
  size = "small",
  effectActive = false,
  href,
  showName = true,
  imgSize,
  disableBorderRadius = false,
}) => {
  const { name, FullImagePath } = item ?? {};

  const imageSize: any =
    (imgSize === "large" && 375) ||
    (size === "small" && 180) ||
    (size === "medium" && 198);

  const { t } = useTranslation("common");

  return (
    <Link
      href={href}
      className="group flex justify-center text-center flex-col "
    >
      <div
        className={`relative inline-flex mb-3.5 md:mb-4 lg:mb-5 xl:mb-6 mx-auto rounded-full w-full`}
      >
        <div className="flex w-full md:h-[460px] 2xl:h-[600px]">
          <Image
            src={
              process.env.NEXT_PUBLIC_BASE_API_URL +
              FullImagePath +
              "_450X530.webp"
            }
            alt={name || t("text-card-thumbnail")}
            width={600}
            height={900}
            quality={100}
            unoptimized
            className={` bg-gray-300 w-full h-full ${
              !disableBorderRadius &&
              (variant === "rounded" ? "rounded-md" : "rounded-full")
            }`}
          />
        </div>
        {effectActive === true && (
          <>
            <div
              className={`absolute top left bg-black w-full h-full opacity-0 transition-opacity duration-300 group-hover:opacity-30 ${
                !disableBorderRadius &&
                (variant === "rounded" ? "rounded-md" : "rounded-full")
              }`}
            />
            <div className="absolute top left h-full w-full flex items-center justify-center">
              <FaLink className="text-white text-base sm:text-xl lg:text-2xl xl:text-3xl transform opacity-0 scale-0 transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:scale-100" />
            </div>
          </>
        )}
      </div>
      {!!showName !== false && (
        <Text variant="heading" className="capitalize">
          {name}
        </Text>
      )}
    </Link>
  );
};

export default Card;
