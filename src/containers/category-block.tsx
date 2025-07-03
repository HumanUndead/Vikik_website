import Card from "@components/common/card";
import Carousel from "@components/ui/carousel/carousel";
import CardLoader from "@components/ui/loaders/card-loader";
import CardRoundedLoader from "@components/ui/loaders/card-rounded-loader";
import { ROUTES } from "@utils/routes";
import { useEffect, useState } from "react";
import { SwiperSlide } from "swiper/react";

interface CategoriesProps {
  data?: any[];
  sectionHeading: string;
  className?: string;
  type?: "rounded" | "circle";
  roundedItemCount?: number;
  roundedSpaceBetween?: number;
  imgSize?: "large";
  demoVariant?: "ancient";
  disableBorderRadius?: boolean;
}

const CategoryBlock: React.FC<CategoriesProps> = ({
  data = [],
  className = "mb-10 md:mb-11 lg:mb-12 xl:mb-14 lg:pb-1 xl:pb-0",
  type = "rounded",
  roundedItemCount,
  roundedSpaceBetween = 20,
  disableBorderRadius = false,
}) => {
  const breakpoints = {
    "1720": {
      slidesPerView: 4,
      spaceBetween: roundedSpaceBetween || 10,
    },
    "1400": {
      slidesPerView: 4,
      spaceBetween: roundedSpaceBetween || 10,
    },
    "1200": {
      slidesPerView: 4,
      spaceBetween: roundedSpaceBetween || 20,
    },
    "1024": {
      slidesPerView: 3.2,
      spaceBetween: roundedSpaceBetween || 20,
    },
    "768": {
      slidesPerView: 2.3,
      spaceBetween: roundedSpaceBetween || 20,
    },
    "500": {
      slidesPerView: 1.3,
      spaceBetween: roundedSpaceBetween || 12,
    },
    "0": {
      slidesPerView: 1.3,
      spaceBetween: roundedSpaceBetween || 12,
    },
  };

  const [isMobileCentered, setIsMobileCentered] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileCentered(window.innerWidth < 500);
    };

    handleResize(); // run on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={`${className}  `}>
      <Carousel
        breakpoints={breakpoints}
        buttonGroupClassName="-mt-4 md:-mt-5 xl:-mt-7 "
        centeredSlides={isMobileCentered}
      >
        {!data
          ? Array.from({ length: roundedItemCount || 10 }).map((_, idx) => {
              if (type === "rounded") {
                return (
                  <SwiperSlide key={`card-rounded-${idx}`}>
                    <CardRoundedLoader uniqueKey={`card-rounded-${idx}`} />
                  </SwiperSlide>
                );
              }
              return (
                <SwiperSlide key={`card-circle-${idx}`}>
                  <CardLoader uniqueKey={`card-circle-${idx}`} />
                </SwiperSlide>
              );
            })
          : data
              ?.filter((category) =>
                ["70443", "70434", "70483", "70431"].includes(category.Id)
              )
              .map((category) => (
                <SwiperSlide
                  key={`category--key-${category.Id}`}
                  className="mb-4 hover:transform hover:-translate-y-2 transition-transform duration-300 ease-in-out animate-slideInLeft"
                >
                  <Card
                    imgSize={"large"}
                    item={category}
                    href={`${ROUTES?.CATEGORY}/${category?.name}&${category?.Id}`}
                    variant={type}
                    effectActive={true}
                    size={type === "rounded" ? "medium" : "small"}
                    disableBorderRadius={disableBorderRadius}
                  />
                </SwiperSlide>
              ))}
      </Carousel>
    </div>
  );
};

export default CategoryBlock;
