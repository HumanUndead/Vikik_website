import cn from "classnames";
import Image from "next/image";
import { useEffect, useState, type FC } from "react";
import { useUI } from "@contexts/ui.context";
import ProductViewIcon from "@components/icons/product-view-icon";
import ProductWishIcon from "@components/icons/product-wish-icon";
import ProductCompareIcon from "@components/icons/product-compare-icon";
import RatingDisplay from "@components/common/rating-display";
import { Product } from "src/api/type";

interface ProductProps {
  product: Product;
  className?: string;
  contactClassName?: string;
  imageContentClassName?: string;
  variant?:
    | "grid"
    | "gridSlim"
    | "list"
    | "listSmall"
    | "gridModern"
    | "gridModernWide"
    | "gridTrendy"
    | "rounded"
    | "circle";
  imgWidth?: number | string;
  imgHeight?: number | string;
  imgLoading?: "eager" | "lazy";
  hideProductDescription?: boolean;
  showCategory?: boolean;
  showRating?: boolean;
  bgTransparent?: boolean;
  bgGray?: boolean;
  demoVariant?: "ancient";
  disableBorderRadius?: boolean;
}

const ProductCard: FC<ProductProps> = ({
  product,
  className = "",
  contactClassName = "",
  imageContentClassName = "",
  variant = "list",
  imgWidth = 340,
  imgHeight = 500,
  imgLoading,
  bgTransparent = false,
  bgGray = false,
  demoVariant,
  disableBorderRadius = false,
}) => {
  const { openModal, setModalView, setModalData } = useUI();
  const [isClient, setIsClient] = useState(false);
  const code = process.env.NEXT_PUBLIC_CURRENCY;
  function handlePopupView() {
    setModalData({ data: product });
    setModalView("PRODUCT_VIEW");
    return openModal();
  }

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient ? (
    <div
      className={cn(
        `group box-border overflow-hidden flex ${
          !disableBorderRadius && "rounded-md"
        } cursor-pointer`,
        {
          "ltr:pr-0 rtl:pl-0 pb-2 lg:pb-3 flex-col items-start transition duration-200 ease-in-out transform hover:-translate-y-1 md:hover:-translate-y-1.5 hover:shadow-product":
            variant === "grid" ||
            variant === "gridModern" ||
            variant === "gridModernWide" ||
            variant === "gridTrendy",
          " bg-white":
            (variant === "grid" && !bgGray) ||
            (variant === "gridModern" && !bgGray) ||
            (variant === "gridModernWide" && !bgGray) ||
            (variant === "gridTrendy" && !bgGray) ||
            (variant === "gridSlim" && !bgGray),
          "bg-gray-200": variant === "list" || bgGray,
          "ltr:pr-0 rtl:pl-0 md:pb-1 flex-col items-start":
            variant === "gridSlim",
          "items-center border border-gray-100 transition duration-200 ease-in-out transform hover:-translate-y-1 hover:shadow-listProduct":
            variant === "listSmall",
          "flex-row items-center transition-transform ease-linear ltr:pr-2 rtl:pl-2 ltr:lg:pr-3 rtl:lg:pl-3 ltr:2xl:pr-4 rtl:2xl:pl-4":
            variant === "list",
          "!bg-transparent": variant === "grid" && bgTransparent === true,
        },
        className
      )}
      onClick={handlePopupView}
      role="button"
      title={product?.Name}
    >
      <div
        className={cn(
          "flex",
          {
            "mb-3 md:mb-3.5": variant === "grid",
            "mb-3 md:mb-3.5 pb-0": variant === "gridSlim",
            "flex-shrink-0 w-32 sm:w-44 md:w-36 lg:w-44":
              variant === "listSmall",
            "mb-3 md:mb-3.5 relative":
              variant === "gridModern" ||
              variant === "gridModernWide" ||
              variant === "gridTrendy",
          },
          imageContentClassName
        )}
      >
        <Image
          src={
            process.env.NEXT_PUBLIC_BASE_API_URL +
            product.FullImagePath +
            ".jpg"
          }
          width={demoVariant === "ancient" ? 600 : Number(imgWidth)}
          height={demoVariant === "ancient" ? 720 : Number(imgHeight)}
          loading={imgLoading}
          quality={100}
          alt={product?.Name || "Product Image"}
          unoptimized
          className={cn(
            `bg-gray-300  ${!disableBorderRadius && "rounded-s-md"}`,
            {
              "w-full transition duration-200 ease-in":
                variant === "grid" ||
                variant === "gridModern" ||
                variant === "gridModernWide" ||
                variant === "gridTrendy",
              "rounded-md group-hover:rounded-b-none":
                (variant === "grid" && !disableBorderRadius) ||
                (variant === "gridModern" && !disableBorderRadius) ||
                (variant === "gridModernWide" && !disableBorderRadius) ||
                (variant === "gridTrendy" && !disableBorderRadius),
              "rounded-md transition duration-150 ease-linear transform group-hover:scale-105":
                variant === "gridSlim",
              "rounded-s-md transition duration-200 ease-linear transform group-hover:scale-105":
                variant === "list",
            }
          )}
        />

        {variant === "gridModernWide" && (
          <div className="absolute ltr:right-2 rtl:left-2 ltr:sm:right-3 rtl:sm:left-3 bottom-6 space-y-2 w-[32px] sm:w-[42px] lg:w-[52px]">
            <ProductViewIcon className="w-full transition duration-300 ease-in delay-100 bg-white rounded-md sm:opacity-0 group-hover:opacity-100" />
            <ProductWishIcon className="w-full transition duration-300 ease-in delay-200 bg-white rounded-md sm:opacity-0 group-hover:opacity-100" />
            <ProductCompareIcon className="w-full transition duration-300 ease-in delay-300 bg-white rounded-md sm:opacity-0 group-hover:opacity-100" />
          </div>
        )}
      </div>
      <div
        className={cn(
          "w-full overflow-hidden p-2",
          {
            "md:px-2.5 xl:px-4": variant === "grid",

            "px-2 md:px-2.5 xl:px-4 h-full flex flex-col":
              variant === "gridModern" ||
              variant === "gridModernWide" ||
              variant === "gridTrendy",

            "ltr:pl-0 rtl:pr-0": variant === "gridSlim",
            "px-4 lg:px-5 2xl:px-4": variant === "listSmall",
          },
          contactClassName
        )}
      >
        {/* <div className="flex flex-col md:flex-row md:items-center lg:flex-row xl:flex-row 2xl:flex-row  mb-0.5 items-start">
          <RatingDisplay rating={product.Rating} />
        </div> */}

        <h2
          className={cn("truncate mb-1", {
            "text-sm md:text-base": variant === "grid",
            "font-semibold": demoVariant !== "ancient",
            "font-bold": demoVariant === "ancient",
            "text-xs sm:text-sm md:text-base":
              variant === "gridModern" ||
              variant === "gridModernWide" ||
              variant === "gridTrendy",
            "md:mb-1.5 text-sm sm:text-base md:text-sm lg:text-base xl:text-lg":
              variant === "gridSlim",
            "text-sm sm:text-base md:mb-1.5 pb-0": variant === "listSmall",
            "text-sm sm:text-base md:text-sm lg:text-base xl:text-lg md:mb-1.5":
              variant === "list",
            "text-white": bgTransparent,
            "text-heading": !bgTransparent,
          })}
        >
          {product?.Name}
        </h2>
        {product?.Description && (
          <p
            dangerouslySetInnerHTML={{ __html: product.Description }}
            className="text-body text-xs lg:text-sm leading-normal xl:leading-relaxed max-w-[250px] truncate"
          ></p>
        )}
        <div
          className={`font-semibold text-sm sm:text-base mt-1.5 flex flex-wrap gap-x-2 ${
            variant === "grid"
              ? "lg:text-lg lg:mt-2.5"
              : "sm:text-xl md:text-base lg:text-xl md:mt-2.5 2xl:mt-3"
          }
          ${
            variant === "gridModern" ||
            variant === "gridModernWide" ||
            variant === "gridTrendy"
              ? "flex flex-col-reverse !gap-x-0 !mt-auto"
              : ""
          } ${bgTransparent ? "text-white" : "text-heading"}`}
        >
          <span
            className={`inline-block ${
              demoVariant === "ancient" && "font-bold text-gray-900 text-lg"
            }`}
          >
            {product.Price} {code}
          </span>
          {product.OldPrice > 0 && (
            <del
              className={`sm:text-base font-normal ${
                bgTransparent ? "text-white/70" : "text-gray-800"
              }`}
            >
              {product.OldPrice} {code}
            </del>
          )}
        </div>
      </div>

      {(variant === "gridTrendy" || variant === "gridModern") && (
        <div className="absolute flex ltr:right-2 rtl:left-2 bottom-2 gap-x-2">
          <ProductWishIcon className="transition ease-in duration-300 sm:opacity-0 group-hover:opacity-100 delay-200 w-[35px] sm:w-[42px] lg:w-[52px] bg-[#F1F3F4] rounded-md" />
          <ProductCompareIcon className="transition ease-in duration-300 sm:opacity-0 group-hover:opacity-100 delay-300 w-[35px] sm:w-[42px] lg:w-[52px] bg-[#F1F3F4] rounded-md" />
        </div>
      )}
    </div>
  ) : (
    ""
  );
};

export default ProductCard;
