import { useRef } from "react";
import { Swiper } from "swiper/react";
import { useRouter } from "next/router";
import { Navigation, Scrollbar, Pagination, Autoplay } from "swiper/modules";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { getDirection } from "@utils/get-direction";
import cn from "classnames";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "swiper/css/scrollbar";

type CarouselPropsType = {
  children: React.ReactNode;
  className?: string;
  buttonGroupClassName?: string;
  prevActivateId?: string;
  nextActivateId?: string;
  paginationFractionId?: string;
  prevButtonClasses?: string;
  nextButtonClasses?: string;
  buttonSize?: "default" | "small";
  paginationVariant?: "default" | "circle";
  paginationPosition?: "center" | "left" | "right";
  loop?: boolean;
  centeredSlides?: boolean;
  breakpoints?: {} | any;
  pagination?: {} | any;
  navigation?: {} | any;
  scrollbar?: {} | any;
  autoplay?: {} | any;
  type?: "rounded" | "circle" | "list";
  isFraction?: boolean;
};

const Carousel: React.FunctionComponent<CarouselPropsType> = ({
  children,
  className = "",
  buttonGroupClassName = "",
  prevActivateId = "",
  nextActivateId = "",
  paginationFractionId = "",
  prevButtonClasses = "ltr:left-0 rtl:right-0",
  nextButtonClasses = "ltr:right-0 rtl:left-0",
  buttonSize = "default",
  paginationVariant = "default",
  paginationPosition,
  breakpoints,
  loop = false,
  navigation = true,
  pagination = false,
  autoplay = false,
  type = "circle",
  isFraction = false,
  ...props
}) => {
  const { locale } = useRouter();
  const dir = getDirection(locale);
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const classPagination = paginationPosition
    ? `pagination-${paginationPosition}`
    : "";

  let nextButtonClassName = cn(
    "w-7 h-7 lg:w-8 lg:h-8 text-sm md:text-base lg:text-lg text-black flex items-center justify-center rounded bg-white absolute transition duration-250 hover:bg-gray-900 hover:text-white focus:outline-none transform ltr:shadow-navigation ltr:translate-x-1/2 rtl:shadow-navigationReverse rtl:-translate-x-1/2",
    {
      "rounded-full": type === "circle",
      "lg:w-9 lg:h-9 xl:w-10 xl:h-10 3xl:w-12 3xl:h-12 text-sm md:text-base lg:text-xl 3xl:text-2xl":
        buttonSize === "default",
      "!static": type === "list",
    },
    nextButtonClasses
  );

  let prevButtonClassName = cn(
    "w-7 h-7 lg:w-8 lg:h-8 text-sm md:text-base lg:text-lg text-black flex items-center justify-center rounded bg-white absolute transition duration-250 hover:bg-gray-900 hover:text-white focus:outline-none transform ltr:shadow-navigation ltr:-translate-x-1/2 rtl:shadow-navigationReverse rtl:translate-x-1/2",
    {
      "rounded-full": type === "circle",
      "lg:w-9 lg:h-9 xl:w-10 xl:h-10 3xl:w-12 3xl:h-12 text-sm md:text-base lg:text-xl 3xl:text-2xl":
        buttonSize === "default",
      "!static": type === "list",
    },
    prevButtonClasses
  );
  return (
    <div
      className={`carouselWrapper relative ${className} ${classPagination} ${
        paginationVariant === "circle" ? "dotsCircle" : ""
      } ${type === "list" ? "!static" : ""}`}
    >
      <Swiper
        modules={[Navigation, Autoplay, Pagination, Scrollbar]}
        loop={loop}
        slidesPerView="auto"
        autoplay={autoplay}
        breakpoints={breakpoints}
        pagination={pagination}
        dir={dir}
        key={dir}
        navigation={
          navigation
            ? {
                prevEl: prevActivateId.length
                  ? `#${prevActivateId}`
                  : prevRef.current!, // Assert non-null
                nextEl: nextActivateId.length
                  ? `#${nextActivateId}`
                  : nextRef.current!, // Assert non-null
              }
            : {}
        }
        {...props}
      >
        {children}
      </Swiper>
      {(Boolean(navigation) || Boolean(isFraction)) && (
        <div
          className={cn(
            `flex items-center w-full absolute top-2/4 z-10 ${buttonGroupClassName}`,
            {
              "": type === "list",
            }
          )}
        >
          {Boolean(isFraction) && (
            <div
              className="text-xs sm:text-base text-center !w-[auto]"
              id={paginationFractionId}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Carousel;
