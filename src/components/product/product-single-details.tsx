import React, { useEffect, useState } from "react";
import Button from "@components/ui/button";
import Counter from "@components/common/counter";
import { useCart } from "@contexts/cart/cart.context";
import Link from "@components/ui/link";
import { useWindowSize } from "@utils/use-window-size";
import Carousel from "@components/ui/carousel/carousel";
import { SwiperSlide } from "swiper/react";
import { useSsrCompatible } from "@utils/use-ssr-compatible";
import { Product } from "src/api/type";
import ColorsAndSizesProduct from "@utils/colors-sizes-product";
import ProductMetaReview from "./product-meta-review";
import { toast, ToastContainer } from "react-toastify";
import { useTranslation } from "react-i18next";

interface productSingleDetailsProps {
  data: { product: Product; sizes: Product[] };
}

const productGalleryCarouselResponsive = {
  "768": {
    slidesPerView: 2,
  },
  "0": {
    slidesPerView: 1,
  },
};

const ProductSingleDetails: React.FC<productSingleDetailsProps> = ({
  data,
}) => {
  const { width } = useSsrCompatible(useWindowSize(), { width: 0, height: 0 });
  const { t } = useTranslation("common");
  const { addItemToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [addToCartLoader, setAddToCartLoader] = useState<boolean>(false);
  const [isClient, setIsClient] = useState(false);
  const [selectedColor, setSelectedColor] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<Product | null>(null);
  const [productSelected, setProductSelected] = useState<any>(undefined);

  function addToCart() {
    setAddToCartLoader(true);
    setTimeout(() => {
      setAddToCartLoader(false);
    }, 600);

    addItemToCart(productSelected, quantity);
  }

  useEffect(() => {
    if (data) {
      setProductSelected(data.product);
    }
  }, [data]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const colorMap = ColorsAndSizesProduct(data?.sizes);

  const notAddCart = () => {
    toast.error(t("add-to-cart-failed"), {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      className: "!bg-white",
    });
  };

  return isClient ? (
    <>
      <div className="block lg:grid grid-cols-9 gap-x-10 xl:gap-x-14 pt-7 pb-10 lg:pb-14 2xl:pb-20 items-start">
        {width < 1025 ? (
          <Carousel
            pagination={{
              clickable: true,
            }}
            breakpoints={productGalleryCarouselResponsive}
            className="product-gallery"
            buttonGroupClassName="hidden"
          >
            {productSelected?.Images?.split(",")?.map((item, index: number) => (
              <SwiperSlide key={`product-gallery-key-${index}`}>
                <div className="col-span-1 transition duration-150 ease-in hover:opacity-90">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={
                      process.env.NEXT_PUBLIC_BASE_API_URL +
                      productSelected.FullImagePath +
                      item +
                      ".jpg"
                    }
                    alt={`${productSelected?.Name}--${index}`}
                    className="object-cover w-full"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Carousel>
        ) : (
          <div className="col-span-5 grid grid-cols-2 gap-2.5">
            {productSelected?.Images?.split(",").map((item, index: number) => (
              <div
                key={index}
                className="col-span-1 transition duration-150 ease-in hover:opacity-90"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={
                    process.env.NEXT_PUBLIC_BASE_API_URL +
                    productSelected.FullImagePath +
                    item +
                    ".jpg"
                  }
                  alt={`${productSelected?.Name}--${index}`}
                  className="object-cover w-full"
                />
              </div>
            ))}
          </div>
        )}

        <div className="col-span-4 pt-8 lg:pt-0">
          <div className="pb-7 mb-7 border-b border-gray-300">
            <div className="flex justify-between">
              <h2 className="text-heading text-lg md:text-xl lg:text-2xl 2xl:text-3xl font-bold hover:text-black mb-3.5">
                {productSelected?.Name}
              </h2>
              {productSelected?.Quantity == 0 && (
                <span className="  px-3 py-1 text-xs font-semibold text-white bg-heading rounded h-fit">
                  {t("outOfStock")}
                </span>
              )}
            </div>

            <p
              dangerouslySetInnerHTML={{
                __html: productSelected?.Description || "",
              }}
              className="text-body text-sm lg:text-base leading-6 lg:leading-8"
            />
            <div className="">
              <ul className="text-sm space-y-5 pb-1">
                <li>
                  <span className="font-semibold text-heading inline-block ltr:pr-2 rtl:pl-2">
                    t{"category"}
                  </span>
                  <Link
                    href="/"
                    className="transition hover:underline hover:text-heading"
                  >
                    {productSelected?.CategoryName}
                  </Link>
                </li>
              </ul>
            </div>
            <div className="flex items-center mt-5">
              <div className="text-heading font-bold text-base md:text-xl lg:text-2xl 2xl:text-4xl ltr:pr-2 rtl:pl-2 ltr:md:pr-0 rtl:md:pl-0 ltr:lg:pr-2 rtl:lg:pl-2 ltr:2xl:pr-0 rtl:2xl:pl-0">
                {productSelected.Price} JOD
              </div>
              {productSelected.OldPrice > 0 && (
                <span className="line-through font-segoe text-gray-400 text-sm md:text-base lg:text-lg xl:text-xl ltr:pl-2 rtl:pr-2">
                  {productSelected.OldPrice} JOD
                </span>
              )}
            </div>
          </div>
          <div className="mb-4">
            <div className="mb-2 text-sm font-medium">{t("color")}</div>
            <div className="flex gap-3 mb-4">
              {Array.from(colorMap.values()).map(({ color }) => (
                <span
                  key={color?.Color?.ID}
                  className={`w-7 h-7 rounded-full border cursor-pointer ${
                    selectedColor?.Color?.ID == color?.Color.ID
                      ? "ring-2 ring-black"
                      : ""
                  }`}
                  style={{ backgroundColor: color?.Color?.Value }}
                  onClick={() => {
                    setSelectedColor(color);
                    setProductSelected(color);
                    setSelectedSize(null);
                  }}
                />
              ))}
            </div>

            <>
              <div className="mb-2 text-sm font-medium">{t("sizes")}</div>
              <ul className="flex flex-wrap gap-2">
                {colorMap
                  .get(
                    selectedColor?.Color?.ID ||
                      Array.from(colorMap.values())[0].color.Color.ID
                  )
                  ?.sizes.map((size, index) => (
                    <li
                      key={index}
                      onClick={() => {
                        setSelectedSize(size);
                        setProductSelected(size);
                      }}
                      className={`px-3 py-1 border rounded text-sm cursor-pointer md:hover:bg-gray-100 ${
                        selectedSize?.Size?.Value === size?.Size?.Value
                          ? "bg-gray-400"
                          : ""
                      }`}
                    >
                      {size?.Size.Label}
                    </li>
                  ))}
              </ul>
            </>
          </div>
          <div className="flex items-center gap-x-4 ltr:md:pr-32 rtl:md:pl-32 ltr:lg:pr-12 rtl:lg:pl-12 ltr:2xl:pr-32 rtl:2xl:pl-32 ltr:3xl:pr-48 rtl:3xl:pl-48  border-b border-gray-300 py-8">
            <Counter
              quantity={quantity}
              onIncrement={() => setQuantity((prev) => prev + 1)}
              onDecrement={() =>
                setQuantity((prev) => (prev !== 1 ? prev - 1 : 1))
              }
              disableDecrement={quantity === 1}
            />
            <Button
              onClick={productSelected.Quantity != 0 ? addToCart : notAddCart}
              variant="slim"
              className={`w-full md:w-6/12 xl:w-full`}
              loading={addToCartLoader}
            >
              <span className="py-2 3xl:px-8">Add to cart</span>
            </Button>
          </div>

          {/* <ProductMetaReview
          data={productSelected?.Reviews}
          productId={productSelected?.ID}
        /> */}
        </div>
      </div>
      <ToastContainer />
    </>
  ) : (
    ""
  );
};

export default ProductSingleDetails;
